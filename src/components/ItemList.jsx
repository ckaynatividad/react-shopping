import React from 'react';
import { useItems } from '../context/ListContext';
import Item from './Item';

export default function ItemList() {
  const { items } = useItems();
  console.log(items);
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Item item={item} onChange={onChangeItem} onDelete={onDeleteItem} />
        </li>
      ))}
    </ul>
  );
}
