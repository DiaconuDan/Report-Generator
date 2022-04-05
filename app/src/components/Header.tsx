import React from "react";

import styled from "styled-components";
import Blogo from "../assets/Blogo.svg";
import Lines from "../assets/lines.svg";
import Delimiter from "../assets/delimiter.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  padding-left: 35px;
  padding-top: 25px;
`;

const Header = () => {
  return (
    <>
      <Container>
        <img src={Blogo} />
        <img src={Lines} />
      </Container>
      <img src={Delimiter} />
    </>
  );
};

export default Header;
