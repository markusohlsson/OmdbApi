import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import axios from "axios";
import { MovieSearch } from "./components/MovieSearch/MovieSearch";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav/Nav";
import { MovieSearchResult } from "./components/MovieSearchResult/MovieSearchResult";
import { Footer } from "./components/Footer/Footer";
import { MovieModal } from "./components/movieModal/MovieModal";

function App() {
  return (
    <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<MovieSearch></MovieSearch>}></Route>
        <Route path="/:id" element={<MovieModal></MovieModal>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
