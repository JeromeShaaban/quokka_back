const express = require('express');
const app = express();
const connection = require('./db-config');


const KeanuRoad = require('express').Router();

  KeanuRoad.get('/keanu', (req, res) =>  {
  connection.query('SELECT * FROM keanuquotes', (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send("err retrieving keanu's precious words from db");
    } else {
      res.json(results)
    }
  })
})

KeanuRoad.get('/keanu/random', (req, res) =>  {
  const random = Math.floor(Math.random() * 12 + 1)
  connection.query('SELECT * FROM keanuquotes where id = ?', random, (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send("err retrieving keanu's precious words from db");
    } else {
      res.json(results)
    }
  })
})

KeanuRoad.post('/keanu', (req, res) =>  {
  connection.query('insert into keanuquotes (quote) VALUES (?)',[req.body.quote], (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send("err posting keanu's precious words from db");
    } else {
      res.json(results)
    }
  })
})

KeanuRoad.delete('/keanu/:id', (req, res) =>  {
  id = req.params.id
  connection.query('delete from keanuquotes where id = ?',id, (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send("err deleting keanu's precious words from db");
    } else {
      res.json(results)
    }
  })
})

KeanuRoad.get('/keanu/form', (req,res) => {
  res.send(
  `<h2>Post a quote</h2>
  <div>
  <form method="POST" action="/keanu">
    <label>quote :</label>
    <input type="text" name="quote"/>
    <input type="submit" value="submit"/>
  </form>
  </div>
  </div>`)
})


module.exports = KeanuRoad