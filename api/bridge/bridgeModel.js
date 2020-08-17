const db = require('../../data/db-config');

const findAll = async () => {
  return await db('bridges');
};
const findbyStage = async (stage) => {
  return await db('bridges')
    .where({'bridges.Project_Stage': stage})
};
const findCommunitiesForBridge = async (id) => {
  return await db('bridges as b')
    .join('communities_served as cs', 'b.id', 'cs.bridge_id') //links bridges to middle table
    .join('communities as c', 'c.id', 'cs.community_id') //links communities to middle table
    .select('c.id', 'c.name') //returns the id and name of community served at the id below
    .where({ 'b.id': id });
};
module.exports = { findAll, findbyStage, findCommunitiesForBridge };
