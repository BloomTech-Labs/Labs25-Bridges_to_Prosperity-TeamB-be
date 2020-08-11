const express = require('express');
const communities = require('./communityModel');
const router = express.Router();

router.get('/', (req, res) => {
    communities.findCommunitiesForBridge()
    .then((communities) => {
        res.status(200).json(communities);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
})



module.exports = router;