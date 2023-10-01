const servers = [
  {
    id: 1,
    host: 'localhost',
    port: 3002,
    weight: 1,
  },
  {
    id: 2,
    host: 'localhost',
    port: 3003,
    weight: 1,
  },
  {
    id: 3,
    host: 'localhost',
    port: 3004,
    weight: 1,
  },
  // I can add more servers here if I want.
];

module.exports = servers;
