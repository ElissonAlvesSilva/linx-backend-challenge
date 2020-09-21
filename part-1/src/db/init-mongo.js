// init mongo database
/* eslint-disable no-undef */
const database = 'product_db';
db = db.getSiblingDB(database);
// create use mongo and set a property read adn write
db.createUser({
  user: 'product',
  pwd: 'pr0duc1e',
  roles: [
    { role: 'readWrite', db: `${database}` },
  ],
});
