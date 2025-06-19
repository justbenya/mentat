import React, { useState } from 'react';

import { countAccess, countRevealBlades, countRevealPersuasion, countUsedCopies, groupCards } from '@/core/utils';

import cards from './data/cards.json';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-4 space-y-4">
        <CardSearch />
      </div>
    </div>
  );
}

const players = [
  { id: 3, name: 'Красный', color: 'red' },
  { id: 1, name: 'Зеленый', color: 'green' },
  { id: 4, name: 'Желтый', color: 'yellow' },
  { id: 2, name: 'Синий', color: 'blue' },
];

const playerColors = {
  green: 'bg-green-500 hover:bg-green-600 text-white',
  blue: 'bg-blue-500 hover:bg-blue-600 text-white',
  red: 'bg-red-500 hover:bg-red-600 text-white',
  yellow: 'bg-yellow-500 hover:bg-yellow-600 text-black',
};

const colorStyles = {
  green: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
  },
};

function CardSearch() {
  const [query, setQuery] = useState('');
  const [addedCards, setAddedCards] = useState({});
  const [isFocused, setIsFocused] = useState(false);

  const usedCounts = countUsedCopies(addedCards);

  const filtredCards = cards?.filter((card) => {
    const used = usedCounts[card.id] || 0;
    const available = card.amount || 1;
    return used < available;
  });

  const filtered =
    query === '' && isFocused
      ? filtredCards
      : filtredCards?.filter((card) => {
          const used = usedCounts[card.id] || 0;
          const available = card.amount || 1;
          return card.name.toLowerCase().includes(query.toLowerCase()) && used < available;
        });

  const handleAddCard = (card, playerId) => {
    const usedCounts = countUsedCopies(addedCards);
    const used = usedCounts[card.id] || 0;
    const max = card.amount || 1;

    if (used >= max) return; // все копии уже использованы

    setAddedCards((prev) => {
      const existing = prev[playerId] || [];
      return { ...prev, [playerId]: [...existing, card] };
    });

    // Если после добавления достигнут лимит, сбрасываем поиск
    if (used + 1 >= max) {
      setQuery('');
    }
  };

  const handleRemoveCard = (card, playerId) => {
    setAddedCards((prev) => {
      const playerCards = prev[playerId] || [];

      // Удаляем только первую найденную копию
      const indexToRemove = playerCards.findIndex((c) => c.id === card.id);
      if (indexToRemove === -1) return prev; // ничего не удалять, если карта не найдена

      const updated = [...playerCards.slice(0, indexToRemove), ...playerCards.slice(indexToRemove + 1)];

      return {
        ...prev,
        [playerId]: updated,
      };
    });
  };

  return (
    <div className="w-full mx-auto space-y-4">
      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск карты..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:outline-none"
      />

      {/* Результаты с кнопками игроков */}
      {isFocused && filtered.length > 0 && (
        <div className="bg-white border rounded-md shadow-md divide-y">
          {filtered.map((card, index) => (
            <div
              key={card.id + index}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 hover:bg-gray-50"
            >
              {/* Изображение */}
              <div className="relative group shrink-0">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-12 h-16 object-cover rounded shadow-sm"
                />
                <div className="absolute top-0 left-14 z-10 w-48 h-auto hidden group-hover:block">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-48 h-auto rounded shadow-lg border border-gray-300"
                  />
                </div>
              </div>

              {/* Информация + кнопки */}
              <div className="flex-1 space-y-2">
                <div className="font-bold">{card.name}</div>
                <div className="text-sm text-gray-600">Стоимость: {card.cost}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {players.map((player) => (
                    <button
                      key={player.id}
                      onClick={() => handleAddCard(card, player.id)}
                      className={`px-3 py-1 rounded text-sm ${playerColors[player.color]}`}
                    >
                      {player.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Добавленные карты у игроков */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {players.map((player) => (
          <div
            key={player.id}
            className={`p-3 rounded-lg border ${colorStyles[player.color].bg}`}
          >
            <div className={`font-semibold ${colorStyles[player.color].text} mb-2`}>{player.name}</div>
            <div className="flex mb-2 flex-col">
              <p className="mb-1.5">Доступы: </p>
              <ul className="space-y-1 text-sm">
                {Object.entries(countAccess(addedCards[player.id])).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}</strong>: {value}
                  </li>
                ))}
              </ul>

              <p className="mb-1.5">Ножей на ревиле: {countRevealBlades(addedCards[player.id])}</p>
              <p className="mb-1.5">Убеждения: {countRevealPersuasion(addedCards[player.id])}</p>
            </div>
            <ul className="text-sm space-y-1">
              {groupCards(addedCards[player.id]).map((card) => (
                <li
                  key={card.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 hover:bg-gray-50"
                >
                  <div className="relative group shrink-0 flex items-center">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-12 h-16 object-cover rounded shadow-sm"
                    />
                    <div className="absolute top-0 left-14 z-10 w-48 h-auto hidden group-hover:block">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-48 h-auto rounded shadow-lg border border-gray-300"
                      />
                    </div>
                    {card.count > 1 && <div className="ml-2 text-xs text-gray-600">×{card.count}</div>}
                  </div>
                  <button
                    onClick={() => handleRemoveCard(card, player.id)}
                    className={`px-3 py-1 rounded text-sm ${playerColors[player.color]}`}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
