import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/usersSlice";
import { Input } from "./Input";
import { Undone } from "./Undone";
import { Done } from "./Done";

export const TodosPage = () => {
  const name = useSelector((state) => state.users.user.displayName);

  return (
    <SContainer>
      <NavWrap>
        <STtl>Todo App Width Redux</STtl>
      </NavWrap>
      <Input />
      <p>Hello! {name}さん</p>
      <SWrap>
        <Undone />
        <Done />
      </SWrap>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;

const SWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;
`;

const NavWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const STtl = styled.h1`
  font-family: "Nothing You Could Do", cursive;
  font-size: 38px;
  text-align: center;
  width: 100%;
`;
