import './App.css';
import {Menu} from './components/Menu';
import { Inicio } from './components/Inicio';
import Inmuebles from './components/inmuebles/Inmuebles';
import Contribuyentes from './components/contribuyente/Contribuyentes';
import Localidades from './components/localidades/Localidades';
import Tipos from './components/tipos/Tipos';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
          <Menu />
          <div className="divBody rgb(#000000) text-white">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/inmuebles" element={<Inmuebles />} />
              <Route path="/contribuyentes" element={<Contribuyentes />} />
              <Route path="/localidades" element={<Localidades />} />
              <Route path="/tipos" element={<Tipos />} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
        </BrowserRouter>    
    </div>
  );
}

export default App;
