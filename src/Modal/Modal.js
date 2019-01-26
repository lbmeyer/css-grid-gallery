import React from 'react';
import Posts from '../Posts';
import { Image } from '../App';
import styled, { createGlobalStyle } from 'styled-components';
import { PostGrid, InfoGrid } from './PostGrid';
import { MiniUserGrid } from '../Profile/UserGrid';
import { ProfileImage } from '../Profile/ProfileImage';

const OverFlowHidden = createGlobalStyle`
  body { overflow: hidden; }
`;

export const ModalStyled = styled.div`
  position: relative;
  margin: 0 auto;
  background: #fff;
  top: ${({ top }) => top}px;
  width: 600px;
  border: 2px solid #444;

  @media (max-width: 990px) {
    left: 0;
    right: 0;
    top: ${({ top }) => top}px;
    width: auto;
  }
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 3000px;
  background: rgba(0, 0, 0, 0.8);
`;

const Modal = ({ match, history }) => {
  let image = Posts[parseInt(match.params.id, 10) - 1];

  if (!image) return null;

  const back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <ModalBackground onClick={back}>
      <OverFlowHidden />
      <ModalStyled top={window.scrollY + window.innerHeight / 2 - 250}>
        <PostGrid>
          <Image inModal index={image.id} />
          <InfoGrid>
            <MiniUserGrid>
              <ProfileImage mini />
              <h3>Grid Gallery</h3>
            </MiniUserGrid>
            <div>
              <h2>{image.title}</h2>
            </div>
            <div>45 Likes</div>
          </InfoGrid>
        </PostGrid>
      </ModalStyled>
    </ModalBackground>
  );
};

export default Modal;
