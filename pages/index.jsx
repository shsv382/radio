import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/index.module.css';
import StationCard from '../components/station-card/station-card.component';
import { countries, genres, getStations } from '../lib/stations';
import { useState, useEffect } from 'react/cjs/react.development';

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
  
  useEffect(() => {
    setLoading(true)
    getStations()
      .then((data) => {
        setRadioStations(data)
        setLoading(false)
      })
  }, [])
  
  
  return (
    <Layout home>
      <Head>
        <title>Choose your station</title>
      </Head>
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
            {genres.map((genre) => <StationCard name={genre} key={genre} />)}
          </ul>
          <div className={`${utilStyles.stationsCountriesBlock}`}>
            <ul className={`${utilStyles.stationsList} ${utilStyles.countriesList}`}>
              {countries.map((country) => <StationCard name={country} key={country} />)}
            </ul>
            <ul className={`${utilStyles.stationsList}`}>
              {radioStations.map((station) => <StationCard {...station}  key={station.id} />)}
            </ul>
          </div>
        </section>
      }
    </Layout>
  );
}