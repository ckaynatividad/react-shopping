import { createContext, useContext, useReducer } from 'react';

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

export const ListContext = createContext();

const ListProvider = ({ children }) => {
  const [items, dispatch] = useReducer(itemsReducer, initialItems);

  const initialItems = [
    { id: 0, text: 'Milk', done: false },
    { id: 1, text: 'Eggs', done: false },
    { id: 2, text: 'Noodles', done: false },
  ];

  const handleAdd = (text) => {
    dispatch({
      type: 'added',
      id: items.length + 1,
      text,
    }),
      addItem({
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
    <ListContext.Provider
      value={{ initialItems, handleAdd, handleChange, handleDelete }}
    >
      {children}
    </ListContext.Provider>
  );
};

const useItems = () => {
  const context = useContext(ListContext);

  if (context === undefined) {
    throw new Error('must be used within listprovider');
  }
  return context;
};

export { ListProvider, useItems };