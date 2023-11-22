import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Overview from "../features/dashboard/Overview";
import DashboardBox from "../features/dashboard/DashboardBlock";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">{/* optional header  */}</Row>
      <Row>
        <DashboardBox />
      </Row>
    </>
  );
}

export default Dashboard;
