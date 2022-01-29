import { applyMiddleware, compose, createStore } from 'redux';
import { notesReducer } from './notesReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  notesReducer,
  compose(applyMiddleware(thunk), composeWithDevTools() ? composeWithDevTools() : (f) => f)
);
