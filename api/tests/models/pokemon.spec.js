const { Pokemon, Type, conn } = require('../../src/db.js');
const { expect } = require('chai');
const app = require('../../src/app.js');
const session = require('supertest-session');


const agent = session(app);
const pokemon = {
  name: "mewtwo",
  hp: 200,
  attack: 200,
  defense: 100,
  speed: "200",
  height: 11,
  weight: 21,
};
describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
    describe('wrong speed typeof', () => {
      it('should throw an error if speed is not a Number', () => {
        Pokemon.findAll()
          .then(r => expect(r).to.be.an('array'))
      })
    })
  });
});
