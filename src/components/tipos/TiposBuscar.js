import React from "react";
export default function TiposBuscar ({Descripcion, setDescripcion, Buscar, Agregar}) {
  return (
  <form name="FormBusqueda" onSubmit={(e)=> e.preventDefault()}className="text-center">
    <div className="card bg-dark text-white">
      <div className="card-body">
        <h1>Tipos</h1>
        <hr />
        <div className="col-sm-12 col-md-12 d-flex justify-content-center">
          <label className="form-label">Descripcion:</label>
        </div>
        <div className="col-sm-12 col-md-12 d-flex justify-content-center">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDescripcion(e.target.value)}
            value={Descripcion}
            maxLength="55" // verificar si aplica
            autoFocus
          />
        </div>         
      </div>
      <hr />

      {/* Botones */}
      <div className="row">
        <div className="col text-center botones">
        <button type="button" className="btn btn-primary" onClick={() => Buscar(1)}>
        Buscar
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => Agregar() }
        >
          Agregar
        </button>
        </div>
      </div>
    </div>
  </form>
  )
};