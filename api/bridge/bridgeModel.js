const db = require('../../data/db-config');

const findAll = async () => {
    return await db('bridges');
  };

module.exports = { findAll };