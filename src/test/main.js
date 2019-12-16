import React, { Component } from 'react';
import { wrap, icon } from './index.css';
import { serviceCode } from 'widgetInstance';
import { dispatch }from 'widgetTool';

class Widget extends Component {
	clickHandler() {
		dispatch('openService', {
			serviceCode,
		})
	}
  render() {
    return (
      <div className={wrap} onClick={this.clickHandler}>
				<img className={icon} src='https://cdn.yonyoucloud.com/pro/workbench/default.svg'/>
      </div>
    );
  }
}

export default Widget;