interface Payment {
  paymentId: string;
  amount: string;
  created: string;
  modified: string;
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

export const mapReportsToProjects = (
  reports: any,
  projects: any,
  gateways: any
) => {
  return reports.reduce((acc: any, currentPayment: any) => {
    const {
      amount,
      created,
      modified,
      paymentId,
      projectId,
      gatewayId,
    } = currentPayment;
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
