import StudentsList from '../StudentList/StudentsList'
import TeachersList from '../../teachersList/TeachersList'
import './students.css'
import NavigationRail from '../../NavigationRail/NavigationRail'
import Header from '../../Header/Header'
import MyExercises from '../myExercises/MyExercises'

export const StudentsCohortPage = ({ loggedInUser }) => {
  const newStudentNoCohort =
    loggedInUser.role === 'STUDENT' && loggedInUser.cohortId === null
      ? true
      : false

  return (
    <>
      <Header />
      <NavigationRail user={loggedInUser} />
      {!newStudentNoCohort ? (
        <div className="student-page-container">
          <div className="students-list-space">
            <StudentsList
              user={loggedInUser}
              renderAddBtn={false}
              renderInfo={'fullInfo'}
              teachersPage={false}
            />
          </div>
          <section className="rigth-section-student-page">
            <div className="teachers-list-space">
              <TeachersList renderHeading={true} />
            </div>
            <div className="exercises-list-space">
              <MyExercises User={loggedInUser} />
            </div>
          </section>
        </div>
      ) : (
        <h1>
          You don't have a cohort yet, Please wait to be assigned one and return
          to homepage
        </h1>
      )}
    </>
  )
}
