exports.up = function(knex) {
  return knex.schema.createTable("teachers", table => {
    table.increments();
    table.string("name");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("teachers");
};
