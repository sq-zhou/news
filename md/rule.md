### 组件开发原则
```
1.单一职责链模式（就是一个组件对应一个功能，可以进行复用）
```

### css 开发原则
```
1.名称一律小写
2.命名方式
(1 不能使用 .title .content这些易于混淆的名称
(2 BEM命名方式：
   BEM 是一种真正消除不确定性的命名方式，它使得结构样式更加清晰
   block：模块，名字单词间用 - 连接
   element：元素，模块的子元素，以 __ 与 block 连接
   modifier：修饰，模块的变体，定义特殊模块，以 -- 与 block 连接
例如
.user-home-nav
  .user-home-nav-item.user-home-nav-item--small
    .user-home-nav-item__icon
    .user-home-nav-item__text
 
.user-home-nav
  &-item
    &--small
    &__icon
    &__text
```
### react开发规范
```
1)纯输出时使用无状态组件
2)可以使用typescript就是用typescript
3)要有;号
4)一般引用使用单引号
5)在render使用 const { name } = this.props
```
### 使用eslint