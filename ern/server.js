const express = require('express');
const path = require('path');
const twig = require('twig');
const bodyParser = require('body-parser');

process.on('uncaughtException', (err) => {
	console.log(err);
});

if (process.env.REDISTOGO_URL) {
    const rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var db = require("redis").createClient(rtg.port, rtg.hostname);
	db.auth(rtg.auth.split(":")[1]);
} else {
    var db = require('redis').createClient();
}

db.on('error', ( err ) => {
	console.log('Poolio encountered an error connecting to the database: ' + err);
});

const app = express();

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, './')));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
	console.log('Poolio is ready.');
});

// Application Views

app.get('/', ( req, res ) => {
	res.render('home.twig');
});

app.get('/new-game', ( req, res ) => {

	db.keys('players:*', (err, result) => {

		if ( result.length > 0 ) {

			var players = [];
			var completed = 0;
			var player1;
			var player2;

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

		} else {

			res.render('game--new.twig', {
				title: 'Start a game!'
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

		if ( result.length > 0 ) {

			res.render('leaderboard.twig', {
				title: 'Winners!',
				leaders: result
			});

		} else {

			res.render('leaderboard.twig', {
				title: 'No games have been played yet.'
			})
		}
		
	});
	
});

// Application Endpoints

app.post('/players/add', ( req, res ) => {
	var name = req.body.name;
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