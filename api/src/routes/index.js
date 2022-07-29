const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const pokemon = require('./pokemon');
const type = require('./type')

router.use('./pokemon', pokemon);
router.use('/type', type)


module.exports = router;
