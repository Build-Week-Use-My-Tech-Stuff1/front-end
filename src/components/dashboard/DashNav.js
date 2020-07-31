import React from "react";
import styled from "styled-components";
import { string } from "prop-types";
import { COLORS, BREAKPOINTS } from "../../constants";
import { NavLink, Link } from "react-router-dom";

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => (props.background ? props.background : "white")};
  height: 7rem;
  padding: 0rem 2rem;
  box-shadow: 0rem .5rem 0.5rem 0rem
    ${(props) => (props.color ? props.color : "black")};
  position: fixed;
  top: 0;
  width: 100%;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => (props.color ? props.color : "black")};
    text-decoration: none;
    h2 {
      font-size: 2.5rem;
    }
  }
  .links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    a {
      margin: 0rem 1.25rem;
      text-decoration: none;
      color: ${(props) => (props.color ? props.color : "black")};
      font-size: 1.75rem;
      padding: 0.375rem ${0.375 * (16 / 9)}rem;
      border: thin solid ${(props) => (props.color ? props.color : black)};
      cursor: pointer;
    }
    a.cta {
      color: ${(props) => (props.background ? props.background : "white")};
      border: thin solid
        ${(props) => (props.background ? props.background : "white")};
      background: ${(props) => (props.color ? props.color : "black")};
    }
    @media (max-width: ${BREAKPOINTS.desktop}){
      &.opened{
        display: flex;
      }
    }
  }
`;

export default function DashNav(props) {
  const { username } = props;


  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.assign("/");
}

  return (
    <Container background={COLORS.primary} color={COLORS.secondary}>
      <Link className="title" to='/'>
        <h2>TechGuru</h2>
      </Link>
      <div className="links">
        <Link to="/dashboard">Profile</Link>
        <Link to="/dashboard/list">Post</Link>
        <Link to="/dashboard/collection">Collection</Link>
        <Link to="/" className="signout" onClick={logOut}>Sign Out</Link>

      </div>
    </Container>
  );
}

DashNav.propTypes = {
  username: string,
};
