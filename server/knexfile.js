'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/betamonster_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/betamonster_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
