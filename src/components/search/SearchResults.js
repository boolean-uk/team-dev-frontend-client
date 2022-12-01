import Header from '../Header/Header'
import NavigationRail from '../NavigationRail/NavigationRail'
import { useLocation, useSearchParams } from 'react-router-dom'

import './styles/SearchResults.css'
import { useEffect, useState } from 'react'

function SearchResults({ loggedInUser }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const location = useLocation()

  useEffect(() => {
    setSearchParams({ query: location.state })
  }, [])

  return (
    <>
      <Header loggedInUser={loggedInUser} />

      <NavigationRail user={loggedInUser} />
      <h1> Search results</h1>
      <form>
        <input placeholder="Search here..." type="text" />
        {/* TODO: Possibly use a search icon here */}
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="results--container">
        <h3>People:</h3>
        <hr className="results--divider" />
        {/* TODO: Call SearchResult component here using map to determine how many 
        users to display*/}
      </div>
      <div className="results--container">
        <h3>Cohorts:</h3>
        <hr className="results--divider" />
        {/* TODO: Call SearchResult component here using map to determine how many 
        cohorts to display */}
      </div>
    </>
  )
}

export default SearchResults
