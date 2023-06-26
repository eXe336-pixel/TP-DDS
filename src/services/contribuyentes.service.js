import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceContribuyentes;

async function Buscar(Nombre, Activo) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.NroContribuyente);
  return resp.data;
}

async function ActivarDesactivar(item) {  
  await httpService.delete(urlResource + "/" + item.NroContribuyente);
}

async function Grabar(item) {   
  if (item.NroContribuyente === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.NroContribuyente, item);
  }
}
export const contribuyenteService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};