import React from 'react'
import {Header} from "../../../components";
import {ComboBoxComponent} from "@syncfusion/ej2-react-dropdowns";
import type {Route} from "./+types/create-trip"

export const loader = async() => {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,latlng,maps");

    const data = await response.json();

    return data.map((country: any) => ({
        text: country.name.common, // untuk tampil
        value: country.name.common, // untuk value ComboBox
        flagPng: country.flags.png,
        flagAlt: country.flags.alt,
        coordinates: country.latlng,
        openStreetMap: country.maps?.openStreetMap
    }));
}

const CreateTrip = ({loaderData}: Route.ComponentProps) => {
    const countries = loaderData as Country[];
    const countryData = countries.map((country) => (
        {
            text: country.text,
            value: country.value,
            flagPng: country.flagPng,
        }
    ))

    const handleSubmit = async() => {}
    const handleChange = async(key: keyof TripFormData, value: string | number) => {}

    return (
        <main className="flex flex-col gap-10 pb-20 wrapper">
            <Header title="Buat perjalanan baru" description="Melihat dan mengedit rencana perjalanan yang dihasilkan AI" />

            <section className="mt-2.5 wrapper-md">
                <form className="trip-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="country">
                            Country
                        </label>
                        <ComboBoxComponent
                            id="country"
                            dataSource={countryData}
                            fields={{ text: "text", value: "value" }}
                            placeholder="Select a country"
                            className="combo-box"
                            change={(e: { value: string | undefined}) => {
                                if(e.value) {
                                    handleChange("country", e.value)
                                }}}
                            itemTemplate={(data: any) =>(
                                <div className="flex items-center ml-2 gap-1">
                                    <img
                                        src={data.flagPng}
                                        alt={data.flagAlt}
                                        className="w-6 h-4 object-cover rounded-sm"
                                    />
                                    <span>{data.text}</span>
                                </div>
                            )}

                        />
                    </div>

                    <div>
                        <label htmlFor="duration">Duration</label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            placeholder="Enter a number of days (5, 12, ....)"
                            className="form-input placeholder:text-gray-100"
                            onChange={(e) => handleChange('duration', Number(e.target.value))}
                        />
                    </div>
                </form>
            </section>
        </main>
    )
}
export default CreateTrip
