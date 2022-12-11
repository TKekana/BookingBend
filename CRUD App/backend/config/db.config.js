module.exports = {
user: 'postgres',
host: 'localhost',
database: 'db_london',
password: '123456789',
port: 5432,


dialect: "postgres",
pool: {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}
}