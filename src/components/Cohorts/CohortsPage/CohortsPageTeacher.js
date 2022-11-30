import Header from '../../Header/Header'
import CohortsList from '../../cohortsList/CohortsList'
import './teachers.css'

function CohortsPageTeachers({ loggedInUser }) {
  return (
    <>
      {/*Header may change*/}
      <Header />

      {/*may not use nav bar*/}
      <main className="teachers-cohorts-main">
        <nav className="teachers-cohorts-nav">
          <ul className="teachers-cohorts-ul">
            <li className="teacher-cohorts-li">
              <span className="material-symbols-outlined">Home</span>Home
            </li>
            <li className="teacher-cohorts-li">
              <span className="material-symbols-outlined">Account_Circle</span>
              Profile
            </li>
            <li className="teacher-cohorts-li">
              <span className="material-symbols-outlined">School</span>Cohorts
            </li>
            <li className="teacher-cohorts-li">
              <span className="material-symbols-outlined">Task</span>Exercises
            </li>

            <hr className="teachers-cohorts-hr"></hr>
            <li className="teacher-cohorts-li">
              <span className="material-symbols-outlined">Notes</span>Notes
            </li>
            <li className="teacher-cohorts-li">
              <span className="material-symbols-outlined">Analytics</span>Logs
            </li>
          </ul>
        </nav>

        <section className="content">
          <h2 className="teachers-cohorts-h2">
            <span className="teachers-cohorts-title1">Cohorts</span>
            <span className="teachers-cohorts-title2"> Students</span>
          </h2>

          <CohortsList
            className="teachers-cohortlist"
            renderHeader={true}
            renderAddButton={true}
          />

          <div className="teachers-studentlist"></div>
        </section>
      </main>
    </>
  )
}

export default CohortsPageTeachers
