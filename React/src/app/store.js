import {createStore} from 'redux';

const initialState = {
  lists: [] // {id: 1, hash: '', type: 0, cards: ''}
};

const reducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD':
      newState.lists.push(action.payload.list);
      break;
    case 'LOAD':
      newState.lists = action.payload.lists;
      break;
    case 'UPDATE':
      newState.lists = action.payload.lists;
      break;
    case 'REMOVE':
      newState.lists = [];
      break;
    default:
      break;
  }

  return newState;
};

const store = createStore(reducer);
store.subscribe(() => {});

export default store;
