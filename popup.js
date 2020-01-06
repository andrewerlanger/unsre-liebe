var popupManager = {
  init: function() {
    // var bkg = chrome.extension.getBackgroundPage();
    this.startButton = document.getElementById("startButton");
    this.addStartListener();
  },
  addStartListener: function() {
    this.startButton.addEventListener("click", () => {
      this.executeScript();
    });
  },
  executeScript: function() {
    chrome.tabs.executeScript({
      file: "/ticket_listener.js"
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  popupManager.init();
});
