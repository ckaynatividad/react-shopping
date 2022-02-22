import React, { useReducer } from 'react';
import AddItem from '../components/AddItem';
import ItemList from '../components/ItemList';
import { ListProvider, useItems } from '../context/ListContext';
import { addItem } from '../services/utils';

export default function Home() {
  const { items, handleChange, handleDelete, handleAdd } = useItems();

  return (
    <div className="Home">
      <h4>Shopping List</h4>
      <ItemList
        items={items}
        onChangeItem={handleChange}
        onDeleteItem={handleDelete}
      />
      <AddItem onAdd={handleAdd} />
    </div>
  );
}
