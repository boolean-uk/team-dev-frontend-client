import CohortsList from './cohortsList/CohortsList'

export default function TestTeachersCohort() {
  return (
    <>
      <h1>Teachers Cohort</h1>
      <CohortsList renderHeader={true} renderAddButton={true} />
    </>
  )
}
