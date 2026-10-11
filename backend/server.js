require("dotenv").config();
const sequelize = require("./src/config/db");
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Не удалось подключиться к БД:", err);
  }
}

start();
