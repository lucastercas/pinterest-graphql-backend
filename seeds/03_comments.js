
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          user_id: '6181e41e-6482-4826-b954-bc88ed56bdf5',
          pin_id: 'ec26cfc3-0a83-4e79-91c8-3feee4ec74e3',
          content: 'Iae mano, beleza?'
        },
        {
          user_id: 'ab252242-6853-4615-80a4-b1ca7762725f',
          pin_id: 'ec26cfc3-0a83-4e79-91c8-3feee4ec74e3',
          content: 'Beleza brother, tudo bem contigo?'
        },
        {
          user_id: '6181e41e-6482-4826-b954-bc88ed56bdf5',
          pin_id: 'ec26cfc3-0a83-4e79-91c8-3feee4ec74e3',
          content: 'Tudo bem comigo irmão, e com você?'
        },
        {
          user_id: 'ab252242-6853-4615-80a4-b1ca7762725f',
          pin_id: 'ec26cfc3-0a83-4e79-91c8-3feee4ec74e3',
          content: 'Comigo vai tudo bem bro, e ai?'
        },
      ]);
    });
};
