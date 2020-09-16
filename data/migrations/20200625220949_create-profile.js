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
      bridges.string('bridge_site_name');
      bridges.string('project_stage');
      bridges.string('sub_stage');
      bridges.string('project_code').unique();
      bridges.string('bridge_type');
      bridges.float('span');
      bridges.float('lat');
      bridges.float('long');
      bridges.string('individuals_directly_served');
      bridges.string('form_name');
      bridges.string('community_served_1');
      bridges.string('community_served_2');
      bridges.string('community_served_3');
      bridges.string('community_served_4');
      bridges.string('community_served_5');
      bridges.string('community_served_6');
      bridges.string('community_served_7');
      bridges.string('community_served_8');
      bridges.string('community_served_9');
      bridges.string('community_served_10');
      bridges.string('casesafeid_form');
      bridges.string('bridge_opportunity_id');
      bridges.string('bridge_image');
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('bridges');
  return knex.schema.dropTableIfExists('profiles');
};
