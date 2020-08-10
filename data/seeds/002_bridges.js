
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('bridges').del()
    .then(function () {
      // Inserts seed entries
      return knex('bridges').insert([
        {
          id: 1, 
          country: 'Rwanda',
          province: 'Western Province',
          district: 'Rusizi',
          sector: 'Giheke',
          cell: 'Gakomeye',
          project_code: 1014107,
          project_stage: 'Completed',
          bridge_type: 'Suspended',
          span: '8 Meters',
          lat: -2.420560,
          long: 28.966200
        },
      ]);
    });
};
