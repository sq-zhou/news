const nodejieba = require('nodejieba');
const cheerio = require('cheerio');
const fetch = require('node-fetch').default;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const websiteList = [
    'http://www.ftchinese.com/',
];

const config = {
    mongoUri: 'mongodb://localhost:27017',
    dbName: 'news',
};

const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
    'Referer': 'http://www.ftchinese.com/',
    'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6',
}

const mainHandler = async (db, link) => {
    const content = await fetch(link, {
        method: 'GET',
        headers,
    }).then(res => res.text());
    const $ = cheerio.load(content);
    const nextLinks = [];
    $('div.item-inner').each((i, elem) => {
        const items = $(elem).find('a.item-headline-link');

        items.each((i, title) => {
            const href = $(title).attr('href');
            const nextLink = link.slice(0, link.length - 1) + href;
            nextLinks.push(nextLink);
        });
    });

    for (let i = 0; i < nextLinks.length; i++) {
        const link = nextLinks[i];
        console.log(`crawling ${link}`);
        try {
            await newsHandler(db, link);
        } catch (e) {
            console.log(`error in ` + link);
            console.log(e);
        }
    }
};

const newsHandler = async (db, link) => {
    console.log('f');
    const textContent = await fetch(link, {
        method: 'GET',
        headers,
    }).then(res => res.text());
    console.log('f');
    const $ = cheerio.load(textContent);
    const title = $('h1.story-headline').text();
    const abstract = $('div.story-lead').text();
    const figure = $('figure').attr('data-url');
    const content = $('div.story-body').text();
    const dateText = $('span.story-time').text().slice(3);
    const data = {
        title,
        abstract,
        figure,
        content,
        date: new Date(Date.parse(dateText.replace('年', '-').replace('月', '-').replace('日', ''))),
        link,
    };
    if (title.length === 0) return;
    const col = db.collection('news');
    try {
        const row = await col.findOne({
            link,
        });
        if (row === null) {
            await col.insertOne(data);
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.log(`error: ${e}`);
    }
};

MongoClient.connect(config.mongoUri, async function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(config.dbName);
    await mainHandler(db, websiteList[0]);
  
    client.close();
});

module.exports = {
    config,
};
