
import Header from './components/Header'
import SearchBar from './components/SearchBar/index.js';
import Footer from './components/Footer'
import RecentsBacks from './components/RecentsBacks';

function App() {
  return (
    <div className="App">
        <Header/>
        <SearchBar/>
        <RecentsBacks/>
        <Footer/>
    </div>
  );
}

export default App;
