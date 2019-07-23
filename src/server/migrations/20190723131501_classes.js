exports.up = function(knex) {
  return knex.schema.createTable("classes", table => {
    table.increments();
    table.string("title").notNullable();
    table.boolean("active");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("classes");
};
