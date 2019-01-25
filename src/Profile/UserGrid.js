import React from 'react';
import styled from 'styled-components';
import { ProfileImage } from './ProfileImage';

const UserGridStyled = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 50px;
  gap: 15px;
  grid-template-areas:
    'photo name'
    'photo label'
    'photo description';

  @media (max-width: 990px) {
    grid-template-columns: 160px auto;
    grid-template-areas:
      'photo name'
      'label .'
      'description .';
  }
`;

// Grid for right side of modal popup
export const MiniUserGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
`;

const Photo = styled.div`
  grid-area: photo;
  @media (max-width: 990px) {
    grid-auto-rows: 100px;
  }
`;

const Name = styled.div`
  grid-area: name;
  font-size: 35px;
  align-self: center;
`;

const Label = styled.div`
  grid-area: label;
  @media (max-width: 990px) {
    padding-left: 25px;
  }
`;

const Description = styled.div`
  grid-area: description;
  max-width: 400px;

  @media (max-width: 990px) {
    padding-left: 25px; 
    grid-column: 1 / 3;
  }
`;

const UserGrid = () => {
  return (
    <UserGridStyled>
      <Photo>
        <ProfileImage />
      </Photo>
      <Name>Name</Name>
      <Label>
        <strong>400 </strong>Followers
      </Label>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida
        tristique lectus. Nullam in lacus dLorem ipsum dolor sit amet,
        consectetur adipiscing elit. Et harum quidem rerum facilis est et
        expedita distinctio. Summus dolor plures dies manere non potest? Quae
        diligentissime contra Aristonem dicuntur a Chryippo. Quae cum dixisset
        paulumque institisset, Quid est? Dicam, inquam, et quidem discendi causa
        magis, quam quo te aut Epicurum reprehensum velim.
      </Description>
    </UserGridStyled>
  );
};

export default UserGrid;
