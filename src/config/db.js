const config = require('../../knexfile')['development']
const knex = require('knex')(config)

knex.migrate.latest([config])

module.exports = knex