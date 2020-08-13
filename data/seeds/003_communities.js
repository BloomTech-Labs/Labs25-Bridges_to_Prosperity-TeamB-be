exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('communities')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('communities').insert([
        {
          b2p_community_id: 2125751,
          name: 'Buzi',
        },
        {
          b2p_community_id: 1235673,
          name: 'Kigarama',
        },
        {
          b2p_community_id: 3235674,
          name: 'Gasharu',
        },
        {
          b2p_community_id: 4235672,
          name: 'Gatare',
        },
        {
          b2p_community_id: 5235672,
          name: 'Nygaasozi',
        },
        {
          b2p_community_id: 6235672,
          name: 'Burega',
        },
      ]);
    });
};
