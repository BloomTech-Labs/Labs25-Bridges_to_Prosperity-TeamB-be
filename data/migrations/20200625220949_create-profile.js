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
      bridges.integer('b2p_bridge_id');
      bridges.string('country');
      bridges.string('province');
      bridges.string('district');
      bridges.string('sector');
      bridges.string('cell');
      bridges.integer('project_code');
      bridges.string('project_stage');
      bridges.string('sub_stage');
      bridges.string('bridge_type');
      bridges.string('span');
      bridges.float('lat');
      bridges.float('long');
    })
    .createTable('communities', function (communities) {
      communities.increments();
      communities.integer('b2p_community_id');
      communities.string('name');
    })
    .createTable('communities_served', function (communities_served) {
      communities_served.increments();
      communities_served
        .integer('bridge_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('bridges')
        .onUpdate('CASCADE');
      communities_served
        .integer('community_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('communities')
        .onUpdate('CASCADE');
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('bridges');
  await knex.schema.dropTableIfExists('profiles');
  await knex.schema.dropTableIfExists('communities_served');
  return knex.schema.dropTableIfExists('communities');
};
