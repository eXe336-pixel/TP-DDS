import React, { useState, useEffect } from "react";
//libreria 
import moment from "moment";
// comp q se usa para 
import InmueblesBuscar from "./InmueblesBuscar.jsx";
import InmueblesListado from "./ListadoInmuebles";
// comp detalle que se usa 
import InmueblesRegistro from "./InmueblesRegistro";
import { inmueblesService } from "../../services/inmueble.service";
import {tiposService} from "../../services/tipos.service";


function Inmuebles() { 
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Ubicacion, setUbicacion] = useState("");
  const [Activo, setActivo] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en Buscar por Ubicacion (Modificar, Consultar)
  const [Tipos, setTipos] = useState(null); // usado en Buscar por Ubicacion (Modificar, Consultar)

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {   
    async function BuscarTipos() {
      let data = await tiposService.Buscar();
      setTipos(data);
    }
    BuscarTipos();
    return () => {
      //console.log("unmounting Articulos");
    };
  }, []);

  async function Buscar() {    
    const data = await inmueblesService.Buscar(Ubicacion,Activo);    
    setItems(data);           
  }

  async function BuscarPorNroCatastral(item, accionABMC) {
    
    const data = await inmueblesService.BuscarPorNroCatastral(item);
     
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
     
    BuscarPorNroCatastral(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {   
      window.alert("No puede modificarse un registro Inactivo.");   
      return;
    }
    BuscarPorNroCatastral(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      NroCatastral: 0,
      Ubicacion: null,
      Zona: null,
      Tipo:0,
      NroContribuyente:0,
      Activo:true,
      FechaCreacion: moment(new Date()).format("YYYY-MM-DD") 
    });
  }

  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
        await inmueblesService.ActivarDesactivar(item);
        Buscar();
    }    
  }

  async function Grabar(item) {
    // agregar o modificar
    await inmueblesService.Grabar(item);
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
        <InmueblesBuscar
          Ubicacion={Ubicacion}
          setUbicacion={setUbicacion}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <InmueblesListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,            
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        
        <InmueblesRegistro
          
          {...{ AccionABMC, Tipos, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export default Inmuebles;
