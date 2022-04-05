import React from "react";

import styled from "styled-components";
import UserDetails from "../components/UserDetails";
import Blogo from "../assets/Blogo.svg";
import Lines from "../assets/lines.svg";
import Delimiter from "../assets/delimiter.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  padding-left: 35px;
  padding-top: 22px;
  padding-right: 125px;
`;


interface BackDropProps {
  firstName: string;
  lastName: string;
}

const Header = (props: BackDropProps) => {
  const { firstName, lastName } = props;

  return (
    <>
      <Container>
        <img src={Blogo} />
        <img src={Lines} />
        <UserDetails firstName={firstName} lastName={lastName} />
      </Container>
      <img src={Delimiter} width="100%" />
    </>
  );
};

export default Header;
