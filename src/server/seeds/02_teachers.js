exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("teachers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("teachers").insert([
        { id: 1, name: "Benjamin Hughes" },
        { id: 2, name: "Niels Gregersen" },
        { id: 3, name: "Nynne Christophersen" },
        { id: 4, name: "Rohit Sharma" }
      ]);
    });
};
