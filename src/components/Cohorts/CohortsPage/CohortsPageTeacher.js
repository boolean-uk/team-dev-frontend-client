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
      <main className="teachers-cohorts-content">
        <div className="teachers-cohortlist">
          <CohortsList renderHeader={true} renderAddButton={true} />
        </div>

        <div className="teachers-studentlist">
          <StudentsList
            user={loggedInUser}
            renderAddBtn={false}
            renderInfo={false}
            renderAllBtn={false}
          />
        </div>
      </main>
    </>
  )
}

export default CohortsPageTeachers
