import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import logger from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      logger.logger.info(`example app listning`)
    })
  } catch (err) {
    logger.errorLogger.error(err)
  }
}
main()
