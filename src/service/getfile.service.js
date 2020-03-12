import $ from "jquery";

export default function(inputID) {
  let file = $("#" + inputID)[0].files;

  if (file.length <= 0) {
    return "File is not uploaded";
  }

  if (file[0].type !== "application/json") {
    return "File is not type of JSON";
  }

  return file;
}
