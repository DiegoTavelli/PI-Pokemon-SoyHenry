const { Router } = require('express');
const router = Router();

// Import Routers;
const pokemons = require('./pokemons.js');
const types = require('./types.js')


// Configure Routers
router.use('/pokemons', pokemons);
router.use('/types', types)



module.exports = router;
