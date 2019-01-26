import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css }  from 'styled-components';

const StyledNavLink = styled(NavLink)`
  color: #dd7cbd;
  text-decoration: none;
  margin-left: 20px;
  transition: all .3s;

  :hover {
    color: #e03caa;
    text-decoration: underline;
  }
`;

const LogoLink = styled(NavLink)`
  color: white;
  text-decoration: none;
`;

const Logo = styled.div`
  position: relative;
  width: 2rem;
  height: auto;
  color: white;
  font-size: 2rem;
  left: 3%;
  `;

const NavBar = styled.nav`
  height: 80px;
  background: #383838;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  margin-right: 80px;
  align-items: center;
`;

const Header = () => (
  <NavBar>
    <Logo>
      <LogoLink to="/">Pinstagram</LogoLink>
    </Logo>
    <NavLinks>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledNavLink to="/gallery">Gallery</StyledNavLink>
      <StyledNavLink to="/blog">Blog</StyledNavLink>
    </NavLinks>
  </NavBar>
);

export default Header;
