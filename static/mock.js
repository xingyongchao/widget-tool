window.widgetInstance = {
	widgetId: 'widgetId',
	widgetName: 'widgetName',
	serviceCode: 'serviceCode',
	type: '3',
};

window.widgetTool = {
	dispatch: function (action, params) {
		switch (action) {
			case 'openService':
				console.log(`open ${params.serviceCode}`)
				if (params.type === 2) {
					console.log('also pen app')
				}
				break;
			case 'openDialog':
				console.log('open dialog')
				console.log(params)
				break;
			default:
				break;
		}
	},
	on: function () {

	},
};

window.widgetContext = {
	tenantid: '',
	userid: '',
	username: '',
	theme: '',
	locale: '',
	timezone: '',
};

/*dir{%*/
const dirs = ["test", "todolist", "withDom"]
/*%}*/
// 与dirs对应，根据顺序对应，可以调整对应磁贴的大小
const sizes = [
	1, 3, 5,
]
// 与dirs对应，根据顺序对应，可以调整对应磁贴的背景
const backgrounds = [
	null,
	null,
	'http://oin1wqn2f.bkt.clouddn.com/GitHub-logo-header-1.png',
]

export {
	dirs,
	sizes,
	backgrounds,
};