const express = require('express');
const bridges = require('./bridgeModel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allBridges = await bridges.findAll();
    const final = await Promise.all(
      allBridges.map(async (bridge) => {
        const communities_served = await bridges.findCommunitiesForBridge(
          bridge.id
        );
        return { ...bridge, communities_served };
      })
    );
    res.status(200).json(final);
  } catch (error) {
    console.log('error');
    res.status(500).json({ message: error.message });
  }
});
//url.com/bridges/status?project_stage='Completed'
router.get('/status', async (req, res) => {
  const query = req.query.project_stage;
  console.log(query)
  try {
    const queriedBridges = await bridges.findbyStage(query);
    const final = await Promise.all(
      queriedBridges.map(async (bridge) => {
        const communities_served = await bridges.findCommunitiesForBridge(
          bridge.id
        );
        return { ...bridge, communities_served };
      })
    );
    res.status(200).json(final);
  } catch (error) {
    console.log('error');
    res.status(500).json({ message: error.message });
  }
});

router.get('/communities/:id', (req, res) => {
  const id = req.params.id;
  bridges
    .findCommunitiesForBridge(id)
    .then((communities) => {
      res.status(200).json(communities);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
