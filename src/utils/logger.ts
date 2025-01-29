class Logger {
  log(message: string, data?: any) {
    const timestamp = new Date().toISOString()
    const logEntry = `${timestamp} - ${message}${data ? ` - ${JSON.stringify(data)}` : ''}`
    console.log(logEntry)
  }

  error(message: string, error?: any) {
    const timestamp = new Date().toISOString()
    const logEntry = `${timestamp} - ERROR - ${message}${error ? ` - ${JSON.stringify(error)}` : ''}`
    console.error(logEntry)
  }
}

export const logger = new Logger()
