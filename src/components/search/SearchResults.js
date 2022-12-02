import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Header from '../Header/Header'
import NavigationRail from '../NavigationRail/NavigationRail'
import client from '../../utils/client'
import SearchResultPerson from './SearchResultPerson'
import SearchResultCohort from './SearchResultCohort'

import './styles/SearchResults.css'

function SearchResults({ loggedInUser }) {
  const [searchTerms, setSearchTerms] = useState('')
  const [searchBarText, setSearchBarText] = useState('')
  const [people, setPeople] = useState(null)
  const [cohorts, setCohorts] = useState(null)
  const [peopleDisplay, setPeopleDisplay] = useState([])
  const [cohortsDisplay, setCohortsDisplay] = useState([])
  const searchParams = useSearchParams()[0]

  useEffect(() => {
    const query = searchParams.get('query')
    if (query !== null) {
      setSearchTerms(query)
      setSearchBarText(query)
    } else {
      return
    }
  }, [searchParams])

  useEffect(() => {
    if (searchTerms) {
      client.get('/users').then((data) => {
        setPeople(data.data.data.users)
      })
      client.get('/cohorts').then((data) => {
        setCohorts(data.data.data)
      })
    }
  }, [searchTerms])

  useEffect(() => {
    if (people) {
      const filteredPeopleByFirstName = people.filter((person) => {
        return person.firstName
          .toLowerCase()
          .includes(searchTerms.toLowerCase())
      })
      const filteredPeopleByLastName = people.filter((person) => {
        return person.lastName.toLowerCase().includes(searchTerms.toLowerCase())
      })

      // Checking that there are no duplicate entries
      const filteredPeople = [
        ...filteredPeopleByFirstName,
        ...filteredPeopleByLastName
      ]
      const filteredPeopleUnique = [...new Set(filteredPeople)]
      setPeopleDisplay(filteredPeopleUnique)
    }
  }, [people, searchTerms])

  useEffect(() => {
    if (cohorts) {
      const filteredCohortsByName = cohorts.filter((cohort) => {
        return cohort.cohortName
          .toLowerCase()
          .includes(searchTerms.toLowerCase())
      })
      setCohortsDisplay(filteredCohortsByName)
    }
  }, [cohorts, searchTerms])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerms(searchBarText)
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

                return (
                  <>
                    <SearchResultCohort
                      loggedInUser={loggedInUser}
                      cohort={cohort}
                      key={cohort.id}
                    />
                  </>
                )
              })
            : 'no cohorts to display'}
        </>
      )
    }
  }

  return (
    <>
      <Header loggedInUser={loggedInUser} searchBarVisible={false} />
      <NavigationRail user={loggedInUser} />
      <h1> Search results</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search here..."
          type="text"
          value={searchBarText}
          onChange={(e) => setSearchBarText(e.target.value)}
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
              return (
                <SearchResultPerson
                  loggedInUser={loggedInUser}
                  person={person}
                  key={person.id}
                />
              )
            })
          : 'no people to display'}
      </div>
      <div className="results--container">{renderCohort()}</div>
    </>
  )
}

export default SearchResults
