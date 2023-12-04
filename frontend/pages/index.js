import { authService } from "../src/services/auth/authService";
import { useRouter } from "next/router";
import { useState } from "react";

export default function HomeScreen() {
  const router = useRouter();

  const [values, setValues] = useState({
    usuario: "aline",
    senha: "aline123",
  });

  function handleChange(event) {
    const fieldvalue = event.target.value;
    const fieldname = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldname]: fieldvalue,
      };
    })
  }


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        authService.login({
          username: values.usuario,
          password: values.senha,
        })
        .then(() => {
        router.push("/auth-page-static");
        // router.push("/auth-page-ssr");
        }).catch(()=>{
          alert("usuario ou senha invalidos");
        })
      }}>
        <input
          placeholder="Usuário" name="usuario"
          value={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha" name="senha" type="password"
          value={values.senha}
          onChange={handleChange}
        />
        {/* <pre>
          {JSON.stringify(values, null, 2)}
        </pre> */}
        <div>
          <button>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
