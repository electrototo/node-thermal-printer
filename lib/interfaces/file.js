const Interface = require("./interface");

const SerialPort = require('serialport');

class File extends Interface {

  constructor(path) {
    super();
    this.path = path;

    this.port = new SerialPort(path, {
      baudRate: 9600,
    });
  }


  async isPrinterConnected() {
    return true;
  }


  async execute(buffer) {
    return new Promise((resolve, reject) => {
      this.port.write(buffer, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve("Print done");
        }
      });
    });
  }
}


module.exports = File;
