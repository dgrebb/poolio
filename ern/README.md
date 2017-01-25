# Technology Stack #

* Express
* Redis
* Node
* jQuery

# Application Structure #

## Endpoints ##

* /players/add (add a new player)
* /players/score/player (update a player's score)
* /game/start (start a new game)

## Views ##

* / (view leaderboard, or start a new game)
* /new-game start a new game / add a new player
* /active-game current game (new feature?) / winner select
* /leaderboard leaderboard

## Redis Data Model ##

* players:player -> Name [hash]
* game:players -> Player 1 [hash]
* game:players -> Player 2 [hash]
* scores -> Name(rank) [score]
