import React from 'react';
import { useItems } from '../../context/ListContext';

export default function Header(items) {
  const { handleClear } = useItems();

  const clearItems = () => {
    handleClear(items);
  };
  return (
    <header>
      shopping list
      <button type="button" onClick={clearItems}>
        Clear
      </button>
    </header>
  );
}
