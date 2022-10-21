import Header from '../Header/Header'
import SideNavBar from '../sideNavBar/sideNavBar'

function ConversionPage({ userData }) {
  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} userData={userData} />
      <div className="mainGridArea ">
        <SideNavBar />
        <div>
          <img src="https://t3.ftcdn.net/jpg/02/98/53/18/360_F_298531843_n8oXcW29nw0eQDpd7iaerprgcERGltLP.jpg" />
          <h1>UNDER CONSTRUCTION</h1>
          <h2>Converstions coming soon</h2>
        </div>
      </div>
    </>
  )
}

export default ConversionPage
