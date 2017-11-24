import * as ReactDOM from "react-dom";
import * as React from "react";
import PropTypes from 'prop-types';
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import * as Immutable from "immutable"

import { SchemaMap } from './schema'
import Whinepad from "./components/Whinepad"

import * as styles from "../css/app.sass"

class Logo extends React.Component<any, any> {
  render() {
    return <div className={styles.Logo}></div>
  }
}

interface WineRecord {
  primary_key: number
  name: string;
  year: number;
  grape: string;
  rating: number;
  comments: string;
}

interface StoreState {
  primary_key: number;
  sortby: boolean;
  descending: boolean;
  count: number;
  text: string;
  wine_data: WineRecord[];
}

let default_state: StoreState = { 
  primary_key: 0,
  count: 5,
  sortby: null,
  descending: false,
  text: "fuck",
  wine_data: [
    {
      primary_key: 6678,
      name: "$2 chunk",
      year: 2015,
      grape: "Merlot",
      rating: 3,
      comments: "Nice for the price",
    },
    {
      primary_key: 6679,
      name: "$2 chunk",
      year: 2015,
      grape: "Merlot",
      rating: 5,
      comments: "Nice for the price",
    }
  ] 
}

let store = createStore(
  (state: StoreState, action) => {
    switch (action.type) {
      case "UPDATE_SORT":
        return {...state, sortby: action.sortby, descending: action.descending}
      case "Update_Item":
        return { ...state, text: action.text };
      case 'UPDATE_ITEM_VALUE':
        //var data = { ...state.wine_data.filter(x => x.key === action.key)[0], rating: action.rating }
        var data = { ...state.wine_data.filter(x => x.primary_key === action.key)[0], rating: action.rating }
        return {...state, wine_data: [...state.wine_data.filter(x => x.primary_key !== action.key), data]}
      default:
        return default_state;
    }
  },
);

const common: Object = { // 通用特性
  id: 123,
  defaultValue: 3, // 這對擷取輸入欄位之值很有用
  readonly: false,
  max: 5 
};



ReactDOM.render(
  <Provider store={store}>
    <div>
      <div className={styles.appHeader}>
        <Logo /> Welcome to Whinepad!
      </div>
      <Whinepad />
    </div>
  </Provider>
    , document.getElementById("app")
)

/* ReactDOM.render(
  <Provider store={store}>
    <div>
      <div className={styles.appHeader}>
        <Logo /> Welcome to Whinepad!
        </div>
      <Whinepad />
    </div>
  </Provider>
  , document.getElementById("app")); */


