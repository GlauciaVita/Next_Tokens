//Arquitetura hexagonal
//ports & adapters
//padronização para aplicações com json

export async function HttpClient(fetchUrl, fecthOptions) {
    const options = {
        ...fecthOptions,
        headers: {
            'Content-Type': 'application/json',
            ...fecthOptions.headers,
            }, 
        body: fecthOptions.body ? JSON.stringify(fecthOptions.body) : null,
        };
    console.log("options", options) ;
    return fetch(fetchUrl, options)       
    .then(async(response) => {
        return {
            ok: response.ok,
            status: response.status,
            statustext: response.statusText,
            body: await response.json(),
        }
    });
}
