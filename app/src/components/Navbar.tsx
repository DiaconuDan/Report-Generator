import React from "react";
import styled from "styled-components";
import Charts from "../assets/charts.svg";
import Boxes from "../assets/boxes.svg";
import Card from "../assets/card.svg";
import Reports from "../assets/reports.svg";
import StartButton from "../assets/startbutton.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 20px;
`;

const StyledImg = styled.img`
    height: 25px;
    width: 25px;
`

const Navbar = () => {
  return (
      <Container>
        <StyledImg src={Charts}  />
        <StyledImg src={Boxes} />
        <StyledImg src={Card} />
        <StyledImg src={Reports} />
        <StyledImg src={StartButton} />
      </Container>
  );
};

export default Navbar;
