
import Header from './components/Header'
import SearchBar from './components/SearchBar/index.js';
import Footer from './components/Footer'
import { useState } from 'react';
import RecentsBacks from './components/RecentsBacks';
import BackConfig from './components/BackConfig';

function App() {

  const [selectContent, setSelectContent] = useState()
  const [isHome, setHome] = useState(true)
  const onClickContent = ({type,content}) =>{

    const toTitle = ({back}) => {
      let {mal_url, ...others} = back.title
      return {url: mal_url, ...others}
    }
    if (type == 'recent-back') {
      setSelectContent(toTitle(content))
      setHome(false)
      return
    }
    setSelectContent({...content,...content.payload})
    setHome(false)
  }


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
