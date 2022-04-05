import React, { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import NavBar from "./components/Navbar";
import ReportsArea from "./components/ReportsArea";

const ContentWrapper= styled.div`
  display: flex;
  padding-top: 20px;
  padding-left: 35px;
  gap: 25px;
`;


function App() {
  return (
    <div>
      <Header />

      <ContentWrapper>
        <NavBar /> 
        <ReportsArea />  
        {/* in theory here we should have page routes instead of directly showing reports */}
      </ContentWrapper>
    </div>
  );
}

export default App;




