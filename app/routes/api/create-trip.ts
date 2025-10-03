// CARA BUAT API PADA REACT-ROUTER-V7

import {type ActionFunctionArgs, data} from "react-router";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {parseMarkdownToJson} from "~/lib/utils";
import {appwriteConfig, database} from "~/appwrite/client";
import {ID} from "appwrite";

export const action = async({ request }: ActionFunctionArgs ) => {
    const {
        country,
        numberOfDays,
        travelStyle,
        interests,
        budget,
        groupType,
        userId
    } = await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY;

    try {
        const prompt = `Buatkan rencana perjalanan selama ${numberOfDays} hari ke ${country} berdasarkan informasi pengguna berikut:
            Anggaran: '${budget}'
            Gaya Perjalanan: '${travelStyle}'
            Tipe Grup: '${groupType}'
            Kembalikan hasil berupa itinerary dan perkiraan harga terendah dalam format JSON bersih (tanpa markdown) dengan struktur berikut:
            {
                "name": "Judul deskriptif untuk perjalanan",
                "description": "Deskripsi singkat mengenai perjalanan dan hal-hal menariknya (maksimal 100 kata)",
                "estimatedPrice": "Perkiraan harga rata-rata terendah dalam USD, misalnya $price",
                "duration": ${numberOfDays},
                "budget": "${budget}",
                "travelStyle": "${travelStyle}",
                "country": "${country}",
                "interests": ${interests},
                "groupType": "${groupType}",
                "bestTimeToVisit": [
                  '🌸 Musim (dari bulan ke bulan): alasan mengapa waktu ini cocok dikunjungi',
                  '☀️ Musim (dari bulan ke bulan): alasan mengapa waktu ini cocok dikunjungi',
                  '🍁 Musim (dari bulan ke bulan): alasan mengapa waktu ini cocok dikunjungi',
                  '❄️ Musim (dari bulan ke bulan): alasan mengapa waktu ini cocok dikunjungi'
                ],
                "weatherInfo": [
                  '☀️ Musim: rentang suhu dalam Celcius (rentang suhu dalam Fahrenheit)',
                  '🌦️ Musim: rentang suhu dalam Celcius (rentang suhu dalam Fahrenheit)',
                  '🌧️ Musim: rentang suhu dalam Celcius (rentang suhu dalam Fahrenheit)',
                  '❄️ Musim: rentang suhu dalam Celcius (rentang suhu dalam Fahrenheit)'
                ],
                "location": {
                  "city": "nama kota atau wilayah",
                  "coordinates": [latitude, longitude],
                  "openStreetMap": "tautan ke open street map"
                },
                "itinerary": [
                {
                  "day": 1,
                  "location": "Nama Kota/Wilayah",
                  "activities": [
                    {"time": "Pagi", "description": "🏰 Kunjungi kastil bersejarah setempat dan nikmati jalan santai"},
                    {"time": "Siang", "description": "🖼️ Jelajahi museum seni terkenal dengan tur berpemandu"},
                    {"time": "Malam", "description": "🍷 Makan malam di restoran rooftop sambil menikmati anggur lokal"}
                  ]
            },
            ...
            ]
        }`;

        const textResult = await genAI
            .getGenerativeModel({ model: "gemini-2.0-flash"})
            .generateContent([prompt])

        const trip = parseMarkdownToJson(textResult.response.text());

        const imageResponse = await fetch(
            `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unsplashApiKey}`
        );

        const imageUrls = (await imageResponse.json()).results.slice(0, 3)
            .map((result: any) => result.urls?.regular || null);

        const result = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId,
            ID.unique(),
            {
                tripDetails: JSON.stringify(trip),
                createdAt: new Date().toISOString(),
                imageUrls,
                userId
            }
        )

        return data({ id: result.$id });
    } catch (e) {
        console.error("Error generating travel plan: ", e)
    }
}