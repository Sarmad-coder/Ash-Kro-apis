module.exports = {
    // HOST: "amazonapis.smstoconnect.com",
      HOST: "127.0.0.1",
    PORT: "8002",
    // USER: "smstoconnect_amazonapis",
      USER: "root",
    // PASSWORD: "Lighthouse078",
      // PASSWORD: "12345678",
      PASSWORD: "",
    // DB: "smstoconnect_amazonapis",
      DB: "ecommerce",
    dialect: "mysql",
    KEY_NAME: "cpAdhi099",
    EMAIL: "adnanexample5@gmail.com",
    PASS: "ahvafxrqzkqksexa",
    // mainUrl: "https://amazonapis.smstoconnect.com/",
    mainUrl: 'http://139.59.20.30:8000/',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
}