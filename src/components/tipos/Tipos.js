import React, { useState } from "react";
//libreria 
import moment from "moment";
// comp q se usa para 
import TiposBuscar from "./TiposBuscar";
import TiposListado from "./ListadoTipos";
// comp detalle que se usa 
import TiposRegistro from "./TiposRegistro.jsx";
import { tiposService } from "../../services/tipos.service";

function Tipos() {  
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Descripcion, setDescripcion] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  async function Buscar() {    
    const data = await tiposService.Buscar(Descripcion,);         
    setItems(data);       
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await tiposService.BuscarPorId(item);     
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Modificar(item) {   
    
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdTipo: 0,
      Descripcion: null,
      FechaCreacion: moment(new Date()).format("YYYY-MM-DD") 
    });
  }

  async function Grabar(item) {
    // agregar o modificar
    await tiposService.Grabar(item);
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
        <TiposBuscar
          Descripcion={Descripcion}
          setDescripcion={setDescripcion}          
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <TiposListado
          {...{
            Items,
            Consultar,
            Modificar,                     
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
        <TiposRegistro
          
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export default Tipos;