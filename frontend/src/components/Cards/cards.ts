import { Card } from "@/lib/types";

const API_URL = "http://127.0.0.1:8000";
// const API_URL = "http://192.168.1.206:8000";

export const fetchCards = async () => {
  return fetch(API_URL + "/api/cards/card/", {
    cache: "no-store",
  }).then((resp) => resp.json());
};

export const createCard = async (card: Card | unknown) => {
  console.log("about to create a card", card);

  return fetch(API_URL + "/api/cards/card/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  });
};

export const deleteCard = async (id: number) => {
  return fetch(API_URL + `/api/cards/card/${id}/`, { method: "DELETE" });
};
