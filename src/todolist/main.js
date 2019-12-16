import React, { Component } from 'react';
import { toDoList,title, forAddItems, make, btn, btn_add} from './index.css';

import TodoList from './TodoList';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'to do list',
      items: [],
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
  };
  handleDone(id) {
    this.setState(prevState => ({
      items: prevState.items.filter((item) => id !== item.id)
    }));
  };
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }

  render() {
    return (
      <div className={toDoList}>
        <h1 className={title}>{this.state.title}</h1>
        <form className={forAddItems}>
          <input type="text" autoComplete="off" placeholder="What else to add?" value={this.state.text} onChange={this.handleChange} className={make} />
          <input type="submit" value="Add" className={btn} onClick={this.handleSubmit} />
        </form>
        <TodoList items={this.state.items} done={this.handleDone}/>
      </div>
    )
  }
}

export default TodoApp;
