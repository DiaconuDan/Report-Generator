import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.span`
  font-size: 24px;
  color: #011f4b;
  font-weight: 700;
`;

const Subtitle = styled.span`
  font-size: 16px;
  color: #7e8299;
  font-weight: 700;
`;

const PageInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReportsArea = () => {
  return (
    <Container>
      <PageInformation>
        <Title>Reports</Title>
        <Subtitle>Easily generate a report for your transactions</Subtitle>
      </PageInformation>
    </Container>
  );
};

export default ReportsArea;
