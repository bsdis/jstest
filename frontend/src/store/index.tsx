import {
  createStore,
  createSlice,
  configureStore,
  combineReducers
} from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./state";
// See https://github.com/DanielFGray/ricedb-ui
// and https://developerhandbook.com/stripe/create-shopping-basket-using-redux-toolkit/
const basketSlice = createSlice({
  name: "basket",
  initialState: INITIAL_STATE,
  reducers: {
    add: (state, action) => {
      // add item to basket using `state` and `action` props
      return state.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }

        return {
          ...item,
          added: true
        };
      });
    },
    remove: (state, action) => {
      return state.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }

        return {
          ...item,
          added: false
        };
      });
    }
  }
});
/*
const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: { set: (state, action) => {
    return state.map(item => {
      if (item.id !== action.payload.id) {
        return item;
      }

      return {
        ...item,
        added: true
  } }
});
*/
const rootReducer = combineReducers({
  basket: basketSlice.reducer
});

/*
const store = createStore(
  
)*/
//const store1 = configureStore({ reducer: basketSlice.reducer })
const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const { add, remove } = basketSlice.actions;

export { basketSlice, store };
