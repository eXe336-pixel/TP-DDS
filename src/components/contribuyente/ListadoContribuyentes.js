import React from "react";

export default function ContribuyentesListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,  
}) {
if (Items.length === null || Items.length === 0 || Items === undefined || Items === []) {
    return (
      <div className="container mt-3">
        <div className="alert alert-warning text-center">
          <h3>No se encontraron Contribuyentes</h3>
        </div>
      </div>
    );
  }
  return (    
    <div className="container mt-3">
      <table className="table table-dark">
        <thead>
          <tr>            
            <th className="text-center">Nombre</th>
            <th className="text-center">Domicilio</th>
            <th className="text-center">Codigo Postal</th>
            <th className="text-center">Barrio</th>
            <th className="text-center">Activo</th>
            <th className="text-center">Fecha Alta</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.NroContribuyente}>
                
                <td className="text-center">{Item.Nombre}</td>
                <td className="text-end text-center">{Item.Domicilio}</td>
                <td className="text-end text-center">{Item.CodigoPostal}</td>
                <td className="text-endtext-center ">{Item.Barrio}</td>
                <td className="text-center">{Item.Activo ? "SI" : "NO"}</td>
                <td className="text-end text-center">
                  {Item.FechaInicio}
                </td>                
                <td className="text-center text-nowrap">
                <button type="button" className="btn btn-outline-info" onClick={() =>Consultar(Item) }>Consultar</button>
                  <button type="button" className="btn btn-outline-warning" onClick={() => Modificar(Item)}>Editar</button>
                  <button type="button" className="btn btn-outline-danger" onClick={() =>ActivarDesactivar(Item) }>Activar/Desactivar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>      
    </div>
  );
}

