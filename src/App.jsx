import React from 'react';
import './App.css'
import {Box} from "@mui/material";
import {Routes,Route} from "react-router-dom";
import Navbar from "./components/global/navbar.jsx";
import FindAnIdea from "./components/findanidea/findAnIdea.jsx";
import StartingUp from "./components/startingUp/startingUp.jsx";
import Blog from "./components/blog/blog.jsx";
import Marketing from "./components/marketing/marketing.jsx";
import Latest from "./components/latest/latest.jsx";
import ArticleDetail from "./components/global/articleDetail.jsx";
import SearchResults from "./components/global/searchResults.jsx";
import Footer from "./components/global/footer.jsx";

function App() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Blog  />} />
            <Route path="/find-an-idea" element={<FindAnIdea />} />
            <Route path="/starting-up" element={<StartingUp />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/article-detail/:id" element={<ArticleDetail />} />
            <Route path="/search" element={<SearchResults />} />

        </Routes>
            <Footer/>
        </>
    );
}

export default App;