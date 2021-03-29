import React, { useState } from "react";
import {Link, useHistory, withRouter} from "react-router-dom";
import Logo from "../../assets/airbnb-logo-2020.svg";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Form, Container } from "./styles";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  async function handleSignIn(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar!");
    } else {
      try {
        const response = await api.post("/sessions", { email, password });
        login(response.data.token);
        history.push("/app");
      } catch (err) {
        console.log(err)
        setError("Houve um problema com o login, verifique suas credenciais. T.T")
      }
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <img src={Logo} alt="Airbnb logo" />
        {error && <p>{error}</p>}
        <input
          type="email"
          placeholder="Endereço de e-mail"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        <hr />
        <Link to="/signup">Criar conta grátis</Link>
      </Form>
    </Container>
  );
}

export default withRouter(SignIn);