const axios = require('axios');
require('dotenv').config();

const menuAPI = async () => {
  const config = {
    method: 'GET',
    url: 'http://localhost:3001/menu',
    headers: {
      Authorization: `Bearer ${process.env.MONGODB_URI}`,
    },
  };
  const data = await axios(config).then((i) => i.data);
  const tipos = data.menus.map((m) => `*${m.tipo}*`);
  return tipos;
};

// Función para obtener los platos por tipo
function getPlatosPorTipo(menu, tipo) {
  const menuTipo = menu.find((m) => m.tipo === tipo);
  if (!menuTipo) {
    return `No se encontró un menú del tipo ${tipo}`;
  }
  return menuTipo.platos.map((plato) => {
    const platoInfo = [
      `Nombre: ${plato.nombre}`,
      `Descripción: ${plato.descripcion}`,
      `Precio: ${plato.precio}`,
    ];
    return {
      text: platoInfo.join('\n'),
      media: plato.imagen,
    };
  });
}

const menuCategories = async (tipo) => {
  const config = {
    method: 'GET',
    url: 'http://localhost:3001/menu',
    headers: {
      Authorization: `Bearer ${process.env.MONGODB_URI}`,
    },
  };
  const data = await axios(config).then((i) => i.data);
  const platos = getPlatosPorTipo(data.menus, tipo);
  return platos;
};

const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const JsonFileAdapter = require('@bot-whatsapp/database/json');

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer([
  '📄 Aquí tenemos el flujo secundario',
]);

const flowDocs = addKeyword([
  'doc',
  'documentacion',
  'documentación',
]).addAnswer(
  [
    '📄 Aquí encuentras la documentación recuerda que puedes mejorarla',
    'https://bot-whatsapp.netlify.app/',
    '\n*2* Para siguiente paso.',
  ],
  null,
  null,
  [flowSecundario],
);

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
  [
    '🙌 Aquí encontras un ejemplo rapido',
    'https://bot-whatsapp.netlify.app/docs/example/',
    '\n*2* Para siguiente paso.',
  ],
  null,
  null,
  [flowSecundario],
);

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
  [
    '🚀 Puedes aportar tu granito de arena a este proyecto',
    '[*opencollective*] https://opencollective.com/bot-whatsapp',
    '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
    '[*patreon*] https://www.patreon.com/leifermendez',
    '\n*2* Para siguiente paso.',
  ],
  null,
  null,
  [flowSecundario],
);

const flowDiscord = addKeyword(['discord']).addAnswer(
  [
    '🤪 Únete al discord',
    'https://link.codigoencasa.com/DISCORD',
    '\n*2* Para siguiente paso.',
  ],
  null,
  null,
  [flowSecundario],
);

const flowCategories = addKeyword([
  'Hamburguesa',
  'Desayunos',
  'Almuerzos',
  'Sopas/Caldos',
  'Picadas/Parrilladas',
  'Arroz Chino',
  'Alitas BBQ/Fritas',
  'Pepito',
  'Salchipapa',
  'Perros Calientes',
  'Empanadas',
]).addAnswer({ capture: true }, null, async (ctx, { flowDynamic }) => {
  const data = await menuCategories(ctx.body);
  for (const plato of data) {
    const message = [{ body: plato.text, media: plato.media }];
    await flowDynamic(message);
  }
});

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAnswer('🙌 Hola bienvenido al chatbot de "La Calle del Sabor"')
  .addAnswer(
    'Tenemos las siguientes *Categorías* de Menús:',
    null,
    async (ctx, { flowDynamic }) => {
      data = await menuAPI();
      await flowDynamic(data);
    },
  )
  .addAnswer('Escribe una *Categoría* para ver su detalle');

const main = async () => {
  const adapterDB = new JsonFileAdapter();
  const adapterFlow = createFlow([flowPrincipal, flowCategories]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
