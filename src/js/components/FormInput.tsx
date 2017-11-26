/**
 * 根據type特性產生輸入元素的工廠(factory)
 */

import * as React from 'react';
import { connect } from "react-redux";
import Suggest from "./Suggest";
import Rating from "./Rating";

type FormInputFieldType = 'year' | 'suggest' | 'rating' | 'text' | 'input';

export type FormInputFieldValue = string | number;

type CommonProperty = {
  id: string,
  ref: string,
  defaultValue: string,
}

/* export type FormInputField = {
  type?: FormInputFieldType,
  defaultValue?: FormInputFieldValue,
  id?: string,
  options?: Array<string>,
  label?: string,
} */

class FormInput extends React.Component<any, any> {
  private input:any
  static defaultProps = {
    type: 'input'
  };

  constructor(props) {
    super(props);
    this.state = {value: props.defaultValue || ''};
  }

  getValue(): void {
    /* if(this.refs.input) {
      var input = (this.refs.input as any).getWrappedInstance()
      var result = 'value' in input
      ?
      input.value
      :
      input.getValue();// 就<Suggest>與<Rating>之類的酷炫自訂輸入元素，則存取個別的getValue()方法
      return result;
    } */
    var refs = this.refs as any 
    if(refs.input) {
    return 'value' in refs.input
      ?
      refs.input.value
      :
      refs.input.getValue(); // 就<Suggest>與<Rating>之類的酷炫自訂輸入元素，則存取個別的getValue()方法
    }
  }

  render() {
    var common: CommonProperty = { // 通用特性
      id: this.props.id,
      ref: this.props.refName, // 這對擷取輸入欄位之值很有用
      defaultValue: this.props.defaultValue,
    };
    const value = parseInt(this.props.data[this.props.id], 10)
    switch (this.props.type) {
      case 'year':
        return (
          <input
            {...common}
            type="number"
            defaultValue={this.state.value || new Date().getFullYear()}
          />
        );

      case 'suggest':
        return <Suggest {...common} options={this.props.options}/>;
      case 'rating':
        return <Rating {...common} defaultValue={parseInt(this.props.defaultValue, 10)}/>;
      case 'text':
        return <textarea {...common} />;
      default:
        return <input {...common} type="text"/>;
    }
  }

}

export default connect(

  (state:any, props:any) => {
    var data = state.wine_data.filter(x => x.primary_key === props.primary_key)[0]
    return {data}
  },
  (dispatch) => ({
    updateValue: (key, id, value) => {
      dispatch({ type: 'UPDATE_ITEM_VALUE', key, id, value });
    },
  }),
  null,


)(FormInput);