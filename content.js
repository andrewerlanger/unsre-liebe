var linkHelper = {
  init: function () {
    chrome.storage.sync.get("running", result => {
      result.running && this.checkPage();
    });
  },
  checkPage: function () {
    var regex = /.*union-zeughaus\.de\/union-berlin\/.*\.-spieltag\.htm/g;
    if (regex.test(window.location.href)) {
      var link = document.querySelector(".fa-arrow-circle-right");
      link && link.click();
    }
  }
};

linkHelper.init();