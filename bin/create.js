var path = require('path')
var fs = require('fs')
var dirName = process.argv.slice(-1)[0]
var dirReg = /^[0-9a-zA-Z_-]+$/
var srcDir = path.resolve(__dirname, '../src')
if (dirReg.test(dirName) && dirName !== 'create') {
	var dirs = fs.readdirSync(srcDir)
	dirs = dirs.filter(function (dir) {
		var isDir = fs.statSync(path.resolve(srcDir, dir)).isDirectory()
		return isDir
	})
	if (~dirs.indexOf(dirName)) {
		console.log('widget already exist');
	} else {
		var widgetDir = path.resolve(__dirname, '../src/', dirName);
		fs.mkdirSync(widgetDir)
		var jsPath = path.resolve(widgetDir, 'main.js');
		fs.writeFileSync(jsPath, [
			"import React, { Component } from 'react';",
			"import { wrap, icon } from './index.css';",
			"import { serviceCode } from 'widgetInstance';",
			"import { dispatch }from 'widgetTool';",
			"",
			"class Widget extends Component {",
			"	clickHandler() {",
			"		dispatch('openService', {",
			"			serviceCode,",
			"		})",
			"	}",
			"  render() {",
			"    return (",
			"      <div className={wrap} onClick={this.clickHandler}>",
			"				<img className={icon} src='https://cdn.yonyoucloud.com/pro/workbench/default.svg'/>",
			"      </div>",
			"    );",
			"  }",
			"}",
			"",
			"export default Widget;",
		].join('\n'))
		var cssPath = path.resolve(widgetDir, 'index.css');
		fs.writeFileSync(cssPath, [
			".wrap {",
			"	height: 132px;",
			"	position: relative;",
			"}",
			".icon {",
			"	position: absolute;",
			"	width: 40px;",
			"	height: 40px;",
			"	right: 40px;",
			"	bottom: 50px;",
			"	transform: translate(50%,50%);",
			"}",
		].join('\n'))
	}
} else {
	console.log('widget name is illegal');
	console.log('the name of widget can only contain letters ,numbers, underline');
}
