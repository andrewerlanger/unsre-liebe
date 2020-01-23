var popupManager = {
  init: function() {
    // this.bkg = chrome.extension.getBackgroundPage();
    this.startButton = document.getElementById("startButton");
    this.loadingButton = document.getElementById("loadingButton");
    this.stopButton = document.getElementById("stopButton");
    this.initializeDisplay();
    this.addStartListener();
    this.addStopListener();
  },
  initializeDisplay: function() {
    chrome.storage.sync.get("running", result => {
      result.running && this.toggleButtonDisplay();
    });
  },
  addStartListener: function() {
    this.startButton.addEventListener("click", () => {
      this.setRunningState(true);
      this.toggleButtonDisplay();
      this.executeScript();
    });
  },
  addStopListener: function() {
    this.stopButton.addEventListener("click", () => {
      this.setRunningState(false);
      this.toggleButtonDisplay();
    });
  },
  toggleButtonDisplay: function() {
    this.startButton.classList.toggle("hidden");
    this.loadingButton.classList.toggle("hidden");
    this.stopButton.classList.toggle("hidden");
  },
  setRunningState: function(state) {
    chrome.storage.sync.set({
      running: state
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
