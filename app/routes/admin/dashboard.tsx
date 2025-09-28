import {Header, StateCard, TripCard} from "components";
import {user, dashboardStats, allTrips} from "~/constants"
import {getUser} from "~/appwrite/auth";
import type { Route } from "./+types/dashboard";

const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;

// ini seperti useEFfect : dia akan jijalankan sebelum komponen di render
export const clientLoader = async () => await getUser();

const Dashboard = ({ loaderData }: Route.ComponentProps ) => {

    const user = loaderData as User | null;

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
        <section className="container">
            <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

            <div className="trip-grid">
                {allTrips.slice(0, 4).map(({id, name, imageUrls, itinerary, tags, estimatedPrice}) => (
                    <TripCard
                        key={id}
                        id={id.toString()}
                        name={name}
                        imageUrl={imageUrls[0]}
                        location={itinerary?.[0]?.location ?? ""}
                        tags={tags}
                        price={estimatedPrice}
                    />
                ))}
            </div>
        </section>
        {/*<TripCard />*/}
    </main>
  );
};

export default Dashboard;
