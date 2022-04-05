import React from "react";
import styled from "styled-components";
import UserChip from "./UserChip";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Fullname = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #005b96;
`;

const Wrapper = styled.div`
  margin-left: auto;
`;

interface BackDropProps {
  firstName: string;
  lastName: string;
}

const UserDetails = (props: BackDropProps) => {
  const { firstName, lastName } = props;

  return (
    <Wrapper>
      <Container>
        <UserChip firstName={firstName} lastName={lastName} />
        <Fullname>
          {firstName} {lastName}
        </Fullname>
      </Container>
    </Wrapper>
  );
};

export default UserDetails;
