import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "./tokenService";


// metodo fecth personalizado pelo HttpClient
export const authService = {
    async login({username, password}) {
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: "POST",
            body: {username, password}
        })
        .then(async (response) => {
            if (!response.ok) throw new Error("usuario ou senha invalidos!")
            const body = response.body;
            console.log(body);

            tokenService.save(body.data.access_token);
        })
    },

    async getSession(ctx = null) {
        const token = tokenService.get(ctx);

        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
            method: "GET",
            headers:{
                Authorization:`bearer ${token}`,
            }
        })
        .then((response) => {
            if (!response.ok) throw new Error("Nao autorizado");
            return response.body.data
        });
    }
};

// metodo fetch normal
// export const authService = {
//     async login({username, password}) {
//         return fetch("http://localhost:4000/api/login", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//                 },
//             body: JSON.stringify({
//                 username, 
//                 password,
//             })
//         })
//         .then(async (response) => {
//             if (!response.ok) throw new Error("usuario ou senha invalidos!")
//             const body = await response.json();
//             console.log(body);
//         })
//     }

// }