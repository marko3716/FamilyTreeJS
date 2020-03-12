import $ from "jquery";
import FReader from "../controller/reader.controller";
import FamilyTree from "../controller/familytree.controller";
import ErrorHandler from "../controller/errorhandler.controller";

export default class {
  constructor() {
    this.json = null;
    this.renderHTML = null;
    this.errorHandler = new ErrorHandler();
    $(document).on("click", "#import", () => this.handleUpload(new FReader()));
    $(document).on("click", "#clean", () => this.clean("appendTree"));
    this.fileName("selectFiles");
  }

  async handleUpload(fajl) {
    try {
      this.json = await fajl.readJSONFile();
      this.renderHTML = new FamilyTree(this.json).renderingUL;
      this.render("appendTree");
    } catch (e) {
      this.errorHandler.fileJSON(fajl.file);
    }
  }

  render(id) {
    $("#" + id).html(this.renderHTML);
  }

  clean(id) {
    $("#" + id).html("");
  }

  fileName(id) {
    $(document).on("change", "#" + id, function() {
      console.log($(this));
      $(this).next('.custom-file-label').html($(this).val());
    });
  }
}
