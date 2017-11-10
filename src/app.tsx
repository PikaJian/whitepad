import * as ReactDOM from "react-dom";
import * as React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import * as styles from "./css/Logo.sass"

class Logo extends React.Component<any, any> {
    render() {
            return <div className={styles.Logo}></div>
    }
}
var pika = styles;
ReactDOM.render(
<div>
    <div className={styles.appHeader}>
    <Logo/> Welcome to Whinepad!
    </div>
</div>
, document.getElementById("app"));
