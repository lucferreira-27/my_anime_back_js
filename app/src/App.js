
import Header from './components/Header'
import SearchBar from './components/SearchBar/index.js';
import Footer from './components/Footer'
import { useEffect, useState } from 'react';
import RecentsBacks from './components/RecentsBacks';
import BackConfig from './components/BackConfig';

function App() {

  const [selectContent, setSelectContent] = useState()
  const [isHome, setHome] = useState(true)
  const onClickContent = (target) =>{

    const setRecentBack = ({value}) =>{
      setSelectContent({url: value.mal_url, ...value})
    }

    const setNewContent = ({value}) =>{
      setSelectContent({...value,...value.payload})
    }
    
    if(target.type == 'recent-back'){
        setRecentBack(target)
        return
    }
    setNewContent(target)
  }

  useEffect(() =>{
      if(selectContent){
          setHome(false)
      }
  },[selectContent])


  return (
    <div className="App">
        <Header onClick={setHome}/>
        <SearchBar onClick={onClickContent}/>
        {isHome ? <RecentsBacks onClickContent={onClickContent}/> :  <BackConfig selectContent={selectContent}/>}
        <Footer/>
    </div>
  );
}

export default App;
