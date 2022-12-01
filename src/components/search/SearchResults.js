import Header from '../Header/Header'
import NavigationRail from '../NavigationRail/NavigationRail'
import { useLocation, useSearchParams } from 'react-router-dom'
import client from '../../utils/client'
import './styles/SearchResults.css'
import { useEffect, useState } from 'react'

function SearchResults({ loggedInUser }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [people, setPeople] = useState(null)
  const [cohorts, setCohorts] = useState(null)
  const [peopleDisplay, setPeopleDisplay] = useState(null)
  const location = useLocation()

  useEffect(() => {
    setSearchParams({ query: location.state })
  }, [])

  useEffect(() => {
    client.get('/users').then((data) => {
      setPeople(data.data.data.users)
    })
    client.get('/cohorts').then((data) => {
      setCohorts(data.data.data)
    })
  }, [searchQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchParams({ query: searchQuery })
    const filteredPeopleByFirstName = people.filter((person) => {
      return person.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    })
    const filteredPeopleByLastName = people.filter((person) => {
      return person.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    })
    const filteredPeople = [
      ...filteredPeopleByFirstName,
      ...filteredPeopleByLastName
    ]
    const filteredPeopleUnique = [...new Set(filteredPeople)]
    setPeopleDisplay(filteredPeopleUnique)
  }

  return (
    <>
      <Header loggedInUser={loggedInUser} />
      <NavigationRail user={loggedInUser} />
      <h1> Search results</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search here..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
        {peopleDisplay.length > 0
          ? peopleDisplay.map((person) => {
              return <p>{person.firstName}</p>
            })
          : 'no people to display'}
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
