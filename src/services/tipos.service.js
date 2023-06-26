import {config} from "../config.js";
import httpService from "./http.service.js";

const urlResource = config.urlResourceTipos;

async function Buscar(Descripcion) {
  const resp = await httpService.get(urlResource, {params: { Descripcion },});
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdTipo);   
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdTipo);
}

async function Grabar(item) {
  if (item.IdTipo === 0) {
    await httpService.post(urlResource, item);
  } else {
     
    await httpService.put(urlResource + "/" + item.IdTipo);
  }
}

export const tiposService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};