import React, { Component } from 'react'

import {
	dirs,
	sizes,
	// backgrounds,
} from '../mock'
import {
	headerBar,
	headerBarImg,
	homeWidgetName,
	homeWidgetItem,
	homeWidgetList,
	homeWidgetWrap,
} from '../index.css'

const widths = [
	// 小   1*1
	{
		width: 175
	},
	// 中  2*1
	{
		width: 360
	},
	// 大  2*2 
	{
		width: 360,
		height: 360
	},
	// 3*1
	{
		width: 545,
	},
	{
		width: 545,
		height: 360,
	},
	{
		width: 730,
	},
	{
		width: 730,
		height: 360,
	},
	{
		width: 1100,
		height: 360,
	},
	{
		width: 1100,
		height: 730,
	}

]


export default class App extends Component {
	constructor() {
		super()
		this.state = {
			widgets: []
		}
	}
	componentWillMount() {
		Promise.all(
			dirs.map((dir, i) => import(`../../src/${dir}/main`).then(
				widget => (
					{
						// background: backgrounds[i] ? `url(${backgrounds[i]})` : undefined,
						size: sizes[i] || 1,
						name: dir,
						component: widget.default,
					}
				)
			))
		).then((widgets) => {
			this.setState({
				widgets,
			})
		})
	}
	render() {
		const { widgets } = this.state
		return (
			<div className={homeWidgetWrap}>
				{
					widgets.length ? (
						<ul className={homeWidgetList}>
							{
								widgets.map(({ component: Widget, name, size, background }, i) => {
									const style = {
										...(widths[size - 1] || {}),
										background,
									}
									return (
										<li key={i} className={homeWidgetItem} style={{ ...style }}>
											<div className={homeWidgetName}>{name}</div>
											<Widget />
										</li>
									)
								})
							}
						</ul>
					) : null
				}
			</div>
		)
	}
}