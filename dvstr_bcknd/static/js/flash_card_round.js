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
  Alpine.data("card_round", () => ({
    card: { front: null, back: null, hint: null, module: null, correct: false },
    queue: [],
    roundState: 0,
  }));
});
