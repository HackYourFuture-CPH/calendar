exports.up = function(knex) {
  return knex.schema.createTable("breaks", table => {
    table.increments();
    table.string("title").notNullable();
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("breaks");
};
