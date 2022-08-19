
import Header from './pages/static/components/Header'
import SearchBar from './pages/static/components/SearchBar/index.js';
import Footer from './pages/static/components/Footer';
import { useEffect, useState } from 'react';
import RecentsBacks from './pages/home/components/RecentsBacks';
import Panel from './pages/back/components/Panel';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {

  const [selectContent, setSelectContent] = useState()
  const [isHome, setHome] = useState(true)
  const navigate = useNavigate();

  const setRecentBack = ({ value }) => {
    setSelectContent({ url: value.mal_url, ...value })
    (value)
  }

  const setNewContent = ({ value }) => {
    setSelectContent({ ...value, ...value.payload })
  }
  useEffect(() => {
    if (selectContent)
      navigate(`/panel/${selectContent.type}/${selectContent.id}`, { replace: true })
  }, [selectContent])

  return (
    <div className="App">
      <Header onClick={setHome} />
      <SearchBar onClick={setNewContent} />
      <Routes>
        <Route path="/" element={<RecentsBacks onClickContent={setRecentBack} />} />
        <Route path="/panel/:category/:id" element={<Panel selectContent={selectContent} />} />
        <Route path="/back/details/:id" element={<Panel selectContent={selectContent} />} />
        <Route path="*" element={ <Navigate to="/" />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
