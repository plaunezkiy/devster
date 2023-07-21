/*
card: {
    front: string,
    back: string,
    hint: string,
    module: string,
    correct: boolean,
}
*/
document.addEventListener("alpine:init", () => {
  Alpine.data("module_select", () => ({
    open: false,
    query: "",
    results: [],
    selected: [],

    async fetchModules(q) {
      if (q.length >= 2) {
        fetch(`/api/cards/module?name=${q}`)
          .then((resp) => resp.json())
          .then((data) => {
            this.results = data;
          });
      }
      this.toggleSearch();
    },

    hasModule(name) {
      let module = this.selected.find((m) => m.name === name);
      return module != undefined;
    },

    addModule(module) {
      if (!this.hasModule(module.name)) {
        this.selected.push(module);
      }
      this.clearSearch();
    },

    clearSearch() {
      (this.query = ""), this.toggleSearch();
      this.results = [];
    },

    toggleSearch() {
      this.open = this.query != "";
    },
  }));

  Alpine.data("card_round", () => ({
    flip: false,
    sessionId: 1,
    card: {
      front: "Front of the card",
      back: "Back of the card",
      hint: "The hint will be here",
      module: null,
      correct: false,
    },
    queue: [],
    // 0 for OFF, 1 for ON, 2 for LAST_CARD
    roundState: 0,
    csrf_token: null,

    async fetchSession() {
      return fetch(
        `/api/cards/session/${this.sessionId}/generate_queue?slug=arabic`,
        {
          method: "GET",
        }
      );
    },

    async fetchNextCard() {
      return fetch(`/api/cards/session/${this.sessionId}/get_card/`, {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then((data) => {
          // handle no cards left
          let x = Math.random();
          this.flip = x > 0.5 ? true : false;
          this.card = data;
          this.queue.push(this.card);
        });
    },

    async sendCardAnswer() {
      return fetch(`/api/cards/session/${this.sessionId}/answer/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": this.csrf_token,
        },
        body: JSON.stringify({
          id: this.card.id,
          correct: this.card.correct,
        }),
      });
    },

    startRound() {
      // clear timer

      // clear the queue
      this.queue = [];

      // fetch the session
      this.fetchSession();

      // fetch the card
      // once received, set Round state to ON and start the timer
      this.fetchNextCard();
      this.roundState = 1;
      // this.timer
    },

    answerHandler(correct) {
      // save answer locally and send it to db
      this.queue[this.queue.length - 1].correct = correct;
      // this.sendCardAnswer();
      // fetch a new card or stop the round
      switch (this.roundState) {
        case 1:
          this.fetchNextCard();
          break;
        case 2:
          this.stopRound();
          break;
        default:
          return;
      }
    },

    stopRound() {
      switch (this.roundState) {
        case 1:
          // switch off the timer
          this.roundState = 2;
          break;
        case 2:
          this.roundState = 0;
          // clear the session
          break;
        default:
          return;
      }
    },
  }));
});
