
const { Type } = require('../db')
const axios = require('axios');


let getTypes = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/type');
  await Promise.all(
    response.data.results.map((type, i) => {
      let types = {
        id: ++i,
        name: type.name
      };
      Type.findOrCreate({ where: { name: types.name } })
    })
  )
}

module.exports = {
  getTypes,
};
