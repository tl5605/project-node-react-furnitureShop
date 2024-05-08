import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login'
import Register from './Components/Register'
import ArmchairsC from './Components/Customer/ArmchairsC'
import ChairsC from './Components/Customer/ChairsC'
import SofasC from './Components/Customer/SofasC'
import TablesC from './Components/Customer/TablesC'
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


function App() {

  const { role } = useAuth()

  return (
    <div className="App">
      {role === 'manager' ? <NavBarM /> : <NavBarC />}



      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/armchairsCustomer" element={<ArmchairsC />} />
        <Route path="/chairsCustomer" element={<ChairsC />} />
        <Route path="/sofasCustomer" element={<SofasC />} />
        <Route path="/tablesCustomer" element={<TablesC />} />
        <Route path='/basketCustomer' element={<BasketC />} />
        <Route element={<RequireAuth allowRoles={["manager"]} />}>
          <Route path="/armchairsManager" element={<ArmchairsM />} />
          <Route path="/chairsManager" element={<ChairsM />} />
          <Route path="/sofasManager" element={<SofasM />} />
          <Route path="/tablesManager" element={<TablesM />} />
        </Route>
        <Route element={<RequireAuth allowRoles={["customer", "manager"]} />}>
          <Route path='/paymet' element={<Payment />} />
          <Route path='/order' element={<Order />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;