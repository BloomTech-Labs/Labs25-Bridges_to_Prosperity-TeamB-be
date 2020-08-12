const express = require('express');
const bridges = require('./bridgeModel');
const router = express.Router();

router.get('/', async (req, res) => {
  //   bridges
  //     .findAll()
  //     .then(async (bridgestemp) => {
  //       const finalreturn = bridgestemp.map((item) => {
  //         return { ...item, communities_served: [] };
  //       });

  //       try {
  //         finalreturn.forEach(
  //           async (bridge) =>
  //             await bridges
  //               .findCommunitiesForBridge(bridge.id)
  //               .then((communities) => {
  //                 bridge.communities_served = communities.map((item) => {
  //                   return item;
  //                 });
  //               })
  //         );
  //       } catch (error) {
  //         console.log(error);
  //       }
  //       await res.status(200).json(finalreturn);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({ message: err.message });
  //     });
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
