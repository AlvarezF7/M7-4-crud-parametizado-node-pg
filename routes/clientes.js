//rutas y define endpoint

const express = require('express');
const router = express.Router();

const controller = require('../controllers/clientesController');

router.get('/', controller.getClientes);
router.post('/', controller.crearCliente);
router.put('/:rut', controller.actualizarCliente);
router.delete('/', controller.eliminarCliente);



module.exports = router;