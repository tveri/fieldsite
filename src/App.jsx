import GraphicPage2 from "./router/routes/grphicPage2/GraphicPage2";
import TableFinalPage from "./router/routes/tableFinalPage/TableFinalPage";
import "./App.css";
import { Link, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import DdashboardPage from "./router/routes/dashboardPage/DdashboardPage";
import { useState, useEffect } from "react";
import TestPage from "./router/routes/testPage/TestPage";
import TestPage2 from "./router/routes/testPage2/TestPage2";
import LoginPage from "./router/routes/loginPage/LoginPage";
import AdminPanelPage from "./router/routes/adminPanel/AdminPanelPage";
import MapPage from "./router/routes/mapPage/MapPage";

function App() {
  const location = useLocation()
  console.log(location);
  const [field, setField] = useState(location.pathname.split('/')[2])
  const [date, setDate] = useState('')
  const [userData, setUserData] = useState({
		'isLogined': false,
		'roles': [0]
  })

  	useEffect(() => {
		console.log(userData);
		setField('')
  	}, [userData])

  return (
	  <div>
		<div className="navBar">
		  <div className="navBarLeft">
			<Link onClick={() => {setField('')}} className="navBarButton" to='/dashboard/'>Дашборд</Link>
			<Link onClick={() => {setField('')}} className="navBarButton" to='/map'>Карта</Link>
			{location.pathname.split('/')[1] === 'graphic' ? <Link className="navBarButton" to={'/table/' + field}>Таблица</Link> : false}
			{location.pathname.split('/')[1] === 'table' ? <Link className="navBarButton" to={'/graphic/' + field}>График</Link> : false}
		  </div>
		  <div className="navBarCenter">
			{!!field ? <span className="navBarField">Номер поля: <span className="navBarFieldName">{field}</span></span> : false}
			{location.pathname.split('/')[1] === 'dashboard' && <div className="navBarDate">Данные на дату: <input value={date} onChange={(e) => {setDate(e.target.value)}} /></div>}
		  </div>
		  <div className="navBarRight">
			<div>{userData.userEconomyName}</div>
		  	{userData.roles.includes('1') || userData.roles.includes('2') ? <Link className="navBarButton" to={'/adminpanel/'}>Админпанель</Link> : false}
		  </div>
		</div>
		<Routes>
			<Route path='/login/' element={!userData.isLogined ? <LoginPage setUserData={setUserData} /> : <Navigate to='/dashboard/' />} />
			<Route path='/adminpanel/' element={!userData.isLogined ? <Navigate to='/login/' /> : userData.roles.includes('1') || userData.roles.includes('2') ? <AdminPanelPage setField={setField} userData={userData} /> : <Navigate to='/dashboard/' />} />
			<Route path='/dashboard/' element={!userData.isLogined ? <Navigate to='/login/' /> : <DdashboardPage setField={setField} setDate={setDate} date={date} userData={userData} />} />
			<Route path='/map/' element={!userData.isLogined ? <Navigate to='/login/' /> : <MapPage setField={setField} userData={userData} />} />
			<Route path='/table/:fieldid' element={!userData.isLogined ? <Navigate to='/login/' /> : <TableFinalPage userData={userData} />} />
			<Route path='/graphic/:fieldid' element={!userData.isLogined ? <Navigate to='/login/' /> : <GraphicPage2 userData={userData} field={field} />} />
			{/* <Route path='/test/' element={<TestPage />} />
			<Route path='/test2/' element={<TestPage2 />} /> */}
			<Route path="*" element={!userData.isLogined ? <LoginPage setUserData={setUserData} /> : <Navigate to='/login/' />} />
		</Routes>
	  </div>
  );
}

export default App;
