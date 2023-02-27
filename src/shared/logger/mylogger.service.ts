import { ConsoleLogger } from "@nestjs/common";
import { appendFileSync, mkdirSync, renameSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { EOL } from "node:os"

const MAX_LOG_LEVEL = parseInt(process.env.MAX_LOG_LEVEL, 10) || 5;
const MAX_LOG_FILE_IN_KB = parseInt(process.env.MAX_LOG_FILE_IN_KB, 10) || 10;

export class MyLogger extends ConsoleLogger {
    levels = {
      1: 'error',
      2: 'warn',
      3: 'log',
      4: 'verbose',
      5: 'debug'
    }

    error(message: any, stack?: string) {
      this.writeToFile(1, message, stack)
    }

    warn(message: any, stack?: string) {
      this.writeToFile(message, stack)
    }

    log(message: any, stack?: string) {
      this.writeToFile(3, message, stack)
    }

    verbose(message: any, stack?: string) {
      this.writeToFile(4, message, stack)
    }

    debug(message: any, stack?: string) {
      this.writeToFile(5, message, stack)
    }

    private writeToFile(level: number, message: any, stack?: string) {
      if (level > MAX_LOG_LEVEL) {
        return
      }
      const currentDate = new Date();
      const fileName = `${this.levels[level]}s`
      const path = join('./logs', `${fileName}.log`);
      const logMessage = `${currentDate.toISOString()}: LOG [${stack}] ${message}${EOL}`;

      try {
        const stats = statSync(path);
        if ((stats.size) / 1024 > MAX_LOG_FILE_IN_KB) {
          const newPath = join(dirname(path), `${fileName}-${Date.now()}.log`);
          renameSync(path, newPath)
        }
      } catch (e) {
        
      }
      mkdirSync(dirname(path), { recursive: true });
      appendFileSync(path, logMessage);
      process.stdout.write(logMessage);
    }
  }