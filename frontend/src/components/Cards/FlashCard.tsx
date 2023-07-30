"use client";
import { deleteCard } from "./cards";
import { Card } from "@/lib/types";
import { useState } from "react";

const FlashCard = ({ card }: { card: Card }) => {
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="relative w-64 h-64 p-2 text-center flex justify-center border-2 rounded-lg shadow-lg">
      <p
        className="p-1 rounded text-red-300 border border-red-300 hover:bg-red-300 hover:text-white cursor-pointer w-fit h-fit absolute top-2 right-2"
        onClick={() => deleteCard(card.id).then(() => alert("deleted"))}
      >
        X
      </p>
      <p onClick={() => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </p>
      <div className="absolute bottom-2">
        <p
          onClick={() => setShowHint(!showHint)}
          className="text-blue-500 underline cursor-pointer"
        >
          Show Hint
        </p>
        {showHint && <p>{card.hint}</p>}
      </div>
    </div>
  );
};

export default FlashCard;
