import React, { useReducer } from 'react';
import AddItem from '../components/AddItem';
import ItemList from '../components/ItemList';

const initialItems = [
  { id: 0, text: 'Milk', done: false },
  { id: 1, text: 'Eggs', done: false },
  { id: 2, text: 'Noodles', done: false },
];

function itemsReducer(items, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...items,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return items.map((item) => {
        if (item.id === action.task.id) {
          return action.task;
        }
        return item;
      });
    }
    case 'deleted': {
      return items.filter((item) => item.id !== action.id);
    }
  }
}

export default function Home() {
  const [items, dispatch] = useReducer(itemsReducer, initialItems);

  const handleAdd = (text) => {
    dispatch({
      type: 'added',
      id: items.length + 1,
      text,
    });
  };
  const handleChange = (task) => {
    dispatch({
      type: 'changed',
      task,
    });
  };
  const handleDelete = (taskId) => {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  };
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
