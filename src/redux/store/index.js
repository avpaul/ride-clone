import {applyMiddleware, createStore} from 'redux';
import initialState from './initialState';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
