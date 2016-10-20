const express = require('express');
const path = require('path');
const twig = require('twig');
const bodyParser = require('body-parser');

if (process.env.REDISTOGO_URL) {
    const rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var db = require("redis").createClient(rtg.port, rtg.hostname);
	db.auth(rtg.auth.split(":")[1]);
} else {
    var db = require('redis').createClient();
}

const app = express();

var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './')));
app.use(bodyParser.urlencoded({extended: true}));

db.on('error', ( err ) => {
	console.log('Poolio encountered an error connecting to the database: ' + err);
});

db.on('ready', () => {
	app.listen(port, () => {
		console.log('Poolio is ready.');
	});
})

// Application Views

app.get('/', ( req, res ) => {
	res.render('home.twig');
});

app.get('/new-game', ( req, res ) => {

	var players = [];
	var completed = 0;
	var player1;
	var player2;

	db.keys('players:*', (err, result) => {
		for ( var i = 0; i < result.length; i++ ) {
			db.hget(result[i], 'Name', ( err, name ) => {
				completed++;
				players.push(name);
				if ( completed === result.length ) {
					res.render('game--new.twig', {
						title: 'Start a new game!',
						players: players
					});
				}
			});
		}
	});

});

app.get('/active-game', ( req, res ) => {

	db.hgetall('game:players', ( err, results ) => {
		var players = results;
		res.render('game--active.twig', {
			title: 'Let the games begin!',
			players: players
		});
	});

});

app.get('/leaderboard', ( req, res ) => {
	db.zrevrange('scores', 0, -1, ( err, result ) => {
			res.render('leaderboard.twig', {
			title: 'Winners!',
			leaders: result
		});
	});
});

// Application Endpoints

app.post('/players/add', ( req, res ) => {
	var name = req.body.name;
	console.log(name);
	db.hset('players:' + name, 'Name', name);
	res.redirect('/new-game');
});

app.get('/players/score/:player', (req, res) => {
	var player = req.params.player;
	db.zincrby('scores', 1, player);
	res.redirect('/leaderboard');
});

app.post('/game/start', (req, res) => {
	db.hset('game:players', 'Player 1', req.body.players[0]);
	db.hset('game:players', 'Player 2', req.body.players[1]);
	res.redirect('/active-game');
});