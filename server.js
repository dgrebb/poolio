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

// Application Views

app.get('/', ( req, res ) => {
	res.render('home.twig', { title: 'Poolio!' });
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
	res.render('leaderboard.twig', { title: 'Winners!' });
});

// Application Endpoints

app.post('/players/add', ( req, res ) => {
	var name = req.body.name;
	console.log(name);
	db.hset('players:' + name, 'Name', name);
	res.redirect('/new-game');
});

app.post('/game/start', (req, res) => {
    db.hset('game:players', 'Player 1', req.body.players[0]);
    db.hset('game:players', 'Player 2', req.body.players[1]);
    res.redirect('/active-game');
});