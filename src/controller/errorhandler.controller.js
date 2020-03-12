import Swal from "sweetalert2";

export default class {
  constructor() {}

  fileJSON(message) {
    Swal.fire("Error!", message, "error");
  }
}
