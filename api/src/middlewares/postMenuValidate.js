const postMenuValidate = (req, res, next) => {
  const { tipo, platos } = req.body;

  if (!tipo) return res.status(400).json({ error: 'Missing tipo' });
  if (!platos || !Array.isArray(platos) || platos.length === 0)
    return res.status(400).json({ error: 'Missing or empty platos' });

  for (let i = 0; i < platos.length; i++) {
    const plato = platos[i];
    if (!plato.nombre || typeof plato.nombre !== 'string')
      return res
        .status(400)
        .json({ error: `Missing or invalid nombre in plato ${i}` });
    if (!plato.descripcion || typeof plato.descripcion !== 'string')
      return res
        .status(400)
        .json({ error: `Missing or invalid descripcion in plato ${i}` });
    if (!plato.precio || typeof plato.precio !== 'number')
      return res
        .status(400)
        .json({ error: `Missing or invalid precio in plato ${i}` });
    if (!plato.imagen || typeof plato.imagen !== 'string')
      return res
        .status(400)
        .json({ error: `Missing or invalid imagen in plato ${i}` });
  }

  next();
};

module.exports = postMenuValidate;
