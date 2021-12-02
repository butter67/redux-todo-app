import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

import styled from "styled-components";

export const Navigation = () => {
  return (
    <div>
      <Router>
        <nav>
          <Sul>
            <Sli>
              <Link to="/">Home</Link>
            </Sli>
            <Sli>
              <Link to="/register">Register</Link>
            </Sli>
            <Sli>
              <Link to="/login">Login</Link>
            </Sli>
          </Sul>
        </nav>
      </Router>
    </div>
  );
};

const Sul = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  text-decoration: none;
`;
const Sli = styled.li`
  margin: 0px 10px;
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
