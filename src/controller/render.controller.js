import $ from 'jquery';

//KLASA ZA RENDER CONTROLLER
export default class RenderController {
  //KONSTRUKTOR DOHVAĆA KOJI TEMPLATE RENDERA TE NA KOJI ID APPENDA TAJ RENDER
  constructor(url, id) {
    this.url = url; //PUTANJA
    this.id = id; //ID
  }

  //RENDER ZA HTML
  HTML(fCallback = false) {
    $("#" + this.id).load(this.url, fCallback); //RENDERAJ I POZOVI CALLBACK
  }
}
