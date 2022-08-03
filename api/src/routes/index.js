const { Router } = require('express');
const router = Router();

// Import Routers;
const pokemons = require('./pokemons');
const types = require('./types')


// Configure Routers
router.use('/pokemons', pokemons);
router.use('/types', types)


module.exports = router;
