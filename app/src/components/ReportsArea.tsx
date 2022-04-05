import React from "react";
import styled from "styled-components";
import DownArrow from "../assets/downArrow.svg";

const Container = styled.div`
  width: 100%;
  padding-right: 125px;
`;

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
  flex-direction: row;
`;

const SelectsContainer = styled.div`
  display: flex;
  margin-left: auto;
  gap: 20px;
`;

const StyledSelect = styled.select`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  background: #1bc5bd;
  border-radius: 5px;
  padding: 10px;
`;

const StyledButton = styled.button`
  background: #005b96;
  border-radius: 5px;
  color: #ffffff;
  
`;

const ReportsArea = () => {
  return (
    <Container>
      <PageInformation>
        <Title>Reports</Title>

        <SelectsContainer>
          <StyledSelect>
            <option value="volvo" selected>
              Select a project
            </option>
            <option value="saab">Saab</option>
          </StyledSelect>
          <StyledSelect>
            <option value="volvo">Select Gateway</option>
            <option value="saab">Saab</option>
          </StyledSelect>
          <StyledSelect>
            <option value="volvo">From date</option>
            <option value="saab">Saab</option>
          </StyledSelect>
          <StyledSelect>
            <option value="volvo">To date</option>
            <option value="saab">Saab</option>
          </StyledSelect>
          <StyledButton> Generate report</StyledButton>
        </SelectsContainer>
      </PageInformation>
      <Subtitle>Easily generate a report for your transactions</Subtitle>
    </Container>
  );
};

export default ReportsArea;
