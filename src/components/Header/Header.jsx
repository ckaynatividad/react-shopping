import React from 'react';
import { useItems } from '../../context/ListContext';

export default function Header() {
  const { items, handleClear } = useItems();

  const clearItems = () => {
    handleClear(items);
  };
  return (
    <header>
      shopping list count: {items.length}
      <button type="button" onClick={clearItems}>
        Clear
      </button>
    </header>
  );
}
