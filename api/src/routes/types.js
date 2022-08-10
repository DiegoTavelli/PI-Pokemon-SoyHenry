const { Router } = require('express');
// const axios = require('axios');
const { Type } = require('../db.js')

const router = Router();
// const { getTypes } = require('../middlewares/middlewares')

router.get('/', (req, res, next) => {
  return Type.findAll()
    .then((types) => res.send(types))
    .catch((err) => next(err))
})


module.exports = router;