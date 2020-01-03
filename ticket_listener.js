var ticketListener = {
  init: function () {
    this.url = window.location.href;
    this.failureString = "Derzeit stehen keine Tickets zur Verfügung";
    this.injectAudio();
    this.sendRequest();
  },
  injectAudio: function () {
    this.audio = document.createElement('audio');
    this.audio.id = 'audioAlert';
    this.audio.src = 'http://soundbible.com/mp3/sms-alert-5-daniel_simon.mp3';
    this.audio.preload = 'auto';
    document.body.appendChild(this.audio);
  },
  sendRequest: function () {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        self.searchForTickets(xhr.response);
      } else {
        chrome.runtime.sendMessage({
          code: "error"
        });
      }
    };
    xhr.open('GET', this.url, true);
    xhr.send();
  },
  searchForTickets: function (response) {
    if (response.includes("thisshouldnotbehere")) {
      // if (response.includes(this.failureString)) {
      this.handleFailure();
    } else {
      this.handleSuccess();
    }
  },
  handleSuccess: function () {
    window.open(this.url, "_blank");
    this.audio.play();

    chrome.runtime.sendMessage({
      code: "success"
    });
  },
  handleFailure: async function () {
    console.log("No tickets found, trying again...");
    await this.sleep();
    this.sendRequest();
  },
  sleep: function () {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
}

ticketListener.init();