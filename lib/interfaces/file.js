const Interface = require("./interface");

const SerialPort = require('serialport');

class File extends Interface {

  constructor(path, options={ baudRate: 9600 }) {
    super();
    this.path = path;

    this.port = new SerialPort(path, {
      baudRate: options.baudRate,
      autoOpen: false,
    });
  }


  async isPrinterConnected() {
    return true;
  }


  async execute(buffer) {
    return new Promise((resolve, reject) => {
      this.port.open((err) => {
        if (err) {
          reject(err)
        }

        this.port.write(buffer);
        this.port.drain((drainError) => {
          if (drainError) {
            reject(drainError);
          }

          this.port.close();
          resolve('Done!');
        });
      });
    });
  }
}


module.exports = File;
