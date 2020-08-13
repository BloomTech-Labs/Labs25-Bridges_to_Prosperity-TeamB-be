exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('communities_served')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('communities_served').insert([
        {
          bridge_id: 1,
          community_id: 1,
        },
        {
          bridge_id: 2,
          community_id: 2,
        },
        {
          bridge_id: 3,
          community_id: 3,
        },
        {
          bridge_id: 4,
          community_id: 4,
        },
        {
          bridge_id: 5,
          community_id: 5,
        },
      ]);
    });
};
