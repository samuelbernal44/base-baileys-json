/* eslint-disable no-undef */
const app = require('./src/app');
const port = process.env.PORT || 3001;
require('./src/db');

app.listen(port, () => {
  console.log('listening on port ', port);
});
