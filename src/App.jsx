import './App.css';
import Header from './components/Header/Header';
import { ListProvider } from './context/ListContext';
import Home from './views/Home';
export default function App() {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}
