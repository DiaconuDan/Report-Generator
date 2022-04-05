import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 45px;
  height: 45px;
  background: #f6ca65;
  border-radius: 5px;
  font-size: 23px;
  color: #ffffff;
`;

interface BackDropProps {
  firstName: string;
  lastName: string;
}

const UserChip = (props: BackDropProps) => {
  const { firstName, lastName } = props;

  const avatarText = (firstName[0] + lastName[0]).toUpperCase();

  return <Box>{avatarText}</Box>;
};

export default UserChip;
