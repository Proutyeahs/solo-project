const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  const query =`
    SELECT * FROM "species"
    ORDER BY "species".species_name ASC
  ;`;
  pool.query(query).then(result => {
    console.log("hi", result.rows)
    res.send(result.rows)
  }).catch (err => {
    console.log(err)
    res.sendStatus(500)
  })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body.name)
    const query =`
    INSERT INTO "species" ("species_name")
    VALUES ($1)
    ;`;
    pool.query(query, [req.body.name]).then(result => {
        res.sendStatus(200)
    }).catch (err => {
        console.log(err)
        res.sendStatus(500)
    })
})

module.exports = router;
