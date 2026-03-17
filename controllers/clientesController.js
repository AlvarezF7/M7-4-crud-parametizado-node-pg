//consultas validacines y respuestas
const pool = require('../dataBase');

// Listar clientes
const getClientes = async (req, res) => {
  try {
    const { rut, nombre, edad } = req.query;
    let query = 'SELECT * FROM clientes_t2';
    const values = [];
    const condiciones = [];

    if(rut) { condiciones.push(`rut=$${values.length+1}`); values.push(rut); }
    if(nombre) { condiciones.push(`nombre ILIKE $${values.length+1}`); values.push(nombre + '%'); }
    if(edad) { condiciones.push(`edad=$${values.length+1}`); values.push(edad); }

    if(condiciones.length) query += ' WHERE ' + condiciones.join(' AND ');

    const { rows } = await pool.query(query, values);
    res.json({ ok: true, data: rows });
  } catch(err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error al obtener clientes' });
  }
};

// Crear cliente
const crearCliente = async (req, res) => {
  try {
    const { rut, nombre, edad } = req.body;
    if(!rut || !nombre || !edad) return res.status(400).json({ ok: false, mensaje: 'Todos los campos son obligatorios' });

    // Verificar duplicado
    const { rowCount: existe } = await pool.query('SELECT 1 FROM clientes_t2 WHERE rut=$1', [rut]);
    if(existe) return res.status(409).json({ ok: false, mensaje: 'Rut ya existe' });
    const { rows } = await pool.query(
      'INSERT INTO clientes_t2(rut,nombre,edad) VALUES($1,$2,$3) RETURNING *',
      [rut, nombre, edad]
    );
    res.status(201).json({ ok: true, data: rows[0] });
  } catch(err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error al crear cliente' });
  }
};

// Actualizar cliente
const actualizarCliente = async (req, res) => {
  try {
    const { rut } = req.params;
    const { nombre } = req.body;
    if(!nombre) return res.status(400).json({ ok: false, mensaje: 'Nombre es obligatorio' });

    const { rowCount } = await pool.query('UPDATE clientes_t2 SET nombre=$1 WHERE rut=$2', [nombre, rut]);
    if(!rowCount) return res.status(404).json({ ok: false, mensaje: 'Cliente no existe' });

    res.json({ ok: true, rowCount, mensaje: 'Actualizado correctamente' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar cliente' });
  }
};

// Eliminar cliente
const eliminarCliente = async (req, res) => {
  try {
    const { rut, nombre, edad } = req.query;

    if (!rut && !nombre && !edad) {
      return res.status(400).json({ ok: false, mensaje: 'Debe ingresar al menos un criterio (rut, nombre o edad)' });
    }

    // Construir query dinámico
    const condiciones = [];
    const values = [];
    if (rut) { condiciones.push(`rut=$${values.length + 1}`); values.push(rut); }
    if (nombre) { condiciones.push(`nombre ILIKE $${values.length + 1}`); values.push(nombre + '%'); }
    if (edad) { condiciones.push(`edad=$${values.length + 1}`); values.push(edad); }

    const query = `SELECT * FROM clientes_t2 WHERE ${condiciones.join(' AND ')}`;
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'No existen clientes con ese parametro'});
    }

    if (rows.length > 1) {
      return res.status(400).json({ 
        ok: false, 
        mensaje: 'Más de un cliente coincide, ingresa un segundo parametros' 
      });
    }

    // Solo hay un cliente → lo eliminamos
    const clienteEliminar = rows[0];
    await pool.query('DELETE FROM clientes_t2 WHERE rut=$1', [clienteEliminar.rut]);

    res.json({ 
      ok: true, 
      rowCount: 1, 
      mensaje: 'Cliente eliminado correctamente', 
      data: clienteEliminar // enviamos rut, nombre y edad
    });

  } catch(err) {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar cliente' });
  }
};

module.exports = { getClientes, crearCliente, actualizarCliente, eliminarCliente };