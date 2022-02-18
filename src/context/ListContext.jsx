import { createContext, useContext, useEffect, useReducer } from 'react';

function itemsReducer(items, action) {
  console.log(action);

  switch (action.type) {
    case 'added': {
      const list = [
        ...items,
        {
          id: items.length,
          text: action.text,
          done: action.task ? true : false,
        },
      ];
      localStorage.setItem('LIST', JSON.stringify(list));
      return list;
    }
    case 'changed': {
      const list = items.map((item) => {
        if (item.id === action.task.id) {
          return action.task;
        }
        return item;
      });
      localStorage.setItem('LIST', JSON.stringify(list));
      return list;
    }
    case 'deleted': {
      const list = items.filter((item) => item.id !== action.id);
      localStorage.setItem('LIST', JSON.stringify(list));
      return list;
    }
    case 'clear': {
      const list = (items = []);
      localStorage.setItem('LIST', JSON.stringify(list));
      return list;
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
    dispatch({
      type: 'added',
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
