import * as React from 'react';
//import CRUDStore from "../flux/CRUDStore";
//import Excel from "./Excel";
import Button from "./Button";
//import Dialog from "./Dialog";
//import Form from "./Form";
//import CRUDActions from "../flux/CRUDAction";
import { Provider, connect } from "react-redux";
import * as styles from "../../css/app.sass"


type State = {
  addnew: boolean,
  count: number,
}

class Whinepad extends React.Component<any, any> {

  state: State;

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

  render() {
    return (
      <div className={styles.whinepad}>
        <div className={styles.whinepadToolbar}>
          <div className={styles.whinepadToolbarAdd}>
            <Button>
            </Button>
          </div>
          <div className={styles.WhinepadToolbarSearch}>
            <input
              placeholder={
                this.props.count == 1
                  ?
                  'Search 1 record...'
                  :
                  `Search ${this.props.count} records...`
              }
            />
          </div>
        </div>
      </div>
    );
  }

}

export default connect(
    (state) => ({ count: state.count }), 
    (dispatch) => ({
        updateCount: () => dispatch({ type:'Add_Item'})
    })
)(Whinepad);