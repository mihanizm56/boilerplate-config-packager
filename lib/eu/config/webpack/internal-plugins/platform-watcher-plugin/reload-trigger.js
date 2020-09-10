// eslint-disable-next-line
const WebSocket = require('ws');

const platformPort = process.env.PLT_STREAM_SEND_PORT || 5010;

module.exports.reloadTrigger = () => {
  const ws = new WebSocket(`ws://localhost:${platformPort}`);

  ws.on('open', function open() {
    ws.send('trigger');
    ws.close();
  });
};
