import React from "react";
import { useForm } from "react-hook-form";

export default function InmueblesRegistro({
  AccionABMC,
  Tipos,
  Item,
  Grabar,
  Volver
}){
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };   
  if (!Item) return null;
  return (
    <form  className="card bg-dark text-white"onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo Ubicacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Ubicacion">
              Ubicacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Ubicacion", {
                  required: { value: true, message: "Ubicacion es requerido" },
                  minLength: {
                    value: 5,
                    message: "Ubicacion debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 55, // revisar valores para length de descripcion
                    message: "Ubicacion debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Ubicacion ? "is-invalid" : "")
                }
              />
              {errors?.Ubicacion && touchedFields.Ubicacion && (
                <div className="invalid-feedback">
                  {errors?.Ubicacion?.message}
                </div>
              )}
            </div>
          </div>          
          
          {/* campo Zona */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Zona">
              Zona<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Zona", {
                  required: { value: true, message: "Zona es requerido" },
                  minLength: {
                    value:3,
                    message: "Zona debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 55, // revisar valores para length de descripcion
                    message: "Zona debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Zona ? "is-invalid" : "")
                }
              />
              {errors?.Zona && touchedFields.Zona && (
                <div className="invalid-feedback">
                  {errors?.Zona?.message}
                </div>
              )}
            </div>
          </div>
          {/* campo Tipo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdTipo">
                Tipo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("Tipo", {
                  required: { value: true, message: "Tipo es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.IdTipo ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Tipos?.map((x) => (
                  <option value={x.IdTipo} key={x.IdTipo}>
                    {x.Descripcion}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdTipo?.message}
              </div>
            </div>
          </div>          

          {/* campo NroContribuyente */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="NroContribuyente">
              NroContribuyente<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" step=".01"
                {...register("NroContribuyente", {
                  required: { value: true, message: "NroContribuyente es requerido" },
                  min: {
                    value: 0.01,
                    message: "NroContribuyente debe ser mayor a 0",
                  },
                  max: {
                    value: 99999.99,
                    message: "NroContribuyente debe ser menor o igual a 99999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.NroContribuyente ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.NroContribuyente?.message}</div>
            </div>
          </div>
                
          {/* campo FechaCreacion - no deberia ser un campo  modificable  */}
          { AccionABMC === 'C' && (
              <div className="row">
              <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="FechaCreacion">
                Fecha de Creacion<span className="text-danger">*</span>:
                </label>
              </div>
              <div className="col-sm-8 col-md-6">
                <input
                  type="date"
                  {...register("FechaCreacion", {
                    required: { message: "Fecha de Creacion es requerido" }
                  })}
                  className={
                    "form-control " + (errors?.FechaCreacion ? "is-invalid" : "")
                  }
                />
                <div className="invalid-feedback">
                  {errors?.FechaCreacion?.message}
                </div>
              </div>
            </div>
          )}

          {/* campo Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Activo">
                Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="Activo"
                {...register("Activo", {
                  required: { value: true, message: "Activo es requerido" },
                })}
                className={
                  "form-control" + (errors?.Activo ? " is-invalid" : "")
                }
                disabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.Activo?.message}</div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}
      </div>
    </form>
  );
}