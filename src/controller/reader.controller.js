import File from "../service/getfile.service";
import ErrorHandler from "./errorhandler.controller";

export default class {
  constructor() {
    this.readed = null;
    this.file = File("selectFiles") != false ? File("selectFiles") : null;
  }

  readJSONFile() {
    let errorHandler = new ErrorHandler();
    const temporaryFileReader = new FileReader();
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        try {
          resolve(JSON.parse(temporaryFileReader.result));
        } catch(e) {
          errorHandler.fileJSON("JSON file is not correct");
        }
      };
      temporaryFileReader.readAsText(this.file.item(0));
    });
  }
}
