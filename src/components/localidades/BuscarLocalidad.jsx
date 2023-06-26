import React from "react";
export default function BuscarLocalidad ({Nombre, setNombre, Activo, setActivo, Buscar, Agregar}) {
    return (
    <form name="FormBusqueda" onSubmit={(e)=> e.preventDefault()} className="text-center">
      <div className="card bg-dark text-white">
        <div className="card-body">
          <h1>Localidades</h1>
          <hr />
          <div className="col-sm-12 col-md-12 d-flex justify-content-center">
            <label className="col-form-label">Nombre:</label>
          </div>
          <div className="col-sm-12 col-md-12 d-flex justify-content-center">
            <input type="text" className="form-control" onChange={(e) => setNombre(e.target.value)} value={Nombre} maxLength="55" autoFocus/>
          </div>
          <div className="col-sm-12 col-md-12 d-flex justify-content-center">
            <label className="col-form-label">Activo:</label>
          </div>
          <div className="col-sm-12 col-md-12 d-flex justify-content-center">
            <select className="form-control" onChange={(e) => setActivo(e.target.value)} value={Activo}>
              <option value={null}></option>
              <option value={false}>NO</option>
              <option value={true}>SI</option>
            </select>
          </div>
        </div>
  
        <hr />
  
        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
          <button type="button" className="btn btn-primary" onClick={() => Buscar()}>
             Buscar
          </button>
          <button type="button" className="btn btn-success" onClick={() => Agregar()}>
            Agregar
          </button>
          </div>
        </div>
      </div>
    </form>
    )
  };