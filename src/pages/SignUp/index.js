import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/airbnb-logo-2020.svg";
import { Form, Container } from "./styles";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignUp(e) {
    e.preventDefault();
    alert("Eu vou te registrar");
  }

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <img src={Logo} alt="Airbnb logo" />
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Nome de usuário"
          onChange={e => setUsername(e.target.value)}
        />
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
        <button type="submit">Cadastrar grátis</button>
        <hr />
        <Link to="/">Fazer login</Link>
      </Form>
    </Container>
  );
}

export default SignUp;