import React from "react";
import moment from "moment";
export default function ListadoTipos({
  Items,
  Consultar,
  Modificar,    
}) {
  return (
    <div className="container mt-3">
      <table className="table table-dark">
        <thead>
          <tr>
            <th className="text-center">IdTipo</th>
            <th className="text-center">Descripcion</th>
            <th className="text-center">FechaCreacion</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdTipo}>
                <td className="text-center">{Item.IdTipo}</td>
                <td className="text-end text-center">{Item.Descripcion}</td>
                <td className="text-end text-center">{moment(Item.FechaCreacion).format("DD/MM/YYYY")}</td>                
                <td className="text-center">
                <button type="button" className="btn btn-outline-info" onClick={() =>Consultar(Item) }>Consultar</button>
                <button type="button" className="btn btn-outline-warning" onClick={() =>Modificar(Item) }>Modificar</button>                
              </td>   
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
