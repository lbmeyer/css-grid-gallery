import styled, { css } from 'styled-components';

export const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  background: url(/img/3.jpeg) no-repeat center/170%;
  border-radius: 50%;
  margin: 40px; 

  @media (max-width: 990px) {
    margin: 20px;
    width: 120px;
    height: 120px;
  }

  ${({ mini }) => mini && css `
    width: 50px;
    height: 50px;
    margin: 5px;

    @media (max-width: 990px) {
      width: 50px;
      height: 50px;
      margin: 5px;
    }
  `}
`

