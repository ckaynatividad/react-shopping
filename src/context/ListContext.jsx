import { createContext, useContext, useEffect, useReducer } from 'react';

function itemsReducer(items, action) {
  let list;
  switch (action.type) {
    case 'added': {
      list = [
        ...items,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
      localStorage.setItem('LIST', JSON.stringify(list));
      return list;
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
    case 'clear': {
      return (items = []);
    }
  }
}
const initialItems = [
  { id: 0, text: 'Milk', done: false },
  { id: 1, text: 'Eggs', done: false },
  { id: 2, text: 'Noodles', done: false },
];

export const ListContext = createContext();

// localStorage.setItem('LIST', JSON.stringify(initialItems));
const ListProvider = ({ children }) => {
  const [items, dispatch] = useReducer(itemsReducer, []);

  useEffect(() => {
    const fetchItems = () => {
      try {
        let localStorageItems = JSON.parse(localStorage.getItem('LIST'));
        localStorageItems.map((item) => handleAdd(item.text));
      } catch {
        initialItems.map((item) => handleAdd(item.text));
      }
    };
    fetchItems();
  }, []);
  const handleAdd = (text) => {
    const addItems = dispatch({
      type: 'added',
      id: items.length,
      text,
    });
    console.log(addItems);
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
  const handleClear = (items) => {
    dispatch({
      type: 'clear',
      id: items,
    });
  };
  return (
    <ListContext.Provider
      value={{ items, handleAdd, handleChange, handleDelete, handleClear }}
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
