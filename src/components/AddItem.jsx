import React, { useState } from 'react';

export default function AddItem({ onAdd }) {
  const [newItem, setNewItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewItem('');
    onAdd(newItem);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
