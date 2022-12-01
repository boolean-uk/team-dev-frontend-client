import Header from '../Header/Header'
import NavigationRail from '../NavigationRail/NavigationRail'
import { useSearchParams } from 'react-router-dom'
import client from '../../utils/client'
import './styles/SearchResults.css'
import { useEffect, useState } from 'react'

function SearchResults({ loggedInUser }) {
  const [searchQuery, setSearchQuery] = useState('')
  const setSearchParams = useSearchParams()[1]
  const [people, setPeople] = useState(null)
  const [cohorts, setCohorts] = useState(null)
  const [peopleDisplay, setPeopleDisplay] = useState([])
  const [cohortsDisplay, setCohortsDisplay] = useState([])

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

    // Filtering people
    const filteredPeopleByFirstName = people.filter((person) => {
      return person.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    })
    const filteredPeopleByLastName = people.filter((person) => {
      return person.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    })

    // Checking that there are no duplicate entries
    const filteredPeople = [
      ...filteredPeopleByFirstName,
      ...filteredPeopleByLastName
    ]
    const filteredPeopleUnique = [...new Set(filteredPeople)]
    setPeopleDisplay(filteredPeopleUnique)

    // Filtering cohorts
    const filteredCohortsByName = cohorts.filter((cohort) => {
      return cohort.cohortName.toLowerCase().includes(searchQuery.toLowerCase())
    })
    setCohortsDisplay(filteredCohortsByName)
  }

  function renderCohort() {
    if (loggedInUser.role === 'STUDENT') {
      return <></>
    } else if (loggedInUser.role === 'TEACHER') {
      return (
        <>
          <h3>Cohorts:</h3>
          <hr className="results--divider" />
          {cohortsDisplay.length > 0
            ? cohortsDisplay.map((cohort) => {
                // TODO: Add component SearchResult here, which we will pass the above
                // data into to create each li
                return <p key={cohort.id}>{cohort.cohortName}</p>
              })
            : 'no cohorts to display'}
        </>
      )
    }
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
        {peopleDisplay.length > 0
          ? peopleDisplay.map((person) => {
              // TODO: Add component SearchResult here, which we will pass the above
              // data into to create each li
              return <p key={person.id}>{person.firstName}</p>
            })
          : 'no people to display'}
      </div>
      <div className="results--container">{renderCohort()}</div>
    </>
  )
}

export default SearchResults
