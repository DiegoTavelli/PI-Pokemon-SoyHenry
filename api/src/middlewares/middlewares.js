const axios = require('axios');
// const express = require('express');
const { Pokemon, Type } = require('../db.js');

const getAll = async () => {
  let dbApi = [];
  try {
    const db = await Pokemon.findAll({ include: Type });
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
    dbApi = [...response.data.results];

    let pokemonApi = [];
    await Promise.all(
      dbApi.map(async (el) => {
        if (el.url) {
          const r = await axios.get(el.url)
          pokemonApi.push({
            id: r.data.id,
            name: r.data.name,
            type: r.data.types.map((t) => t.type.name),
            img: r.data.sprites.other["official-artwork"]["front_default"],
            strength: r.data.stats[1].base_stat,
          });
        };
      })
    );
    dbApi = [...db, ...pokemonApi];
    return dbApi;

  } catch (error) {
    console.log("Error on getAll middleware", error)
  }
}



module.exports = {
  getAll
};
