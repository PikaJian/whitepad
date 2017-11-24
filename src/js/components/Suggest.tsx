import * as React from 'react';
import { connect } from "react-redux";


type State = {
  value: string,
}

class Suggest extends React.Component<any, any> {

  state: State;

  constructor(props) {
    super(props);
    this.state = {value: props.defaultValue || ''};
  }

  getValue(): string {
    return this.state.value;
  }

  render() {
    const randomid = Math.random().toString(16).substring(2);
    return (
      <div>
        <input
          list={randomid}
          defaultValue={this.props.defaultValue}
          onChange={e => this.state.value = e.target.value}
          id={this.props.id}
        />
        <datalist id={randomid}>
          {
            this.props.options.map((item, idx) =>
              <option value={item} key={idx}/>
            )
          }
        </datalist>
      </div>
    );
  }

}

export default Suggest;
/* export default connect(

  (state, props) => ({data: state.wine_data}),
  (dispatch) => ({
    updateRating: (id, rating) => {
      dispatch({ type: 'UPDATE_RATING', id, rating });
    },
  })

)(Suggest); */