const express = require('express');

const bridgeModel = require('../bridge/bridgeModel')

module.exports = (req, res, next) => {
    const id = req.params.id
    bridgeModel.getBridgeById(id)
    .then(bridge => {
        if(bridge.length == 0) {
        res.status(404).json({message: "Can not find a bridge with this ID" })
        } else {
            next()
        }
    })
    .catch(error => {
        res.status(404).json({message: "Can not retrieve data" })
    })
}