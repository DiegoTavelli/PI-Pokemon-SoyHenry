const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Pokemon, Type } = require('../db')
const { getAll, getById, getByName } = require('../middlewares/middlewares')


router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      let byName = await getByName(name);
      return res.send(byName);
    }
    let byAll = await getAll();
    return res.send(byAll);
  } catch (error) {
    return res.status(500).send('--Error on get Route Pokemons', error)
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let response = await getById(id);
    return res.json(response);
  } catch (error) {
    res.status(500).send("Error on get '/:id'", error);
  }
});

router.post('/', async (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, typeOne, typeTwo, image } = req.body;

  try {

    if (!name || !attack || !defense || !speed || !height || !weight || !typeOne) {
      return res.status(400).json({ info: "Some of the arguments are not valid" });
    }

    if (typeof name !== 'string' || typeof typeOne !== 'string' || typeof typeTwo !== 'string') {
      return res.status(400).json({ info: "Name, typeOne and typeTwo must be String" });
    }

    if (
      typeof Number(attack) !== 'number' || typeof Number(defense) !== 'number' || typeof Number(speed) !== 'number'
      || typeof Number(height) !== 'number' || typeof Number(weight) !== 'number') {
      return res.status(400).json({ info: "hp, attack defense speed height and weight must be Number" })
    }
    // search in db if there is a Pokemon with that name.
    let exist = await Pokemon.findOne({ where: { name: name } });
    if (exist) return res.status(404).json({ info: "Pokemon already exists" });

    const pokemon = await Pokemon.create({
      name: name.toLowerCase(),
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
      image: image,
    });

    let types = [typeOne, typeTwo ? typeTwo : ""];

    for (let i = 0; i < types.length; i++) {
      let eachType = await Type.findOne({
        where: { name: types[i] },
      });
      await pokemon.addTypes(eachType);
    }
    return res.status(200).send({ info: "Pokemon successfully created" })
  } catch (error) {
    next("Error on post '/' route");
  }
});

// delete by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const findToDeleteByID = await Pokemon.findOne({
    where: {
      id: id
    }
  });
  return res.json(await findToDeleteByID.destroy({
    truncate: true
  }));
});

//delete by Name
try {
  router.delete('/delete', async (req, res) => {
    const { name } = req.body;
    const findToDeleteByName = await Pokemon.findOne({
      where: {
        name: name
      }
    });
    await findToDeleteByName.destroy({
      truncate: true
    });
    if (findToDeleteByName) {
      return res.status(200).send({ info: 'se borro' });
    }
    return res.status(400).send({ info: 'NO se borro' });
  });
}
catch (e) {
  console.log('Error on deleteByID Route', e)
}




module.exports = router;

