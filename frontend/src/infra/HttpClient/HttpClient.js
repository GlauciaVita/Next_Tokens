//Arquitetura hexagonal
//ports & adapters
//padronização para aplicações com json

import { tokenService } from "../../services/auth/tokenService";

export async function HttpClient(fetchUrl, fecthOptions) {
    const options = {
        ...fecthOptions,
        headers: {
            'Content-Type': 'application/json',
            ...fecthOptions.headers,
            }, 
        body: fecthOptions.body ? JSON.stringify(fecthOptions.body) : null,
        };
    // console.log("options", options) ;
    return fetch(fetchUrl, options)       
    .then(async(response) => {
        return {
            ok: response.ok,
            status: response.status,
            statustext: response.statusText,
            body: await response.json(),
        }
    })
    .then(async(response) => {
        if(!fecthOptions.refresh) return response;
        if(response.status !==401) return response;
        console.log('Rodar código para atualizar o token');

        //tenta atualizar tokens
        const refreshResponse = await HttpClient("http://localhost:4000/api/refresh", {
            method: "GET",
        });
        const newAccessToken = refreshResponse.body.data.access_token;
        const newRefreshToken = refreshResponse.body.data.refresh_token;

        //tenta guardar tokens
        tokenService.save(newAccessToken);

        //tenta rodar a requisicao anterior
        const retryResponse = await HttpClient(fetchUrl, {
            ...options, 
            refresh: false,
            headers:{
                Authorization: `Bearer ${newAccessToken}`
            }
        })
    
        return retryResponse;
    });
}
