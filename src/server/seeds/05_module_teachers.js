exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("module_teachers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("module_teachers").insert([
        { id: 1, teacher_id: 3, module_id: 1 },
        { id: 2, teacher_id: 4, module_id: 1 }
      ]);
    });
};
