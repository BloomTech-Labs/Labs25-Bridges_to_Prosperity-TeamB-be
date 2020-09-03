const express = require('express');
const bridgeModel = require('./bridgeModel');
const router = express.Router();

router.get('/', async (req, res) => {
  bridgeModel
    .findAll()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

module.exports = router;
