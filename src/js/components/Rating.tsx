import * as React from 'react';
import { connect } from "react-redux";
import classNames from 'classnames';

import * as styles from "../../css/app.sass"

type Props = {
  value: number,
  readonly: boolean,
  max: number,
}

type State = {
  tmpRating: number, // 使用者移動滑鼠到元件附近時會被用到，但還沒準備好點擊及提交評等
  rating: number
}

class Rating extends React.Component<any, any> {

  //props: Props;
  state: State;

  static defaultProps: Props = {
    value: 0,
    max: 5,
    readonly: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      tmpRating: this.props.defaultValue,
      rating: this.props.defaultValue
    };
  }

  getValue(): number { // 所有的輸入元件皆提供這個方法
    return this.state.rating;
  }

  setTemp(rating: number) { // 將鼠標停懸其上時
    this.setState({
      tmpRating: rating
    });
  }

  setRating(rating: number) { // 在點擊時

    const randomid = Math.random().toString(16).substring(2);
    this.setState({
      tmpRating: rating,
      rating
    });
  }

  reset() { // 在鼠標離開時，回到實際的評等
      this.setTemp(this.state.rating)
  }
  /*
  componentWillReceiveProps(nextProps: Props) { // 回應外在的變更
    this.setRating(nextProps.defaultValue);
  }*/

  render() {
    const stars = [];
    for (let i = 1; i <= this.props.max; i++) {
      stars.push(
        <span
          className={i <= this.state.tmpRating  ? `${styles.ratingOn}` : null}
          key={i}
          onClick={this.props.readonly ? () => {} : (e => this.setRating(i))}
          onMouseOver={this.props.readonly ? () => {} : (e => this.setTemp(i))}
        >
          &#9734;
        </span>
      );
    }
    return (
      <div
        className={
          classNames({
            [`${styles.Rating}`]: true,
            [`${styles.RatingReadonly}`]: this.props.readonly,
          })
        }
        onMouseOut={e => this.reset()}
      >
        {stars}
        { // 隱藏的欄位作為實際的表單輸入，讓該值可以被收集(就像任何舊式的<input>)
          this.props.readonly || !this.props.id
          ?
            null
            :
            <input
              type="hidden"
              id={this.props.id}
              value={this.state.rating}
            />
        }
      </div>
    ) ;
  }
  /* 更多方法 */

}

export default Rating;

/* export default connect(

  (state:any, props:any) => ({}),
  (dispatch) => ({
    updateRating: (key, rating) => {
      dispatch({ type: 'UPDATE_RATING', key, rating });
    },
  }),
  null,
  {
    withRef: true
  }

)(Rating); */