import React, { Component } from 'react';
import { wrap,text,charac, addBtn } from './index.css';

var numberElm;
var number = 0;

function add() {
  number += 1;
  setNum(number);
}

function del() {
  number -= 1;
  setNum(number);
}

function setNum() {
  numberElm.innerHTML = number;
}

class App extends Component {
  componentDidMount() {
    numberElm = this.refs.number;
    setNum();
  }
  render() {
    return (
      <div className={wrap} >
        <div className={text}>numbers: <span ref="number"></span></div>
        <button type="type" className={addBtn} onClick={add}><span className={charac}>+</span></button>
        <button type="type" onClick={del}><span className={charac}>-</span></button>
      </div>
    );
  }
};

export default App;
