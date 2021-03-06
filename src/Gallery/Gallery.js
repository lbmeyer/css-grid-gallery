import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import UserGrid from '../Profile/UserGrid';
import Posts from '../Posts';
import Header from '../Components/Header';

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 305px);
  gap: 20px;
  justify-content: center;
  grid-auto-rows: 305px;
  @media (max-width: 990px) {
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: calc(33vw - 10px);
  }
  ${({ cascade }) =>
    cascade &&
    css`
      grid-auto-rows: 200px;
      grid-gap: 5px;
    `}

`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const TabLink = styled(Link)`
  text-decoration: none;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 3px;
  ${({ selected }) => selected && 'color: black;'}
`;

const ImageLink = styled(Link)`
  background-size: cover;
  /* destructure index from props */
  background: url(/img/${({ index }) => index}.jpeg) no-repeat center/150%;
  transition: opacity .2s ease-in;
  :hover {
    opacity: .7;
  }
  ${({ cascade }) =>
    cascade &&
    css`
      background-size: cover;

      &:nth-of-type(2n) {
        grid-row-start: span 2;
      }
    `}
`;

const Gallery = ({ match, location }) => {
  const cascade = location.search === '?type=cascade';
  return (
    <div>
      <Header />
      <UserGrid />
      <LinkGrid>
        <TabLink selected={!cascade} to={`${match.url}`}>
          square
        </TabLink>
        <TabLink
          selected={cascade}
          to={{ pathname: `${match.url}`, search: '?type=cascade' }}
        >
          cascade
        </TabLink>
      </LinkGrid>
      { /* cascade={cascade ? 1 : 0} workaround to prevent error: 
      Received `true` for a non-boolean attribute `cascade`.
        If you want to write it to the DOM, pass a string instead */ }
      <PhotoGrid cascade={cascade ? 1 : 0}>
        {Posts.map(image => (
          <ImageLink
            cascade={cascade ? 1 : 0}
            key={image.id}
            index={image.id}
            to={{
              pathname: `/img/${image.id}`,
              // this is the trick!
              state: { modal: true }
            }}
          />
        ))}
      </PhotoGrid>
    </div>
  );
};

export default Gallery;
