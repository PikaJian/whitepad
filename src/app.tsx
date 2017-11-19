import * as ReactDOM from "react-dom";
import * as React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import * as styles from "./css/app.sass"
import Whinepad from "./js/components/Whinepad"

class Logo extends React.Component<any, any> {
    render() {
            return <div className={styles.Logo}></div>
    }
}

let store = createStore(
    (state, action) => {
        switch (action.type) {
            default:
                return state; 
            } 
        },
    { count: 5 });

ReactDOM.render(
<Provider store={store}>
    <div>
        <div className={styles.appHeader}>
        <Logo/> Welcome to Whinepad!
        </div>
        <Whinepad/>
    </div>
</Provider>
, document.getElementById("app"));
