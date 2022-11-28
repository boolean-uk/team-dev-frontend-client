import StudentsList from './StudentsList'

function CohortPage({}) {
  return (
    <StudentsList
      renderAddBtn={true}
      asStudent={true}
      renderInfo={'fullInfo'}
      renderAllBtn={false}
    />
  )
}

export default CohortPage
