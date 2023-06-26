import React from "react";
import { useForm } from "react-hook-form";

export default function TiposRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
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
    <form className="card bg-dark text-white" onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo Descripcion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Descripcion">
              Descripcion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Descripcion", {
                  required: { value: true, message: "Descripcion es requerido" },
                  minLength: {
                    value: 4,
                    message: "Descripcion debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55, // revisar valores para length de descripcion
                    message: "Descripcion debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Descripcion ? "is-invalid" : "")
                }
              />
              {errors?.Descripcion && touchedFields.Descripcion && (
                <div className="invalid-feedback">
                  {errors?.Descripcion?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo FechaCreacion */}
          { }
          {AccionABMC === "C" &&  
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
          }
        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit"  className="btn btn-primary">
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
