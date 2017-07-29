const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let events = require('./events.json');
let trainers = require('./trainers.json');
const Event = require('./schema');


let eventsFromDB = [];
//----------------- DB connection ---------------------

mongoose.connect('mongodb://xeontem:slipknot@ds147842.mlab.com:47842/rs-calendar', { useMongoClient: true });
// const db = mongoose.connection;
mongoose.connection.on('connected', function () {  
  	console.log('Mongoose default connection opened with xeontem:slipknot@ds147842.mlab.com:47842/rs-calendar');
  	Event.find({}, function (err, docs) {
  		docs.map(model => {
  			eventsFromDB.push(model.toObject())
  		})
	});
}); 
//----------------- instruments ------------------

function searchEventById(id) {
	let index;
	events.map((event, i) => {
		if(event.id === id) {
			index = i;
		}
	})
	return index;
}
//------------------------------------------------

const server = express();

server.use(bodyParser.json());       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

server.all('*', function(req, res, next) {
	console.log('--------------------------------------------------------------');
	console.log('request from: ' + req.connection.remoteAddress);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//------------------------- GET -----------------------------------------
server.get( '/reset' , (req, res) => {
	console.log('events restored from DB');
	Event.find({}, function (err, docs) {
  		events = [];
  		docs.map(model => {
  			events.push(model.toObject())
  		})
	});
	res.status('200').send();
});

server.get( '/dbEvents' , (req, res) => {
	console.log('events from db requested');
	// res.set({'Access-Control-Allow-Origin': '*'});
	res.send(eventsFromDB);
});

server.get( '/events' , (req, res) => {
	// console.log(req);
	console.log('events requested');
	// res.set({'Access-Control-Allow-Origin': '*'});
	res.send(events);
});

server.get( '/events/*' , (req, res) => {
	let id = req.originalUrl.slice(8);
	console.log('event ' + id + ' requested');
	let event;
	events.map(ev => {
		if(ev.id === id) event = ev;
	});
	// res.set({'Access-Control-Allow-Origin': '*'});
	res.send(event);
});

server.get( '/trainers' , (req, res) => {
	console.log('trainers requested');
	// res.set({'Access-Control-Allow-Origin': '*'});
	res.send(trainers);
});

server.get( '/trainers/*' , (req, res) => {
	let id = req.originalUrl.slice(10);
	console.log('trainer ' + id + ' requested');
	let trainer;
	trainers.map(trn => {
		if(trn.id === id) return trainer = trn;
	});
	// res.set({'Access-Control-Allow-Origin': '*'});
	res.send(trainer);
});
//------------------- POST -----------------------------------

server.post('/events', (req, res) => {
	if(req.body.delete) {
		let index = searchEventById(req.body.id)
		let filtered = events.slice(0, index);
        filtered = filtered.concat(events.slice(index+1));
        events = filtered;
		console.log('event: ' + req.body.id + ' deleted');
        res.status('200').send();
        return
	}
	let index = searchEventById(req.body.id);
	if(!index) events.push(req.body);
	else events[index] = req.body;
	console.log('new event recieved');
	res.status('200').send();
});
server.listen(process.env.PORT || 4444);
