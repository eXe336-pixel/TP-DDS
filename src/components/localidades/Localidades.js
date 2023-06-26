import React, { useState} from "react";
import moment from "moment";
import BuscarLocalidad from "./BuscarLocalidad";
import RegistroLocalidad from "./RegristroLocalidad";
import LocalidadesListado from "./ListadoLocalidades";
import { localidadService } from "../../services/localidades.service";

function Localidades() { 

  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");  
  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)  ;

  async function Buscar() {  
   
    const data = await localidadService.Buscar(Nombre, Activo);
    console.log(data);
    setItems(data);      
  }
  async function BuscarPorId(item, accionABMC) {
    const data = await localidadService.BuscarPorId(item);
    console.log(data);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) { 
      window.alert("No puede modificarse un registro Inactivo.");    
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      CodigoPostal: 0,
      NombreLocalidad: null,  
      FechaCreacion: moment(new Date()).format("YYYY-MM-DD"),     
      Activo: true,           
    });
  }
  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
        await localidadService.ActivarDesactivar(item);
        Buscar();
    }   
  }

  async function Grabar(item) {
    // agregar o modificar
    await localidadService.Grabar(item);    
    await Buscar();
    Volver();   
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div className="container p-5 my-5 bg-dark text-white">
      {AccionABMC === "L" && (
        <BuscarLocalidad
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}   
          Buscar={Buscar}               
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <LocalidadesListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
           
          }}
        />
      )}
      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <RegistroLocalidad
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export default Localidades;