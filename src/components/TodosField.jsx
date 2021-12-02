import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { auth } from "../firebase";

import { TodosPage } from "./TodosPage";
import { Login } from "../auth/Login";
import { Signin } from "../auth/Signin";

export const TodosField = () => {
  return (
    <div>
      <MainWrap>
        {/* <NavWrap>
          <STtl>Todo App Width Redux</STtl>
        </NavWrap>
        <Input /> */}
        <Router>
          <nav>
            <Sul>
              <Sli>
                <Link to="/">Home</Link>
              </Sli>
              <Sli>
                <Link to="/signin">Signin</Link>
              </Sli>
              <Sli>
                <Link to="/login">Login</Link>
              </Sli>
              <Sli>
                <LgoButton onClick={() => auth.signOut()}>Logout</LgoButton>
              </Sli>
            </Sul>
          </nav>

          <Routes>
            <Route exact path="/" element={<TodosPage />} />
          </Routes>
          <Routes>
            <Route path="/signin" element={<Signin />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </MainWrap>
    </div>
  );
};

const MainWrap = styled.div`
  display: flex;
  max-width: 1020px;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 14px;
`;

const Sul = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  text-decoration: none;
  padding-left: 0px;
`;
const Sli = styled.li`
  margin: 10px 30px 0px;
  a {
    cursor: pointer;
    text-decoration: none;
    color: #050505;
    transition: all 0.2s;
    :hover {
      opacity: 0.8;
      transition: all 0.2s;
    }
  }
`;
const LgoButton = styled.button`
  border: none;
  background: lightgray;
  padding: 10px 20px;
  border-radius: 20px;
  color: darkgreen;
`;
