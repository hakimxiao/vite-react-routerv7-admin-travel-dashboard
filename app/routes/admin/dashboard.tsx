import { Header } from "components";

const Dashboard = () => {
  const user = { name: "Hakim" };

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} 👋 `}
        description="Lacak aktivitas, trend dan tempat populer secara real time"
      />
      Dashboard Page Content
    </main>
  );
};

export default Dashboard;
