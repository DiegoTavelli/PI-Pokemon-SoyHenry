const { Router } = require('express');
const router = Router();
const axios = require('axios').default;

const { Pokemon, Type } = require('../db')
const { getAll } = require('../middlewares/middlewares')

router.get('/', async (req, res) => {
  let pokemonInfo = [];
  try {
    pokemonInfo = await getAll();
    res.json(pokemonInfo)
  } catch (error) {
    console.log("Error on get route '/'", error)
  }
})

router.post('/', async (req, res) => {
  const {
    name, hp, attack, defense, speed, height, weight, typeOne, typeTwo
  } = req.body;
  if (!name || !hp || !attack || !defense || !speed || !height || !weight) {
    return res.json({ info: "Some of the arguments are not valid" });
  }
  //I search in db if there is a Pokemon with that name.
  let exist = await Pokemon.findOne({ where: { name: name } });
  if (exist) return res.json({ info: "Pokemon already exists" });

  let pokemon = await Pokemon.create({
    name: name.toLowerCase(),
    hp: Number(hp),
    attack: Number(attack),
    defense: Number(defense),
    speed: Number(speed),
    height: Number(height),
    weight: Number(weight),
  });

  let types = [typeOne, typeTwo ? typeTwo : null];

  // let pokeTypes = await Type.findAll({
  //   where: { name: typeOne }
  // });

  await pokemon.addTypes(types);
  res.json({ info: "Pokemon successfully created" })
})


module.exports = router;

