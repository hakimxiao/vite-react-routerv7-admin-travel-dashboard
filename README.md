# 📦 Sentry
- Menggunakan akun: `alhakim`
- Nama project: `javascript-react`

# 🧩 Appwrite
- Menggunakan akun: `ucokpakpahan`

# ▶️ Windows jalankan Ini Sebelum Dev
```bash
$env:NODE_OPTIONS="--import ./instrument.server.mjs"
````

# 🤖 Instalasi Gemini Package

```bash
npm i @google/generative-ai
```

# 💡 Contoh Prompt AI (yang Bisa Dikelola dengan Mudah)

```javascript
const prompt = `Buatkan rencana perjalanan selama ${numberOfDays} hari ke ${country} berdasarkan informasi pengguna berikut:
    Anggaran: '${budget}'
    Gaya Perjalanan: '${travelStyle}'
    Tipe Grup: '${groupType}'
    Kembalikan hasil berupa itinerary dan perkiraan harga terendah dalam format JSON bersih (tanpa markdown) dengan struktur berikut:
    {
        "name": "Judul deskriptif untuk perjalanan",
        "description": "Deskripsi singkat mengenai perjalanan dan hal-hal menariknya (maksimal 100 kata)",
        "estimatedPrice": "Perkiraan harga rata-rata terendah dalam mata uang yang dipakai negara tersebut misal $, Rp, dan lainnya",
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
          }
          ...
        ]
    }`;
```

# 📚 Penjelasan: Cara Membuat Prompt AI yang Efektif

Prompt adalah instruksi yang kamu berikan ke AI agar ia bisa **menghasilkan output sesuai harapanmu**.

Untuk mendapatkan hasil yang **akurat, terstruktur, dan mudah dikelola**, kamu bisa mengikuti prinsip-prinsip berikut:

## ✅ Struktur Prompt yang Baik:

1. **Tentukan Tujuan**

   > Contoh: `Buatkan rencana perjalanan selama 5 hari ke Jepang.`

2. **Berikan Konteks**

   > Contoh: `Anggaran: rendah, Gaya Perjalanan: petualangan, Grup: keluarga.`

3. **Tentukan Format Output**

   > Contoh: `Kembalikan hasil dalam format JSON bersih tanpa markdown.`

4. **Jelaskan Struktur Data**

   > Contoh: `{"name": "...", "itinerary": [...]}`

5. **Tambahkan Batasan atau Gaya**

   > Contoh: `Deskripsi maksimal 100 kata. Gunakan emoji pada aktivitas.`

---

## 🧠 Kenapa AI Bisa Memahami Prompt Ini?

Model seperti ChatGPT atau Gemini **tidak memahami seperti manusia**, tapi mereka bisa:

1. Memecah prompt menjadi token
2. Mencari pola berdasarkan pelatihan sebelumnya
3. Memprediksi token demi token untuk membentuk jawaban yang paling sesuai
4. Mengikuti struktur jika kamu memberikannya secara eksplisit

### 📌 Kenapa JSON Bekerja Baik?

Karena JSON adalah:

* **Standar universal**
* Mudah dikenali
* Konsisten dan banyak dipakai dalam data training

---

## 🧪 Tips Menyusun Prompt yang Bagus

| Tips                  | Penjelasan                                                         |
| --------------------- | ------------------------------------------------------------------ |
| 🎯 Spesifik           | Semakin jelas dan rinci, semakin tepat hasilnya                    |
| 🧩 Strukturkan Output | Gunakan format JSON, tabel, atau markdown bila perlu               |
| 📌 Hindari Ambiguitas | Jangan hanya bilang "buatkan itinerary", tapi beri konteks lengkap |
| 🧠 Simulasikan Role   | Contoh: `"Kamu adalah travel planner..."`                          |
| 🔁 Uji dan Iterasi    | Prompt yang bagus sering lahir dari trial & error                  |


