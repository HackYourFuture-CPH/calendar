exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("classes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("classes").insert([
        { id: 1, title: "Class 08", active: true },
        { id: 2, title: "Class 09", active: true },
        { id: 3, title: "Class 10", active: true },
        { id: 4, title: "Class 11", active: true }
      ]);
    });
};
