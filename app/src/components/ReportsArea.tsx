import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { mapReportsToProjects } from '../utils/utils'


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

const PROJECTS_URL = "http://178.63.13.157:8090/mock-api/api/projects";
const GATEWAYS_URL = "http://178.63.13.157:8090/mock-api/api/gateways";
const REPORTS_URL = "http://178.63.13.157:8090/mock-api/api/report";




const ReportsArea = () => {
    const [isLoading, setIsLoading ] = useState(true);
    const [projects, setProjects] = useState([]);

  React.useEffect(() => {
    const fetchGateways = async () => axios.get(GATEWAYS_URL);
    const fetchProjects = async () => axios.get(PROJECTS_URL);
    const postReports = async () =>
      axios({
        method: "post",
        url: REPORTS_URL,
        data: {},
      });

    (async () => {
      const getAways = await fetchGateways();
      const getProjects = await fetchProjects();
      const getReports = await postReports();

      const projects = mapReportsToProjects(getReports.data.data, getProjects.data.data, getAways.data.data);

      setProjects(projects);
    })();
  }, []);


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
