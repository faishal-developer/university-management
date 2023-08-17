import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
// import logger from './shared/logger'

//for uncaughtException error it mainly occured synchronusly.So it may be not handled by unHandled rejection
process.on('uncaughtException', error => {
  // logger.errorLogger.error(err)
  console.log(error)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      // logger.logger.info(`example app listning`)
    })
  } catch (err) {
    // logger.errorLogger.error(err)
    console.log(err)
  }

  //for unwanted unhandledRejection error.That is mainly asynchronus
  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        // logger.errorLogger.error(err)
        console.log(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
main()

process.on('SIGTERM', () => {
  // logger.logger.info('SIGTERM is recived')
  if (server) {
    server.close()
  }
})
