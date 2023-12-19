import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./page/home"
import Main from "./page/main"
import TimeChart from "./page/timeCharts"
import PieChart from './page/pieChart'
import Map from './page/map'
import Expenses from './page/expenses'
import "./style.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}>
          <Route index element={<Main></Main>}></Route>
          <Route path='/timechart' element={<TimeChart></TimeChart>}></Route>
          <Route path='/piechart' element={<PieChart></PieChart>}></Route>
          <Route path='/map' element={<Map></Map>}></Route>
          <Route path='/expenses' element={<Expenses></Expenses>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
