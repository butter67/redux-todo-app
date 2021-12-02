import styled from "styled-components";
import { useState } from "react";
import { auth, provider } from "../firebase";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onClickEmail = (e) => setEmail(e.target.value);
  const onClickPassword = (e) => setPassword(e.target.value);

  return (
    <div>
      <section>
        <h1>Login</h1>
        <p>Email :</p>
        <label htmlFor="email">
          <input
            type="text"
            name="email"
            value={email}
            onChange={onClickEmail}
          />
        </label>
      </section>
      <section>
        <p>Password : </p>
        <label htmlFor="password">
          <input type="password" value={password} onChange={onClickPassword} />
        </label>
      </section>

      <button>Log in</button>
    </div>
  );
};
