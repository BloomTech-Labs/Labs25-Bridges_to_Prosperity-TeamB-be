const express = require('express');
const bridgeModel = require('./bridgeModel');
const router = express.Router();
const dsModel = require('../dsService/dsModel');

router.get('/', async (req, res) => {
  dsModel
    .bridgeData()
    .then((response) => {
      for (let i = 0; i < response.length; i++) {
        bridgeModel.addBridge(response[i]);
      }
      bridgeModel.findAll().then((response) => {
        res.status(200).json(response);
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

module.exports = router;
