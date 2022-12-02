import StudentsList from '../StudentList/StudentsList'
import TeachersList from '../../teachersList/TeachersList'
import './students.css'
import NavigationRail from '../../NavigationRail/NavigationRail'
import Header from '../../Header/Header'

export const StudentsCohortPage = ({ loggedInUser }) => {
  return (
    <>
      <Header />
      <NavigationRail user={loggedInUser} />
      <div className="student-page-container">
        <div className="students-list-space">
          <StudentsList
            user={loggedInUser}
            renderAddBtn={true}
            renderInfo={'fullInfo'}
            renderAllBtn={false}
          />
        </div>
        <section className="rigth-section-student-page">
          <div className="teachers-list-space">
            <TeachersList renderHeading={true} />
          </div>
          <div className="exercises-list-space">exercises here</div>
        </section>
      </div>
    </>
  )
}
