const axios = require('axios');
const express = require('express');
const { Pokemon, Type } = require('../db.js');

const getAll = async () => {
  let dbApi = [];
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');

    // save the API response to the Array to map.
    dbApi = [...response.data.results];

    let pokemonApi = [];

    // Promise.all to call each url and push info to pokemonApi.
    await Promise.all(
      dbApi?.map(async (el) => {
        if (el.url) {
          const response = await axios.get(el.url);
          const r = response.data;
          pokemonApi.push({
            id: r.id,
            name: r.name,
            hp: r.stats[0].base_stat,
            attack: r.stats[1].base_stat,
            defense: r.stats[2].base_stat,
            speed: r.stats[5].base_stat,
            height: r.height,
            weight: r.weight,
            img: r.sprites.other["official-artwork"]["front_default"],
            type: r.types.map((t) => t.type.name),
          });
        };
      })
    );
    const db = await Pokemon.findAll({
      include: {
        model: Type,
        as: 'types'
      }
    });
    if (db.length) {
      //If have Pokemons in db, spread to join db and Api Response.
      dbApi = [...pokemonApi, ...db];
    } else {
      //If don't have any on db, just return what's in the Api.
      dbApi = [...pokemonApi]
    }
    return dbApi;

  } catch (error) {
    console.log("Error on getAll middleware", error)
  }
};

const getByName = async (name) => {
  try {
    let fromDb = await Pokemon.findOne({
      where: {
        name: name
      },
      include: {
        model: Type,
        as: 'types'
      }
    });//
    if (fromDb) return fromDb;
    let pokeName = {};
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const r = response.data;
    pokeName = {
      id: r.id,
      name: r.name,
      hp: r.stats[0].base_stat,
      attack: r.stats[1].base_stat,
      defense: r.stats[2].base_stat,
      speed: r.stats[5].base_stat,
      height: r.height,
      weight: r.weight,
      img: r.sprites.other["official-artwork"]["front_default"],
      type: r.types.map((t) => t.type.name),
    };
    return pokeName;
  } catch (error) {
    return 'There are no matches getByName';
  }
}

const getById = async (id) => {
  let pokeId = {};
  const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  try {
    //if regexp test true for UUID I return it from my db.
    if (regex.test(id)) {
      let fromDb = await Pokemon.findByPk(
        id, {
        include: {
          model: Type,
          as: 'types'
        }
      });
      if (fromDb) return fromDb;
      return 'There are no matches getById'
    }
    //else I go to the API to get it.
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const r = response.data;
    pokeId = {
      id: r.id,
      name: r.name,
      hp: r.stats[0].base_stat,
      attack: r.stats[1].base_stat,
      defense: r.stats[2].base_stat,
      speed: r.stats[5].base_stat,
      height: r.height,
      weight: r.weight,
      img: r.sprites.other["official-artwork"]["front_default"],
      type: r.types.map((t) => t.type.name),
    }
    return pokeId;

  } catch (error) {
    return 'There are no matches getById';
  }
};

module.exports = {
  getAll,
  getById,
  getByName,
};
