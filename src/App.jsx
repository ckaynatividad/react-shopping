import './App.css';
import { ListProvider } from './context/ListContext';
import Home from './views/Home';
export default function App() {
  return (
    <div className="App">
      <ListProvider>
        <Home />
      </ListProvider>
    </div>
  );
}
