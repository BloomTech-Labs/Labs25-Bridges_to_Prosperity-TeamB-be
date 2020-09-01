exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
    })

    .createTable('bridges', function (bridges) {
      bridges.increments();
      bridges.string('Country');
      bridges.string('Province');
      bridges.string('District');
      bridges.string('Sector');
      bridges.string('Cell');
      bridges.string('Bridge Site Name');
      bridges.string('Project Stage');
      bridges.string('Project Sub-Stage');
      bridges.integer('Project Code');
      bridges.string('Bridge Type');
      bridges.string(' Span (m)');
      bridges.float(' GPS (Latitude)');
      bridges.float('GPS (Longitude)');
      bridges.string('Individuals Directly Served');
      bridges.string('Form: Form Name');
      bridges.string('Community Served 1');
      bridges.string('Community Served 2');
      bridges.string('Community Served 3');
      bridges.string('Community Served 4');
      bridges.string('Community Served 5');
      bridges.string('Community Served 6');
      bridges.string('Community Served 7');
      bridges.string('Community Served 8');
      bridges.string('Community Served 9');
      bridges.string('Community Served 10');
      bridges.string('CaseSafeID Form');
      bridges.string('Bridge Opportunity: Opportunity ID');
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('bridges');
  return knex.schema.dropTableIfExists('profiles');
};
