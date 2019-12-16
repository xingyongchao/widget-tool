import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RouterComp from './router'
import './bridge'

require('eventsource-polyfill')
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})

ReactDOM.render(
	<div>
		<RouterComp />
	</div>,
	document.getElementById('root')
);
