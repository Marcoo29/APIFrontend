import { useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";

const cards = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Card ${i + 1}`,
}));

export default function CardList() {
  const [page, setPage] = useState(0);
  const cardsPerPage = 12;

  const pages = [];
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    pages.push(cards.slice(i, i + cardsPerPage));
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pages[page].map((card) => (
          <Card key={card.id} title={card.title} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={pages.length}
        onPageChange={setPage}
      />
    </div>
  );
}
