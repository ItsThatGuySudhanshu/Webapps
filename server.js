const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const db = require("./db/conn");
const { ObjectID } = require('bson');
const dbName = "db-name";
const collectionName = "users";
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

    db.initialize(dbName, collectionName, (users) => { // successCallback

      // This displays message that the server running and listening to specified port
      app.listen(PORT, () => {
        console.log(`Backend server is listening on port: ${PORT}`);
      });

        app.get('/', function(req, res){
            res.send('Hello world');
        });
      // Returns a list of movies from the API
      app.get("/api/movies", async (req, res) => {
        let list = [];
        try {
          for (let i = 1; i <= 6; i++) {
          const uri = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${i}`;
          const response = await axios.get(uri);
          list = [...list, ...response.data.results];
        }
          res.send(list);
        } catch (err) {
            console.log(err);
          }
        });

      // Returns the movies in a user's watchlist
      app.get("/api/users/:userId/watchlist", async (req, res) => {
        try {
          const user = await users.findOne({ _id: ObjectID.createFromHexString(req.params.userId) });
          res.send(user.watchlist);
          } catch (err) {
            console.log(err);
          }
        });

        // Adds a movie to a user's watchlist
        app.post("/api/users/:userId/watchlist/add", async (req, res) => {
          try {
              await users.updateOne({
              _id: ObjectID.createFromHexString(req.params.userId)}, {
              $push: {
                watchlist: req.body
              }
              });
            res.status(200).send(req.body);
          } catch(err) {
            console.log(err);
          }
        });

        // Removes a movie from a user's watchlist
        app.delete("/api/users/:userId/watchlist/remove", async (req, res) => {
          try {
            await users.updateOne({
            _id: ObjectID.createFromHexString(req.params.userId)}, {
            $pull: {
              watchlist: req.body
            }
            });
          res.status(200).send(req.body);
        } catch(err) {
          console.log(err);
        }
        });
      });