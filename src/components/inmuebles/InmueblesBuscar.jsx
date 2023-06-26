import React from "react";
export default function InmueblesBuscar ({Ubicacion, setUbicacion, Activo, setActivo, Buscar, Agregar}) {
  return (
  <form name="FormBusqueda" onSubmit={(e)=> e.preventDefault()} className="text-center">
    <div className="card bg-dark text-white">
      {/* Filtros */}
      <div className="card-body">
        <h1>Inmuebles</h1>
        <hr />
        <div className="col-sm-12 col-md-12 d-flex justify-content-center">
          <label className="col-sm-12 col-md-12 d-flex justify-content-center">Ubicacion:</label>
        </div>
        <div className="col-sm-12 col-md-12 d-flex justify-content-center">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUbicacion(e.target.value)}
            value={Ubicacion}
            maxLength="55" // verificar si aplica
            autoFocus
          />
        </div>
        <div className="col-sm-12 col-md-12 d-flex justify-content-center">
          <label className="form-label">Activo:</label>
        </div>
        <div className="col-sm-12 col-md-12 d-flex justify-content-center">
          <select
            className="form-control"
            onChange={(e) => setActivo(e.target.value)}
            value={Activo}
          >
            <option value={null}></option>
            <option value={false}>NO</option>
            <option value={true}>SI</option>
          </select>
        </div>
      </div>
      {/* El elemento HTML <hr> representa un cambio de tema entre párrafos (por ejemplo, un cambio de escena en una historia, un cambio de tema en una sección) */}
      <hr/>
      {/* Botones */}
      <div className="row">
        <div className="col text-center botones">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => Buscar(1) }
        >
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