const fs = require('fs');
const path = require('path');

const resolvers = {};
fs.readdirSync(path.join(__dirname, 'resolvers')).forEach(
  filename => Object.assign(resolvers, require(`./resolvers/${filename}`))
  // Gathering all exports from files in `./resolvers`
);

module.exports = resolvers;
