const express = require('express');
const bridges = require('./bridgeModel');
const router = express.Router();

router.get('/', (req, res) => {

    bridges.findAll()
    .then(async (bridgestemp) => {
        const finalreturn = bridgestemp.map(item => { return {...item, communities_served: []}})

        try {
            await finalreturn.forEach(bridge => bridges.findCommunitiesForBridge(bridge.id)
            .then(communities => {
                bridge.communities_served = communities.map(item => {return item})
            }))
        } catch (error) {
            console.log(error)
        }
        await (res.status(200).json(finalreturn))
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
})

router.get('/communities/:id', (req, res) => {
    const id = req.params.id
    bridges.findCommunitiesForBridge(id)
    .then((communities) => {
        res.status(200).json(communities);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
})



module.exports = router;