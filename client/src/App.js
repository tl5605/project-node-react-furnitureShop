import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login'
import Register from './Components/Register'
import ShopC from './Components/Customer/ShopC'
import ArmchairsC from './Components/Customer/ArmchairsC'
import ChairsC from './Components/Customer/ChairsC'
import SofasC from './Components/Customer/SofasC'
import TablesC from './Components/Customer/TablesC'
import ShopM from './Components/Manager/ShopM'
import ArmchairsM from './Components/Manager/ArmchairsM'
import ChairsM from './Components/Manager/ChairsM'
import SofasM from './Components/Manager/SofasM'
import TablesM from './Components/Manager/TablesM'
import NavBarC from './Components/Customer/NavBarC'
import BasketC from './Components/Customer/BasketC'
import NavBarM from './Components/Manager/NavBarM';
import useAuth from './Components/Hooks/useAuth';
import Payment from './Components/Customer/Payment';
import Order from './Components/Customer/Order';
import RequireAuth from './Components/Hooks/RequireAuth';
import MyOrders from './Components/Customer/MyOrders';
import AllOrders from './Components/Manager/AllOrders';
import Customers from './Components/Manager/Customers';


function App() {

  const { role } = useAuth()

  return (
    <div className="App">
      {role === 'manager' ? <NavBarM /> : <NavBarC />}



      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<ShopC />} />
        <Route path="/armchairs" element={<ArmchairsC />} />
        <Route path="/chairs" element={<ChairsC />} />
        <Route path="/sofas" element={<SofasC />} />
        <Route path="/tables" element={<TablesC />} />
        <Route path='/basket' element={<BasketC />} />
        <Route element={<RequireAuth allowRoles={["manager"]} />}>
        <Route path="/shopManager" element={<ShopM />} />
          <Route path="/armchairsManager" element={<ArmchairsM />} />
          <Route path="/chairsManager" element={<ChairsM />} />
          <Route path="/sofasManager" element={<SofasM />} />
          <Route path="/tablesManager" element={<TablesM />} />
          <Route path='/orders' element={<AllOrders />} />
          <Route path='/customers' element={<Customers />} />
        </Route>
        <Route element={<RequireAuth allowRoles={["customer", "manager"]} />}>
          <Route path='/paymet' element={<Payment />} />
          <Route path='/order' element={<Order />} />
          <Route path='/myOrders' element={<MyOrders />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;