import React from "react";
import moment from "moment";
//revisar activo o no
export default function ListadoInmuebles({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
})
{
  return (
    <div  className="container mt-3">
      <table className="table table-dark">
        <thead>
          <tr>
            <th className="text-center">NroCatastral</th>
            <th className="text-center">Ubicacion</th>
            <th className="text-center">Zona</th>
            <th className="text-center">Tipo</th>
            <th className="text-center">NroContribuyente</th>
            <th className="text-center">Activo</th>
            <th className="text-center">FechaCreacion</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.NroCatastral}>
                <td  className="text-end text-center">{Item.NroCatastral}</td>
                <td className="text-end text-center">{Item.Ubicacion}</td>
                <td className="text-end text-center">{Item.Zona}</td>
                <td className="text-end text-center">{Item.Tipo}</td>
                <td className="text-end text-center">{Item.NroContribuyente}</td>
                {/* deberian listarse todos o solos los que estan activos? */}
                <td className="text-center">{Item.Activo ? "SI" : "NO"}</td>
                <td className="text-end text-center">
                  {moment(Item.FechaCreacion).format("DD/MM/YYYY")}
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
