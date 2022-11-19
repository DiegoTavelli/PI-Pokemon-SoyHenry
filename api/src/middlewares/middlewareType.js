
const { Type } = require('../db')
const axios = require('axios');


let getTypes = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/type');
  await Promise.all(
    response.data.results.map((t, i) => {
      let typ = {
        id: ++i,
        name: t.name
      };
      let { name } = typ
      Type.findOrCreate({ where: { name: name } })
    })
  )
}

module.exports = {
  getTypes,
};
