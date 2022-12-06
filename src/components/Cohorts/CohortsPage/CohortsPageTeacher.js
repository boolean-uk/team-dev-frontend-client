import Header from '../../Header/Header'
import CohortsList from '../../cohortsList/CohortsList'
import './teachers.css'
import StudentsList from '../StudentList/StudentsList'
import NavigationRail from '../../NavigationRail/NavigationRail'

function CohortsPageTeachers({ loggedInUser }) {
  return (
    <>
      <Header companyName={'Cohort Manager 2.0'} />

      <NavigationRail user={loggedInUser} />

      <main className="teachers-cohorts-content">
        <div className="teachers-cohortlist">
          <CohortsList renderHeader={true} renderAddButton={true} />
        </div>

        <div className="teachers-studentlist">
          <StudentsList
            user={loggedInUser}
            renderAddBtn={false}
            renderInfo={false}
            teachersPage={true}
          />
        </div>
      </main>
    </>
  )
}

export default CohortsPageTeachers
