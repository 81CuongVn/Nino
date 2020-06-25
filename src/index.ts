import Bot, { Config } from './structures/Bot';
import container from './inversify.config';
import { TYPES } from './types';
import { init } from '@sentry/node';

const pkg: any = require('../package.json');
const config = container.get<Config>(TYPES.Config);
const bot = container.get<Bot>(TYPES.Bot);

if (!config.sentryDSN) {
  console.warn('WARNING: Missing "sentryDSN" in the "config.yml" file! This is optional to add but recommnended!');
} else {
  init({
    dsn: config.sentryDSN,
    release: `${pkg.version}`,
  });
}

bot.build()
  .then(() => bot.logger.info('All set!'));

process.on('SIGINT', () => {
  bot.dispose();
  bot.logger.warn('Process was exited!');
  process.exit();
});