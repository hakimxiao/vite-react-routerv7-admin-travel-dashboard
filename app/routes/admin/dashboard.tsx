import {Header, StateCard, TripCard} from "components";

const Dashboard = () => {
  const user = { name: "Hakim" };
  const dashboardStats = {
      totalUsers: 12450,
      usersJoined: {
          currentMonth: 218,
          lastMonth: 170
      },
      totalTrips: 3210,
      tripsCreated: { currentMonth: 150, lastMonth: 250 },
      userRole: { total: 62, currentMonth: 25, lastMonth: 15 }
  }

  const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} 👋 `}
        description="Lacak aktivitas, trend dan tempat populer secara real time"
      />

        <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

                <StateCard
                    headerTitle="Total Users"
                    total={totalUsers}
                    currentMonthCount={usersJoined.currentMonth}
                    lastMonthCount={usersJoined.lastMonth}
                />
                <StateCard
                    headerTitle="Total Trips"
                    total={totalTrips}
                    currentMonthCount={tripsCreated.currentMonth}
                    lastMonthCount={tripsCreated.lastMonth}
                />
                <StateCard
                    headerTitle="Active Users"
                    total={userRole.total}
                    currentMonthCount={userRole.currentMonth}
                    lastMonthCount={userRole.lastMonth}
                />
            </div>
        </section>
        <TripCard />
    </main>
  );
};

export default Dashboard;
