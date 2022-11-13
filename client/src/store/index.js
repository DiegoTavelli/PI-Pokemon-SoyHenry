import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;



// const rootReducer = combineReducers({
//   reducer: reducer,
// })

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(
//   persistedReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// export const persistedStore = persistStore(store)
