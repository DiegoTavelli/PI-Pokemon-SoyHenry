/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Route Tests', () => {

  describe('Pokemon route', () => {
    before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      }));
    beforeEach(() => Pokemon.sync({ force: true })
      .then(() => Pokemon.create(pokemon)));
    describe('GET /pokemons', () => {
      it('should get 200', () =>
        agent.get('/pokemons').expect(200)
      );
      describe('GET /types', () => {
        it('expect a 200 response', () => agent.get('/types').expect(200));
      });
      describe('GET /anyBadRequest', () => {
        it('expect 404 response', () => agent.get('/anyBadRequest').expect(404));
      });

    });
  });





})