
export const genres = [
    "Blues", "Classical", "Country", "Dance", "Drill", "Jungle",
    "Funk", "Folk", "Hip-Hop", "Grunge", "House", "Indie",
    "Jazz", "Pop"
];

export const countries = ["Austria", "Belgium", "Canada", "Denmark", "Finland", "France", "Germany", "Ireland", "Italy", "Japan", "South Korea", "Luxembourg", "Netherlands", "Norway", "Russia", "Sweden", "Switzerland", "United Kingdom", "United States"];

const random = n => Math.floor(Math.random() * n)
const samples = [
    "001 Gawers-Roy - Forever (Clayderman).mp3",
    "002 Mozart - Eine kleine nachtmusik (Los Rios).mp3",
    "003 Vivaldi - Addia mare (Last).mp3",
    "004 Mozart - Allegro from 40th symphony (Mauriat).mp3",
    "005 Tchaikovski - Andante (Papetti).mp3"
]

export const getStations = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await response.json();
    return data.map(station => ({
        id: station.id,
        name: `${station.title.slice(0, random(15))}${station.id}`,
        src: samples[random(samples.length)],
        country: countries[random(countries.length)],
        genre: genres[random(genres.length)],
        labelUrl: station.url,
        thumbnailUrl: station.thumbnailUrl
    }))
}

// [
//   {
//     id: 1,
//     name: "Russkoe",
//     country: "Russia",
//     genre: "Pop",
//     labelUrl: "https://via.placeholder.com/600/92c952",
//     thumbnailUrl: "https://via.placeholder.com/150/92c952"
//   }
// ]
