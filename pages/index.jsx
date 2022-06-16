import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/index.module.css';
import StationCard from '../components/station-card/station-card.component';
import { countries, genres, getStations } from '../lib/stations';
import { useState, useEffect } from 'react/cjs/react.development';
import SearchField from '../components/search-field/search-field.component';

// export async function getStaticProps() {  
//   return {
//     props: {
//       radioStations,
//     },
//   };
// }

export default function Home() {
  const [radioStations, setRadioStations] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    country: undefined,
    genre: undefined,
    name: ''
  })

  const filterByCountry = (country) => (event) => {
    setFilter({
      ...filter,
      country: filter.country === country ? undefined : country
    })
  }
  
  const filterByGenre = (genre) => (event) => {
    setFilter({
      ...filter,
      genre: filter.genre === genre ? undefined : genre
    })
  }

  const setSearchField = (event) => {
    setFilter({
      ...filter,
      name: event.target.value
    })
  }

  useEffect(() => {
    setLoading(true)
    fetch("api/stations")
      .then(res => res.json())
    // getStations()
      .then((data) => {
        setRadioStations(data.stations)
        setLoading(false)
      })
  }, [])
  
  return (
      <>
      <Head>
        <title>Choose your station</title>
      </Head>
      <header className={utilStyles.header}>
            <SearchField onChange={setSearchField} />
      </header>
      {
        isLoading ? 
        <h1>Loading...</h1> : 
        <section className={`${utilStyles.stations}`}>
          <ul className={`${utilStyles.stationsList} ${utilStyles.myBest}`}>
            <StationCard name="My Best" key="My-Best" style={{
              position: "fixed",
              zIndex: 9999,
              background: "#e63",
              color: "white"
            }} />
          </ul>
          <ul className={`${utilStyles.stationsList} ${utilStyles.genresList}`}>
            {genres.map((genre) => <StationCard onClick={filterByGenre(genre)} name={genre} key={genre} />)}
          </ul>
          <div className={`${utilStyles.stationsCountriesBlock}`}>
            <ul className={`${utilStyles.stationsList} ${utilStyles.countriesList}`}>
              {countries.map((country) => <StationCard onClick={filterByCountry(country)} name={country} key={country} />)}
            </ul>
            <ul className={`${utilStyles.stationsList}`}>
              {radioStations.filter(station => {
                if (filter.country && filter.genre) {
                  return ((station.country === filter.country) &&
                          (station.genre === filter.genre) &&
                          station.name.includes(filter.name))
                } else if (filter.country && !filter.genre) {
                  return ((station.country === filter.country) &&
                  station.name.includes(filter.name))
                } else if (!filter.country && filter.genre) {
                  return ((station.genre === filter.genre) &&
                  station.name.includes(filter.name))
                } else {
                  return station.name.includes(filter.name)
                }
              }).map((station) => <StationCard {...station}  key={station.id} />)}
            </ul>
          </div>
        </section>
      }
    </>
  );
}