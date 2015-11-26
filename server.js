'use strict';

require('dotenv').load(); // Only required for running locally

let express = require('express'),
	routes = require('./app/routes/index.js'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	FileStore = require('session-file-store')(session),
	app = express();

mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static('app/controllers'));
app.use('/services', express.static('app/services'));
app.use('/views', express.static('app/views'));
app.use('/public', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static('app'));

// app.use(session({
// 	secret: 'chartthemarket',
// 	resave: false,
// 	saveUninitialized: true
// }));

app.use(session({
    store: new FileStore({logFn: function(){}}),
    secret: 'chartthemarket'
}));

routes(app);

let port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});