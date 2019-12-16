import React, { Component } from 'react';
import { list, innerbtn, label, list_item, todoInput} from './index.css'


// props items done(id)
class TodoList extends Component {
  render() {
    return (
      <ul className={list}>
        {
          this.props.items.map((item)=>{
            return (
              <li key={item.id} className={list_item}>
              <label className={label}>
                <input type="checkbox" className={todoInput}/>
                <span>{item.text}</span>
              </label>
              <span>/</span>
              <span onClick={()=>{this.props.done(item.id)}} className={innerbtn}>X</span>
            </li>
            )
          })
        }
        </ul>
    );
  }
}

export default TodoList;
