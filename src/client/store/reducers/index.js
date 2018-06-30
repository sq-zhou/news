import { combineReducers } from 'redux';
import comment from './comment';
import user from './user';

export default combineReducers({
    comment,
    user
})