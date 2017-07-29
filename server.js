const express = require('express');
const bodyParser = require('body-parser')
let events = require('./events.json');
let eventsBackup = require('./events.json');
let trainers = require('./trainers.json');

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
//------------------------- GET -----------------------------------------
server.get( '/reset' , (req, res) => {
	console.log('events resetted');
	events = eventsBackup.slice();
	res.status('200').send();
});


server.get( '/events' , (req, res) => {
	console.log('events requested');
	res.send(events);
});

server.get( '/events/*' , (req, res) => {
	let id = req.originalUrl.slice(8);
	console.log('event ' + id + ' requested');
	let event;
	events.map(ev => {
		if(ev.id === id) event = ev;
	});
	res.send(event);
});

server.get( '/trainers' , (req, res) => {
	console.log('trainers requested');
	res.send(trainers);
});

server.get( '/trainers/*' , (req, res) => {
	let id = req.originalUrl.slice(10);
	console.log('trainer ' + id + ' requested');
	let trainer;
	trainers.map(trn => {
		if(trn.id === id) return trainer = trn;
	});
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
