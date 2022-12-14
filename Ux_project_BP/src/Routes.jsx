import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import ChainInfo from "./pages/ChainInfo";
import NotFound from "./pages/NotFound.js";
import FakeBayc from "./pages/fakeBayc";
import FakeBaycTokenInfo from "./pages/fakeBaycTokenInfo.js";
import FakeNefturians from "./pages/fakeNefturians";
import FakeNefturiansUserInfo from "./pages/fakeNefturiansUserInfo";
import FakeMeebits from "./pages/fakeMeebits";
import WrongNetwork from "./pages/WrongNetwork";

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/chain-info" element={<ChainInfo />} />
      <Route path="/fakeBayc" element={<FakeBayc />} />
      <Route path="/fakeBayc/:tokenId" element={<FakeBaycTokenInfo />} />
      <Route path="/fakeNefturians" element={<FakeNefturians />} />
      <Route path="/fakeNefturians/:userAddress" element={<FakeNefturiansUserInfo />} />
      <Route path="/fakeMeebits" element={<FakeMeebits />} />
      <Route path="/wrongNetwork" element={<WrongNetwork />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default AppRoutes;