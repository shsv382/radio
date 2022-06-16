import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/index.module.css';
import StationCard from '../components/station-card/station-card.component';
import { countries, genres, getStations } from '../lib/stations';
import { useState, useEffect } from 'react';
import SearchField from '../components/search-field/search-field.component';
import Controls from '../components/controls/controls.component';

export default function Home() {
  const [radioStations, setRadioStations] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    country: undefined,
    genre: undefined,
    name: '',
    myBest: false
  })
  const [playing, setPlaying] = useState(undefined);
  const [myBest, setBest] = useState([]);
  const [headerState, setHeaderState] = useState({
    searchField: false,
    controls: false
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

  const playStation = (station) => (event) => {
    setPlaying(station);
    setBest(Array.from(new Set([...myBest].concat(station))));
    setTimeout(() => {document.getElementById("playingNow").play()}, 0);
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
        <link href='https://css.gg/menu.css' rel='stylesheet' />
        <link href='https://css.gg/search.css' rel='stylesheet' />
      </Head>
      <header className={utilStyles.header}>
        <i className="gg-menu" onClick={()=>{setHeaderState(
          {
            searchField: false,
            controls: !headerState.controls
          }
        )}}></i>
          { headerState.controls && <Controls /> }
          { headerState.searchField && <SearchField onSearchFieldChange={setSearchField} /> }
        <i className="gg-search" onClick={()=>{setHeaderState(
          {
            searchField: !headerState.searchField,
            controls: false
          }
        )}}></i>
      </header>
      {
        isLoading ? 
        <h1>Loading...</h1> : 
        <section className={`${utilStyles.stations}`}>
          <p className={`${utilStyles.playingNow}`}>
            { playing && `Сейчас играет ${playing.name}` }
            <audio id="playingNow" src={playing ? playing.src : ""} preload="auto"></audio>
          </p>
          <br></br>
          <ul className={`${utilStyles.stationsList} ${utilStyles.myBest}`}>
            <StationCard name="My Best" key="My-Best" style={{
              position: "fixed",
              zIndex: 9999,
              background: "#e63",
              color: "white"
            }}
            onClick={()=>setFilter({...filter, myBest: !filter.myBest})}
          />
          </ul>
          <ul className={`${utilStyles.stationsList} ${utilStyles.genresList}`}>
            {genres.map((genre) => (<StationCard 
                                    onClick={filterByGenre(genre)} 
                                    name={genre} 
                                    isFiltered={genre === filter.genre}
                                    key={genre} />))}
          </ul>
          <div className={`${utilStyles.stationsCountriesBlock}`}>
            <ul className={`${utilStyles.stationsList} ${utilStyles.countriesList}`}>
              {countries.map((country) => (<StationCard 
                                            onClick={filterByCountry(country)} 
                                            name={country}
                                            isFiltered={country === filter.country} 
                                            key={country} />))}
            </ul>
            <ul className={`${utilStyles.stationsList}`}>
              {
                filter.myBest ? 
                  myBest.map((station) => <StationCard {...station} onClick={playStation(station)} key={"best" + station.id} />) :
                  radioStations.filter(station => {
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
                      return station.name.toLowerCase().includes(filter.name.toLowerCase())
                    }
                  }).map((station) => <StationCard {...station} onClick={playStation(station)} key={"station" + station.id} />)
            }
            </ul>
          </div>
        </section>
      }
    </>
  );
}