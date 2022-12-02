import Header from '../../Header/Header'
import CohortsList from '../../cohortsList/CohortsList'
import './teachers.css'

import StudentsList from '../StudentList/StudentsList'
import NavigationRail from '../../NavigationRail/NavigationRail'

function CohortsPageTeachers({ loggedInUser }) {
  return (
    <>
      {/*Header may change*/}
      <Header />

      <NavigationRail user={loggedInUser} />

      {/*may not use nav bar*/}
      <main className="teachers-cohorts-main">
        <section className="teachers-cohorts-content">
          <h2 className="teachers-cohorts-h2">
            <span className="teachers-cohorts-title1">Cohorts</span>
            <span className="teachers-cohorts-title2"> Students</span>
          </h2>

          <CohortsList
            className="teachers-cohortlist"
            renderHeader={true}
            renderAddButton={true}
          />

          <div className="teachers-studentlist">
            <StudentsList
              user={loggedInUser}
              renderAddBtn={true}
              renderInfo={false}
              renderAllBtn={true}
            />
          </div>
        </section>
      </main>
    </>
  )
}

export default CohortsPageTeachers
