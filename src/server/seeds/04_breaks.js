exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("breaks")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("breaks").insert([
        {
          id: 1,
          title: "Summer holiday",
          start_date: "2019-07-07 13:50:26",
          end_date: "2019-07-28 13:50:26"
        }
      ]);
    });
};
