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
      bridges.string('country');
      bridges.string('province');
      bridges.string('district');
      bridges.string('sector');
      bridges.string('cell');
      bridges.integer('project_code');
      bridges.string('project_stage');
      bridges.string('bridge_type');
      bridges.string('span');
      bridges.float('lat');
      bridges.float('long');
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('profiles');
  return knex.schema.dropTableIfExists('bridges');
};
