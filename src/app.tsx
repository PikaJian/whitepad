import * as ReactDOM from "react-dom";
import * as React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import * as styles from "./css/Logo.sass"

class HelloWorld extends React.Component<any, any> {
    render() {
            return <div className={styles.Logo}></div>
    }
}
var pika = styles;
ReactDOM.render(<HelloWorld/>, document.getElementById("app"));
