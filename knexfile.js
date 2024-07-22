module.exports = {
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '1234',
      database: 'barriga'
    },
    migrations: {
      directory: 'src/migrations'
    },
    debug: true
  }
};
