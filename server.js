const express = require('express');
const twig = require('twig');
const bodyParser = require('body-parser');
const db = require('redis').createClient();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

db.on('error', ( err ) => {
	console.log('Poolio encountered an error connecting to the database: ' + err);
});

db.on('ready', () => {
	app.listen(3000, () => {
		console.log('Poolio is ready at http://localhost:3000');
	});
})

// Application views

app.get('/', ( req, res ) => {
	res.render('home.twig', { title: 'Poolio!' });
});

app.get('/new-game', ( req, res ) => {
	res.render('game--new.twig', { title: 'Start a new game!' });
});

app.get('/active-game', ( req, res ) => {
	res.render('game--active.twig', { title: 'Let the games begin!' });
});

app.get('/leaderboard', ( req, res ) => {
	res.render('leaderboard.twig', { title: 'Winners!' });
});