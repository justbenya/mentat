function countAccess(cards) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return {};
  }

  const desiredOrder = ['emperor', 'guild', 'bene', 'fremen', 'green', 'blue', 'yellow'];

  const accessCounts = {};

  cards.forEach((card) => {
    (card.access || []).forEach((accessType) => {
      accessCounts[accessType] = accessCounts[accessType] ? accessCounts[accessType] + 1 : 1;
    });
  });

  const sortedCounts = {};
  desiredOrder.forEach((key) => {
    if (accessCounts[key]) {
      sortedCounts[key] = accessCounts[key];
    }
  });

  return sortedCounts;
}

function countRevealBlades(cards) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return 0;
  }

  return cards.reduce((sum, card) => {
    const blades = card.reveal?.blades || 0;
    return sum + blades;
  }, 0);
}

function countRevealPersuasion(cards) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return 0;
  }

  return cards.reduce((sum, card) => {
    const persuasion = card.reveal?.persuasion || 0;
    return sum + persuasion;
  }, 0);
}

function countUsedCopies(addedCards) {
  const counts = {};

  Object.values(addedCards)
    .flat()
    .forEach((card) => {
      counts[card.id] = (counts[card.id] || 0) + 1;
    });

  return counts;
}

function groupCards(cards = []) {
  const grouped = {};

  for (const card of cards) {
    if (!grouped[card.id]) {
      grouped[card.id] = { ...card, count: 1 };
    } else {
      grouped[card.id].count++;
    }
  }

  return Object.values(grouped);
}

export { countAccess, countRevealBlades, countRevealPersuasion, countUsedCopies, groupCards };
