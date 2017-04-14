import * as Bunyan from 'bunyan';
import * as BunyanDebugStream from 'bunyan-debug-stream';
import * as fs from 'fs';
import * as path from 'path';

let selectedLevel = Bunyan.DEBUG;
const inputLevel = Number.parseInt(process.env.LOG_LEVEL, 10);
if (!isNaN(inputLevel) && inputLevel !== selectedLevel) {
  selectedLevel = inputLevel;
}
const options = {
  name: 'twitReply',
  level: selectedLevel,
  streams: [],
  serializer: undefined,
};

options.streams.push(<never>{
  type: 'raw',
  stream: BunyanDebugStream({
    basePath: __dirname,
    forceColor: true,
  }),
  level: selectedLevel,
});

options.serializer = BunyanDebugStream.serializer;

if (process.env.LOG_PATH) {
  let basePath = process.env.LOG_PATH;
  if (basePath.endsWith('/')) {
    basePath = basePath.substr(0, basePath.length - 1);
  }
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }
  options.streams.push(<never>{
    path: path.resolve(`${basePath}/log.log`),
    level: selectedLevel,
  });
}

export default Bunyan.createLogger(options);

