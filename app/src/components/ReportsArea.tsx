import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { mapReportsToProjects, getTableInstructions, getTableProps } from "../utils/utils";
import DatePicker from "react-datepicker";
import Table from "./Table";

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

export const DatesWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 428px;
`;

export const DateSelectionContainer = styled.div`
  padding-bottom: 35px;
  .react-datepicker-wrapper {
    width: auto;
  }
`;

const PROJECTS_URL = "http://178.63.13.157:8090/mock-api/api/projects";
const GATEWAYS_URL = "http://178.63.13.157:8090/mock-api/api/gateways";
const REPORTS_URL = "http://178.63.13.157:8090/mock-api/api/report";

enum TableDataDelegator {
    ShouldRenderAllProjects = "ShouldRenderAllProjects",
    ShouldRenderAllProjectsByGateway = "ShouldRenderAllProjectsByGateway",
    ShouldRenderGateWayByProject ="ShouldRenderGateWayByProject",
    ShouldRenderAllGatewaysByProject = "ShouldRenderAllGatewaysByProject",
    ShouldNotRender = "ShouldNotRender",
  }
  

const ReportsArea = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [projectSelection, setProjectSelection] = useState("All projects");
  const [gatewaySelection, setGatewaySelection] = useState("All gateways");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [tableRenderInstruction, setTableRenderInstruction] = useState<TableDataDelegator>(TableDataDelegator.ShouldNotRender) ;

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

      const projects = mapReportsToProjects(
        getReports.data.data,
        getProjects.data.data,
        getAways.data.data
      );

      setProjects(projects);
    })();
  }, []);

  const onProjectChange = (e: any) => {
    setProjectSelection(e.target.value);
  };

  const onGatewayChange = (e: any) => {
    setGatewaySelection(e.target.value);
  };

  const onReportGenerate = () => {
    const tableInstructions: TableDataDelegator = getTableInstructions(
      projectSelection,
      gatewaySelection
    );

    alert(tableInstructions);
  };

  return (
    <Container>
      <PageInformation>
        <Title>Reports</Title>

        <SelectsContainer>
          <StyledSelect value={projectSelection} onChange={onProjectChange}>
            <option value="All projects">All projects</option>
            <option value="saab">Saab</option>
          </StyledSelect>
          <StyledSelect value={gatewaySelection} onChange={onGatewayChange}>
            <option value="All gateways">All Gateways</option>
            <option value="saab">Saab</option>
          </StyledSelect>
          <DateSelectionContainer>
            <DatesWrapper>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date"
                selected={startDate}
                onChange={(date: any) => setStartDate(date as Date)}
                selectsStart
                startDate={startDate}
              />
              <DatePicker
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date"
                selected={endDate}
                onChange={(date: any) => setEndDate(date as Date)}
                selectsStart
                startDate={endDate}
              />
            </DatesWrapper>
          </DateSelectionContainer>
          <button onClick={onReportGenerate}> Generate report </button>
          <Table props={getTableProps(tableRenderInstruction, projects)} />
        </SelectsContainer>
      </PageInformation>
      <Subtitle>Easily generate a report for your transactions</Subtitle>
    </Container>
  );
};

export default ReportsArea;
