import Header from '../Header/Header'
import SideNavBar from '../sideNavBar/sideNavBar'

function ConversionPage({ userData }) {
  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <div className="mainGridArea ">
        <SideNavBar />
        <h2>Converstions coming soon</h2>
      </div>
    </>
  )
}

export default ConversionPage
