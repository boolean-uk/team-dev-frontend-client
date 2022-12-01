import StudentsList from '../StudentList/StudentsList'
import TeachersList from '../../teachersList/TeachersList'
import './students.css'
import NavigationRail from '../../NavigationRail/NavigationRail'

export const StudentsPage = ({ loggedInUser }) => {
  return (
    <>
      <NavigationRail user={loggedInUser} />
      <div className="container">
        <div className="students-list">
          <StudentsList
            user={loggedInUser}
            renderAddBtn={false}
            renderInfo={'fullInfo'}
            renderAllbtn={false}
          />
        </div>
        <div className="teachers-list">
          <TeachersList renderHeading={true} />
        </div>
        <div className="exercises-list"></div>
      </div>
    </>
  )
}
