import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceLocalidades;

async function Buscar(Nombre, Activo) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.CodigoPostal);
  return resp.data;
}

async function ActivarDesactivar(item) {  
  await httpService.delete(urlResource + "/" + item.CodigoPostal);
}

async function Grabar(item) {   
  if (item.CodigoPostal === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.CodigoPostal, item);
  }
}

export const localidadService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};