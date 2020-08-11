
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('communities').del()
    .then(function () {
      // Inserts seed entries
      return knex('communities').insert([
        {
          b2p_community_id: 1241254,
          name: 'gakori',
        },
      ]);
    });
};
