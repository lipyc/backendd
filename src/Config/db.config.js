module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "notlipyc123",
    DB: "PI3",
    dialect: "postgres",
    PORT: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
   }
};