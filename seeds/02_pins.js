
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pins').del()
    .then(function () {
      // Inserts seed entries
      return knex('pins').insert([
        {
          id: 'ec26cfc3-0a83-4e79-91c8-3feee4ec74e3',
          title: 'Japanese Girl',
          image: 'https://i.pinimg.com/564x/24/a0/62/24a062b3b470c9f176906e04732e83df.jpg',
          user_id: '6181e41e-6482-4826-b954-bc88ed56bdf5'
        },
        {
          id: '53938211-265e-4cc3-b70d-b548c3b99ebe',
          title: 'Lion',
          image: 'https://i.pinimg.com/564x/fc/6e/c3/fc6ec3bae39de7b49ddd4cc17d63bacd.jpg',
          user_id: '6181e41e-6482-4826-b954-bc88ed56bdf5'
        },
        {
          id: 'e904eef0-b01e-4dab-9d7d-faf51cb19356',
          title: 'Rebel Girl',
          image: 'https://i.pinimg.com/564x/71/7c/29/717c29265a1069224d622cf78aef3796.jpg',
          user_id: '6181e41e-6482-4826-b954-bc88ed56bdf5'
        },
        {
          id: 'f7370829-4d99-40b6-bf62-c2c8ad6b1285',
          title: 'Rebel Girl 2',
          image: 'https://i.pinimg.com/564x/f6/f7/29/f6f7290d3aba58adc8cd50328164f9f1.jpg',
          user_id: 'ab252242-6853-4615-80a4-b1ca7762725f'
        },
        {
          id: '52ef235c-d1cb-472a-862a-e54bc2cd97c6',
          title: 'Nice Room',
          image: 'https://i.pinimg.com/564x/5a/d2/45/5ad24596be683dcec5905fd140fc1fd4.jpg',
          user_id: 'ab252242-6853-4615-80a4-b1ca7762725f'
        },
        {
          id: 'aaf045fd-2352-41e7-887e-d9366043e0d3',
          title: 'Nice Bathroom',
          image: 'https://i.pinimg.com/564x/fd/f4/46/fdf44657ebbcc46715e0e68bfdca7cf5.jpg',
          user_id: 'e43875db-61f6-4429-bf8c-889712d940b6'
        },
      ]);
    });
};
