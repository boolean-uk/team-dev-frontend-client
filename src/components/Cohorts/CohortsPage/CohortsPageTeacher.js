import Header from '../../Header/Header'
import CohortsList from '../../cohortsList/CohortsList'
import './style.css'

function CohortsPageTeachers({ loggedInUser }) {
  return (
    <>
      {/*Header may change*/}
      <Header />

      {/*may not use nav bar*/}
      <main>
        <nav>
          <ul>
            <li>
              <span className="material-symbols-outlined">Home</span>Home
            </li>
            <li>
              <span className="material-symbols-outlined">Account_Circle</span>
              Profile
            </li>
            <li>
              <span className="material-symbols-outlined">School</span>Cohorts
            </li>
            <li>
              <span className="material-symbols-outlined">Task</span>Exercises
            </li>

            <hr></hr>
            <li>
              <span className="material-symbols-outlined">Notes</span>Notes
            </li>
            <li>
              <span className="material-symbols-outlined">Analytics</span>Logs
            </li>
          </ul>
        </nav>

        <section className="content">
          <h2>
            <span className="title1">Cohorts</span>
            <span className="title2"> Students</span>
          </h2>

          <CohortsList
            className="cohortlist"
            renderHeader={true}
            renderAddButton={true}
          />

          <div className="studentlist"></div>
        </section>
      </main>
    </>
  )
}

export default CohortsPageTeachers
