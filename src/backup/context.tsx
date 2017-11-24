import * as ReactDOM from "react-dom";
import * as React from "react";
import PropTypes from 'prop-types';
/* 
 * context from outer transfer to inner componet
 * 使用方法
 * 使用getChildContext方法将属性传递给子组件，并使用childContextTypes声明传递数据类型，子组件中需要显式地使用contextTypes声明需要用到的属性的数据类型。
 * 需要传递进context参数才可以在constructor方法中使用context，要不然React将会报错。
 * 在组件中，通过this.context访问context中的属性或方法。
 * 
 * 相关api
 * 
 * contextTypes
 * 当需要在当前组件使用从上级组件传入的context的属性时，需要为用到的属性声明数据类型
 * 
 * childContextTypes
 * 声明传递给子组件的属性的数据类型。
 * 
 * getChildContext
 * 设置传递给子组件的属性，可以覆盖，也可以新增。
 * 
 */

// Children component
class Children extends React.Component {
  static contextTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    print: PropTypes.func
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: this.context.name
    };
  }

  render() {
    return(
      <ul>
        <li>
          {`child context is: ${this.context.age}`}
        </li>
        <li>
          {`state from context: ${this.context.name}`}
        </li>
        <li>
          {`print age: ${this.context.print(this.context.age)}`}
        </li>
      </ul>
    );
  }
}



// Parent component
class Parent extends React.Component {
  static contextTypes = {
    name: PropTypes.string
  };
  static childContextTypes = {
    age: PropTypes.number,
    name: PropTypes.string
  };

  getChildContext() {
    return {
      name: this.context.name,
      age: 18
    };
  }

  render() {
    return (
      <div>
        {`from App component: ${this.context.name}`}
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}


// App component
class App extends React.Component {

  static childContextTypes = {
    name: PropTypes.string,
    print: PropTypes.func
  }

  getChildContext() {
    return { 
        name: 'shit',
        print: (m) => m
     };
  }

  render() {
    return (
      <Parent>
        <Children />
      </Parent>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));