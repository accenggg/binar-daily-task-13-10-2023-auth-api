"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    // Hash kata sandi sebelum menyimpannya
    const hashedPassword = bcrypt.hashSync("wahyu123", saltRounds);

    // Menambahkan data pengguna ke tabel Users
    await queryInterface.bulkInsert("Users", [
      {
        name: "wahyu",
        age: 21,
        address: "Tenggarong",
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const wahyu = "wahyu";
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE name='${wahyu}' AND role = 'Owner'`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const userId = users[0].id;
    console.log(userId);

    // Menambahkan data otentikasi ke tabel Auth dengan menghubungkannya ke pengguna
    await queryInterface.bulkInsert("Auths", [
      {
        email: "wahyu@gmail.com",
        password: hashedPassword,
        cofirmPassword: hashedPassword, // Ini mungkin harus diperbarui sesuai dengan kebutuhan Anda
        userId: userId, // Menghubungkan otentikasi dengan pengguna
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete("Auths", null, { transaction });
      await queryInterface.bulkDelete("Users", null, { transaction });
    });
  },
};
