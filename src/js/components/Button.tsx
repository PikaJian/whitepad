import React from 'react';
import classNames from 'classnames';
import * as styles from "../../css/app.sass"
type Props = {
  href?: string,
  className?: string,
}

export default class Button extends React.Component<any, any> {
   render() {
       return (
            <button className={classNames(styles.Button, styles.WhinepadToolbarAddButton)}>
            + add
            </button>
       );
   } 
}