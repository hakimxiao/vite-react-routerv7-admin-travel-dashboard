import type {LoaderFunctionArgs} from "react-router";
import type {Route} from "./+types/trip-detail";
import {getTripById} from "~/appwrite/trips";
import {parseTripData} from "~/lib/utils";
import {Header, InfoPill} from "../../../components";


// * clientLoader : Dengan menangkap dynamic param dari route
export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;

    if(!tripId) throw new Error("TripId is required");

    // * kita jalankan fungsi ini di clientLoader sebelum UI di render untuk menampilkan data dari DB
    return await getTripById(tripId);
}



const TripDetail = ({ loaderData }: Route.ComponentProps) => {
    const tripData = parseTripData(loaderData?.tripDetails);

    const {
        name,
        duration,
        itinerary,
        travelStyle,
        groupType,
        budget,
        interests,
        estimatedPrice,
        description,
        bestTimeToVisit,
        weatherInfo,
        country
    } = tripData || {};

    return (
        <main className="travel-detail wrapper ">
            <Header title="Trip Details" description="View and edit AI-Generated travel plans" />

            <section className="container wrapper-md">
                <header>
                    <h1 className="p-40-semibold text-dark-100">{name}</h1>
                </header>

                <InfoPill
                    text={`${duration} day plan`}
                    image="/assets/icons/calendar.svg"
                />
                <InfoPill
                    text={itinerary?.slice(0, 2).map((item) => item.location).join(", ") || ""}
                    image="/assets/icons/location-mark.svg"
                />
            </section>
        </main>
    )
}
export default TripDetail
