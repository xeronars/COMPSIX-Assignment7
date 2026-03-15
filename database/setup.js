const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance
const db = new Sequelize({
  dialect: "sqlite",
  storage: `database/${process.env.DB_NAME}` || "database/music_library.db",
  logging: console.log,
});

// Define Track model
const Track = db.define("Track", {
  trackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  songTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artistName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  albumName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, // in seconds
  },
  releaseYear: {
    type: DataTypes.INTEGER,
  },
});

// Create the database and tables
async function setupDatabase() {
  try {
    await db.authenticate();
    console.log("Connection to database established successfully.");

    await db.sync({ force: true });
    console.log(
      "Database file created at:",
      `database/${process.env.DB_NAME}`
    );

    await db.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Only run when this file is called directly
if (require.main === module) {
  setupDatabase();
}

module.exports = { db, Track };