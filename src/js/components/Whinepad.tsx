import * as React from 'react';
//import CRUDStore from "../flux/CRUDStore";
//import Excel from "./Excel";
import Button from "./Button";
//import Dialog from "./Dialog";
//import Form from "./Form";
//import CRUDActions from "../flux/CRUDAction";
import { Provider, connect } from "react-redux";
import * as styles from "../../css/app.sass"

import FormInput from "./FormInput"
import Excel from "./Excel"

const test: Object[] = [
  {
    primary_key: 6678,
    id: "rating",
    type: "rating"
  },
  {
    primary_key: 6679,
    id: "rating",
    type: "rating"
  }

] // 通用特性

type State = {
  addnew: boolean,
  count: number,
}

class Whinepad extends React.Component<any, any> {

  constructor(prop, context) {
      super(prop, context)
  }

  _addNewDialog() {
    //this.setState({addnew: true});
  }

  _addNew(action: string) {
    /* this.setState({
      addnew: false
    });
    if (action === 'confirm') {
      CRUDActions.create(this.refs.form.getData());
    } */
  }

  inputChange(e) {
    this.props.updateText(e.target.value)
  }


  render() {
    return (
      <div className={styles.whinepad}>
        <div className={styles.whinepadToolbar}>
          <div className={styles.whinepadToolbarAdd}>
            <Button>
            </Button>
          </div>
          <div className={styles.WhinepadToolbarSearch}>
            <input onInput={ e => this.inputChange(e) }
              placeholder={
                this.props.count == 1
                  ?
                  'Search 1 record...'
                  :
                  `Search ${this.props.count} records...`
              }
            />
            <p>{this.props.text}</p>
          </div>
        </div>
        <div className={styles.WhinepadDatagrid}>
          <Excel />
        </div>
        <div>
          <FormInput {...test[0]} defaultValue={3} />
        </div>
        <div>
          <FormInput {...test[1]} defaultValue={5} />
        </div>
      </div>
    );
  }

}

export default connect(
    (state) => ({ count: state.count , text: state.text }), 
    (dispatch) => ({
        updateCount: () => dispatch({ type:'Add_Item'}),
        updateText: (text : string) => dispatch({ type:'Update_Item', text})
    })
)(Whinepad);