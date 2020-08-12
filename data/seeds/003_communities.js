
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('communities').del()
    .then(function () {
      // Inserts seed entries
      return knex('communities').insert([
        {
          b2p_community_id: 2125751,
          name: 'Buzi',
        },
        {
          b2p_community_id: 1235672,
          name: 'Buzi',
        },
      ]);
    });
};
