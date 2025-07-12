import CoinChart from "../components/CoinChart"
import CoinTable from "../components/CoinTable"
import Header from "../components/Header"


const Home=()=>{

  return (
  <div className="min-h-screen min-w-screen bg-gradient-to-br from-indigo-100 via-white to-purple-200">
    <Header />
    <CoinTable />
    {/* <CoinChart /> */}
  </div>
);


}

export default Home