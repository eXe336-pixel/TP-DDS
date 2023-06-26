import {config} from "../config.js";
import httpService from "./http.service.js";

const urlResource = config.urlResourceInmuebles;

async function Buscar(Ubicacion,Activo) {
  const resp = await httpService.get(urlResource, {
    params: { Ubicacion,Activo},
  });
  return resp.data;
}

async function BuscarPorNroCatastral(item) {
  const resp = await httpService.get(urlResource + "/" + item.NroCatastral);   
  return resp.data;
}

async function ActivarDesactivar(item) {
  
  await httpService.delete(urlResource + "/" + item.NroCatastral);
}

async function Grabar(item) {
  if (item.NroCatastral === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.NroCatastral, item);
  }
}

export const inmueblesService = {
  Buscar,BuscarPorNroCatastral,ActivarDesactivar,Grabar
};