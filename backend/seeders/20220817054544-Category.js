'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Categories',  
    [{ 
     name: "Прогнозы в IT", 
     slug: "it-predict",
     createdAt : new Date(),
     updatedAt: new Date()    
    },
   {
       name: "Веб-разработка",
        slug: "web-dev",
        createdAt : new Date(),
        updatedAt: new Date()
   },
   {
    name: "Мобильная разработка",
     slug: "mobile-dev",
     createdAt : new Date(),
     updatedAt: new Date()
},
{
    name: "Фриланс",
     slug: "freelance",
     createdAt : new Date(),
     updatedAt: new Date()
},
{
    name: "Алгоритмы",
     slug: "algo",
     createdAt : new Date(),
     updatedAt: new Date()
},
{
    name: "Тестирование IT систем",
     slug: "testing",
     createdAt : new Date(),
     updatedAt: new Date()
},
{
    name: "Разработка игр",
     slug: "game-dev",
     createdAt : new Date(),
     updatedAt: new Date()
},
{
    name: "Дизайн и юзабилити",
     slug: "ui-ux",
     createdAt : new Date(),
     updatedAt: new Date()
},
{
    name: "Искуственный интелект",
     slug: "ai",
     createdAt : new Date(),
     updatedAt: new Date()
},
{
    name: "Машинное обучение",
     slug: "ml",
     createdAt : new Date(),
     updatedAt: new Date()
}], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Categories', null, {});
  }
};
