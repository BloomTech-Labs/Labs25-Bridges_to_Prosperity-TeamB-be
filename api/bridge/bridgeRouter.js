const express = require('express');
const bridges = require('./bridgeModel');
const router = express.Router();

router.get('/', (req, res) => {
    bridges.findAll()
    .then((bridges) => {
        res.status(200).json(bridges);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
})



module.exports = router;