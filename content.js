var linkHelper = {
  init: function() {
    // this.link = document.querySelector(".fa-arrow-circle-right");
    console.log(window.location.href);
    var regex = /.*union-zeughaus\.de\/union-berlin\/\.*-spieltag\.htm/g;
    if (window.location.href.match(regex)) {
      console.log("in here");
      var link = document.querySelector("#HomeLink");
      link && link.click();
    }
  }
};

linkHelper.init();
