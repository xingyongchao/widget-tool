var path = require('path');
var fs = require('fs');
var express = require('express');
var webpack = require('webpack');
var proxy = require('http-proxy-middleware');
var webpackConfig = require('../config/webpack.config');
var port = 3001;
var http = require('http');
var qs = require('querystring');

// POST请求工作台 获取登陆信息 loginMess记录
var loginMess ='';
var contents = qs.stringify({
	'tenantId':'gtzceot7',
	'userId':'9ab8b615-a28c-43d6-9b3f-447be0d7299f',	
	'isAdmin':'true',
});
var options = {
	host:'workbenchdev.yyuap.com',
    path:'/service-adapter/rpc-adapter/loginForTest?'+contents,
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlendcoded',
        'Content-Length':contents.length,
    }
}
var req = http.request(options, function(res){
	loginMess = '';
	var dataTotal ='';
	res.setEncoding('utf8');
    res.on('data',function(data){
		dataTotal += data;
    }).on('end',function(err){
		// loginMess = JSON.parse(dataTotal).data.wb_at;
	}).on('error',function(err){
		console.log(err)
	});
});
req.setTimeout(15000, function() {
	req.abort();
}).on('error', function(e){
	console.log(e)
})//进行15s的超时控制 利用对error的监控 规避abort带来的错误
req.write(contents);
req.end();
// 结束POST请求

if (Object.keys(webpackConfig.entry).length) {
  var app = express()
	app.use(function(request, response, next){
		response.cookie('wb_at',loginMess,{ maxAge: 900000,httpOnly:false, path:'/'});
		next();
	})

	var compiler = webpack(webpackConfig)

	var devMiddleware = require('webpack-dev-middleware')(compiler, {
		publicPath: webpackConfig.output.publicPath,
		quiet: true
	})

	var hotMiddleware = require('webpack-hot-middleware')(compiler, {
		log: () => {}
	})

	compiler.plugin('compilation', function (compilation) {
		compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
			hotMiddleware.publish({ action: 'reload' })
			cb()
		})
	})

	app.use(devMiddleware)
	app.use(hotMiddleware)
	app.use('/static', express.static('./static'))

	var uri = 'http://localhost:' + port

	console.log('> Starting dev server...')

	devMiddleware.waitUntilValid(() => {
		console.log('> Listening at ' + uri + '\n')
	})

	app.use('/count', proxy({
		target: 'https://mock.yonyoucloud.com',
		changeOrigin: true,
		pathRewrite: {'^/count': '/mock/370/manage/count'}
	}));
	
	app.use('/manager/application/getAppCountForWidget',proxy({
		target: 'http://localhost:3001',
		changeOrigin: true,
		pathRewrite: {'^/manager/application/getAppCountForWidget': '/static/manage.json'}
	}))

	app.listen(port)
	app.listen(3002,()=>{
		console.log('start on 3002');
	})
	
} else {
	console.log('not found widget');
	console.log('run \'npm create -- <widgetName>\' to create a new widget from template');
}
