exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: '6181e41e-6482-4826-b954-bc88ed56bdf5',
          email: 'lucastercas@gmail.com',
          username: 'lucastercas'
        },
        {id: 'ab252242-6853-4615-80a4-b1ca7762725f', email: 'lucasmtercas@gmail.com', username: 'lucasmtercas'},
        {id: 'e43875db-61f6-4429-bf8c-889712d940b6', email: 'lucastercas@hotmail.com', username: 'lucastercashot'},
      ]);
    });
};
