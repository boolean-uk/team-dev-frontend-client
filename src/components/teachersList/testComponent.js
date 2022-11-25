import CohortsList from '../cohortsList/CohortsList'
import TeachersList from './TeachersList'

function TestComponent() {
  return (
    <>
      <h1>That is a test component page</h1>
      <TeachersList renderHeader={true} />
      <CohortsList renderHeader={true} renderAddButton={true} />
    </>
  )
}

export default TestComponent
