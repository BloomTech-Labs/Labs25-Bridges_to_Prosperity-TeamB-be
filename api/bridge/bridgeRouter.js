const express = require('express');
const bridgeModel = require('./bridgeModel');
const router = express.Router();
const validateBridgeId = require('../middleware/validate-bridge-id');

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

  router.get('/:id', validateBridgeId, async (req, res) => {
    const id = req.params.id;
    bridgeModel.getBridgeById(id).then((bridge) => {
      res.status(200).json(bridge);
    });
  });

  router.put('/update/:id', validateBridgeId, async (req, res) => {
    const id = req.params.id;
    const updatedBridge = {
      ...req.body,
    };
    bridgeModel
      .updateBridge(id, updatedBridge)
      .then((newBridge) => {
        res.status(200).json(newBridge);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
});

module.exports = router;
