import { access } from "fs";

interface Payment {
  paymentId: string;
  amount: string;
  created: string;
  modified: string;
}

interface PaymentWithGateway extends Payment {
  gatewayName: string;
}

interface Gateway {
  gatewayId: string;
  name: string;
  type: string;
  payments: Payment[];
}

interface Project {
  projectId: string;
  name: string;
  gateways: Gateway[];
}

enum TableDataDelegator {
  ShouldRenderAllProjects = "ShouldRenderAllProjects",
  ShouldRenderAllProjectsByGateway = "ShouldRenderAllProjectsByGateway",
  ShouldRenderGateWayByProject = "ShouldRenderGateWayByProject",
  ShouldRenderAllGatewaysByProject = "ShouldRenderAllGatewaysByProject",
  ShouldNotRender = "ShouldNotRender",
}

export const mapReportsToProjects = (
  reports: any,
  projects: any,
  gateways: any
) => {
  return reports.reduce((acc: any, currentPayment: any) => {
    const { amount, created, modified, paymentId, projectId, gatewayId } =
      currentPayment;
    const currentProjectIndex = acc?.findIndex(
      (element: Project) => element.projectId === projectId
    );
    const isProjectAlreadyCreated = currentProjectIndex > -1;
    const gatewayIndex =
      isProjectAlreadyCreated &&
      acc[currentProjectIndex].gateways?.findIndex(
        (element: any) => element.gatewayId === gatewayId
      );
    const hasExistingGateway = gatewayIndex > -1;

    const flattenedPayment: Payment = {
      amount,
      created,
      modified,
      paymentId,
    };

    if (isProjectAlreadyCreated) {
      const currentProject = acc[currentProjectIndex];

      if (hasExistingGateway) {
        const currentGateway = currentProject.gateways[gatewayIndex];
        currentGateway.payments.push(flattenedPayment);
      } else {
        const gateWay = gateways.find(
          (element: any) => element.gatewayId === gatewayId
        );
        const { name, type } = gateWay;
        const flattenedGateway: Gateway = {
          name,
          type,
          payments: [flattenedPayment],
          gatewayId,
        };

        currentProject.gateways.push(flattenedGateway);
      }
    } else {
      const { name: projectName } = projects.find(
        (el: any) => el.projectId === projectId
      );
      const { name: gatewayName, type: gatewayType } = gateways.find(
        (element: any) => element.gatewayId === gatewayId
      );

      const flattenedGateway: Gateway = {
        name: gatewayName,
        type: gatewayType,
        payments: [flattenedPayment],
        gatewayId,
      };

      const flattenedProject: Project = {
        projectId,
        name: projectName,
        gateways: [flattenedGateway],
      };

      acc.push(flattenedProject);
    }

    return acc;
  }, []);
};

export const getTableInstructions = (
  projectSelection: string,
  gatewaySelection: string
) => {
  console.log(projectSelection);
  console.log(gatewaySelection);
  const allProjects = projectSelection === "All projects";
  const singleProject = !allProjects && projectSelection !== "Select a project";
  const allGateways = gatewaySelection === "All gateways";
  const singleGateway = !allGateways && gatewaySelection !== "Select a gateway";

  if (allProjects && allGateways) {
    return TableDataDelegator.ShouldRenderAllProjects;
  }

  if (allProjects && singleGateway) {
    return TableDataDelegator.ShouldRenderAllProjectsByGateway;
  }

  if (singleProject && singleGateway) {
    return TableDataDelegator.ShouldRenderGateWayByProject;
  }

  if (singleProject && allGateways) {
    return TableDataDelegator.ShouldRenderAllGatewaysByProject;
  }

  return TableDataDelegator.ShouldNotRender;
};

type PaymentHeader = ["Date", "Transaction", "Amount"];

type PaymentWithGatewayHeader = ["Date", "Gateway", "Transaction", "Amount"];

interface ReportsTable {
  paymentsTableColumns: PaymentHeader | PaymentWithGatewayHeader;
  totalAmount: number;
  rows: [
    {
      extendableHeader: {
        name: string;
        amount: number;
      };
      paymentsTableRows: (Payment | PaymentWithGateway)[];
    }
  ];
}

const getAllProjectsTableProps = (projects: any) => {
  const myRows: any[] = [];

  let tableProps = {
    paymentsTableColumns: ["Date", "Gateway", "Transaction", "Amount"],
    rows: myRows,
    totalAmount: 0,
  };

  let totalTableAmount = 0;

  projects.forEach((project: any) => {
    const { name: projectName, gateways } = project;

    let totalProjectAmount = 0;
    let paymentsRows: any[] = [];

    gateways.forEach((gateway: any) => {
      const { name: gatewayName } = gateway;

      gateway.payments.forEach((payment: any) => {
        totalTableAmount += payment.amount;
        totalProjectAmount += payment.amount;

        const paymentWithGateway = { ...payment, gateway: gatewayName };

        paymentsRows.push(paymentWithGateway);
      });
    });

    const extandableHeader = {
      name: projectName,
      amount: totalProjectAmount,
    };

    const row = {
      extandableHeader: extandableHeader,
      paymentsTableRows: paymentsRows,
    };

    tableProps = {
      ...tableProps,
      rows: [...tableProps.rows, row],
    };
  });

  tableProps = {
    ...tableProps,
    totalAmount: totalTableAmount,
  };

  return tableProps;
};

export const getTableProps = (operation: TableDataDelegator, projects: any) => {
  switch (operation) {
    case TableDataDelegator.ShouldRenderAllProjects:
      return getAllProjectsTableProps(projects);
    default:
      return getAllProjectsTableProps(projects);
  }
};
