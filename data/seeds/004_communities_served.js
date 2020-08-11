
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('communities_served').del()
    .then(function () {
      // Inserts seed entries
      return knex('communities_served').insert([
        {
          bridge_id: 1,
          community_id: 1,
        },
      ]);
    });
};