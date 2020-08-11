const db = require('../../data/db-config');

const findCommunitiesForBridge = async ()=> {
  return await db('communities');
}
module.exports = { findCommunitiesForBridge };