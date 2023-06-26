import React from "react";

export default function LocalidadesListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,  
}) {

if (Items.length === 0) {
    return (
      <div className="container mt-3">
        <div className="alert alert-warning text-center">
          <h3>No se encontraron Localidades</h3>
        </div>
      </div>
    );
  }
  return (    
    <div className="container mt-3">
      <table className="table table-dark">
        <thead>
          <tr>            
            <th className="text-center">CodigoPostal</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Activo</th>
            <th className="text-center">Fecha Creacion</th> 
            <th className="text-center">Acciones</th>       
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.CodigoPostal}>
                <td className="text-center">{Item.CodigoPostal}</td>
                <td className="text-end text-center">{Item.NombreLocalidad}</td>
                <td className="text-center">{Item.Activo ? "SI" : "NO"}</td>                
                <td className="text-end text-center">
                  {Item.FechaCreacion}
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

