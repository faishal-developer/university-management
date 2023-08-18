'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = __importDefault(require('mongoose'))
const app_1 = __importDefault(require('./app'))
const index_1 = __importDefault(require('./config/index'))
// import logger from './shared/logger'
//for uncaughtException error it mainly occured synchronusly.So it may be not handled by unHandled rejection
process.on('uncaughtException', error => {
  // logger.errorLogger.error(err)
  console.log(error)
  process.exit(1)
})
let server
function main() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield mongoose_1.default.connect(index_1.default.database_url)
      server = app_1.default.listen(index_1.default.port, () => {
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
  })
}
main()
process.on('SIGTERM', () => {
  // logger.logger.info('SIGTERM is recived')
  if (server) {
    server.close()
  }
})
