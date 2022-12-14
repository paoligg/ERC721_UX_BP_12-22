import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ChainInfo from "./pages/ChainInfo.jsx";
import NotFound from "./pages/NotFound.jsx";
import FakeBayc from "./pages/fakeBayc.jsx";
import FakeBaycTokenInfo from "./pages/fakeBaycTokenInfo.jsx";
import FakeNefturians from "./pages/fakeNefturians.jsx";
import FakeNefturiansUserInfo from "./pages/fakeNefturiansUserInfo.jsx";
import FakeMeebits from "./pages/fakeMeebits.jsx";

function App() {

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
              <a href='/chain-info'>Chain Info</a>
          </li>
          <li>
              <a href='/fake-bayc'>Fake Bayc</a>
          </li>
          <li>
              <a href='/fake-bayc-token-info'>Fake Bayc Token Infos</a>
          </li>
          <li>
              <a href='/fake-nefturians'>Fake Nefturians</a>
          </li>
          <li>
              <a href='/fake-nefturians-user-info'>Fake Nefturians User Infos</a>
          </li>
          <li>
              <a href='/fake-meebits'>Fake Meebits</a>
          </li>
        </ul>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chain-info" element={<ChainInfo />} />
          <Route path="/not-found" element={<NotFound/>} />
          <Route path="/fake-bayc" element={<FakeBayc/>} />
          <Route path="/fake-bayc-token-info" element={<FakeBaycTokenInfo/>} />
          <Route path="/fake-nefturians" element={<FakeNefturians/>} />
          <Route path="/fake-nefturians-user-info" element={<FakeNefturiansUserInfo/>} />
          <Route path="/fake-meebits" element={<FakeMeebits/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
