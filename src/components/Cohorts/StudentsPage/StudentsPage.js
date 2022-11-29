import StudentsList from '../StudentList/StudentsList'
import TeachersList from '../../teachersList/TeachersList'
import './style.css'

export const StudentsPage = ({ loggedInUser }) => {
  return (
    <>
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
