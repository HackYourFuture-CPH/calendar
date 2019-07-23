exports.up = function(knex) {
  return knex.schema.createTable("module_teachers", table => {
    table.increments();
    table
      .integer("teacher_id")
      .unsigned()
      .references("id")
      .inTable("teachers")
      .onDelete("CASCADE");
    table
      .integer("module_id")
      .unsigned()
      .references("id")
      .inTable("modules")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("module_teachers");
};
