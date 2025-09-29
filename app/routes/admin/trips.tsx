import React from 'react'
import {Header} from "../../../components";

const Trips = () => {
    return (
        <main className="all-users wrapper">
            <Header
                title="Perjalanan"
                description="Lihat dan edit rencana perjalanan yang dihasilkan AI"
                ctaText="Membuat perjalanan"
                ctaUrl="/trips/create"
            />
        </main>
    )
}
export default Trips
