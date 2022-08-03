const { Router } = require('express');
const axios = require('axios').default;
const { Type } = require('../db.js')

const router = Router();

router.get('/', async (req, res) => {

  const response = await axios.get('https://pokeapi.co/api/v2/type');
  let dbResponse = await Type.findAll();
  if (!dbResponse) {
    response.data.results.map(async (t) => {
      await Type.create({
        name: t.name
      })
    });
  }
  return res.send(await Type.findAll());
})



module.exports = router;