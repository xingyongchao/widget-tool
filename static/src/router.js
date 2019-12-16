import React, { Component } from 'react'
import yonyouLogo from '../yonyou_logo.svg'
import {
	headerBar,
	headerBarImg,
	Content,
	headerList,
	headerItem,
	activeLink,
	link,
} from '../index.css'
import {
	HashRouter as Router,
	Route,
	NavLink as Link,
	Redirect,
	Switch,
  } from 'react-router-dom'
import App from './app'

function HeaderBar(props){
	return (
		<div className={headerBar}>
			<img className={headerBarImg} src={yonyouLogo} />
			<ul className={headerList}>
				<li className={headerItem} key='Widget'><Link className={link} activeClassName={activeLink} to='/widget'>Widget</Link></li>
			</ul>
		</div>
	)
}

function ContentBar(props){
	return (
		<div className={Content}>
			<Switch>
				<Route key='Widget' exact path='/widget' component={App} />
				<Redirect path="/" to={{pathname: '/widget'}} />
			</Switch>
		</div>
	)
}

export default class RouterComp extends Component {
    render(){
        return (
            <Router>
			    <div>
			        <HeaderBar  />
			        <ContentBar />
			    </div>
  		    </Router>
        )
    }
}