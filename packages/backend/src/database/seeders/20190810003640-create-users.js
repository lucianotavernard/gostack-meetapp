const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Tony Stack',
        email: 'iroman@marvel.com',
        password_hash: bcrypt.hashSync('13245678', 8),
        updated_at: new Date(),
        created_at: new Date(),
      },
    ])
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users')
  },
}
