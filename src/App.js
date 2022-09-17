import SensorList from './components/SensorList';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SensorDetail from './components/SensorDetail';
import sensors from './db.json';
import { Container } from '@mui/material';


function App() {
  return (
    <BrowserRouter>
      <Container maxWidth='lg' sx={{ pt: 4, pb: 4 }}>
        <Routes>
          <Route path="/" exact element={<SensorList sensors={sensors} />} />
          <Route path="/sensor/:id" element={<SensorDetail sensors={sensors} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;
