import React, { useState} from "react";
import moment from "moment";
import BuscarContribuyente from "./BuscarContribuyente";
import RegistroContribuyente from "./RegistroContribuyente";
import ContribuyentesListado from "./ListadoContribuyentes";
import { contribuyenteService } from "../../services/contribuyentes.service";

function Contribuyentes() { 

  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");  
  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)  ;

  async function Buscar() {    
    const data = await contribuyenteService.Buscar(Nombre, Activo);
    console.log(data);
    setItems(data);      
  }
  async function BuscarPorId(item, accionABMC) {
    const data = await contribuyenteService.BuscarPorId(item);
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
      NroContribuyente: 0,
      Nombre: null,
      Domicilio: null,
      CodigoPostal: null,
      Barrio: null, 
      Activo: true,     
      FechaInicio: moment(new Date()).format("YYYY-MM-DD"),      
    });
  }
  async function ActivarDesactivar(item) { 
    const resp = window.confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
        await contribuyenteService.ActivarDesactivar(item);
        Buscar();
    }   
  }

  async function Grabar(item) {
    // agregar o modificar
    await contribuyenteService.Grabar(item);    
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
        <BuscarContribuyente
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
        <ContribuyentesListado
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
        <RegistroContribuyente
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export default Contribuyentes;