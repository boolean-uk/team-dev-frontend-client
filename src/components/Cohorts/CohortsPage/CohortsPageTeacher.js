import Header from '../../Header/Header'
import CohortsList from '../../cohortsList/CohortsList'
import StudentsList from '../StudentList/StudentsList'
import './teachers.css'

function CohortsPageTeachers({ loggedInUser }) {
  return (
    <>
      {/*Header may change*/}
      <Header />

      {/*may not use nav bar*/}
      <main className="teachers-cohorts-main">
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
          <StudentsList
            user={loggedInUser}
            renderAddBtn={true}
            renderInfo={'fullInfo'}
            renderAllbtn={true}
          />

          <div className="teachers-studentlist"></div>
        </section>
      </main>
    </>
  )
}

export default CohortsPageTeachers
