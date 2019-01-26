import React from 'react';
import Header from '../Components/Header';
import Posts from '../Posts';
import { ModalStyled } from './Modal';
import { PostGrid, InfoGrid } from './PostGrid';
import { MiniUserGrid } from '../Profile/UserGrid';
import { ProfileImage } from '../Profile/ProfileImage'
import { Image } from '../App';

const ModalDirect = ({ match }) => {
  let image = Posts[parseInt(match.params.id, 10) - 1];

  return (
    <>
    <Header/>
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
    </>
  );
};

export default ModalDirect;







// const Modal = ({ match, history }) => {
//   let image = Posts[parseInt(match.params.id, 10) - 1];

//   if (!image) return null;

//   const back = e => {
//     e.stopPropagation();
//     history.goBack();
//   };

//   return (
//     <ModalBackground onClick={back}>
//       <OverFlowHidden />
//       <ModalStyled top={window.scrollY + window.innerHeight / 2 - 250}>
//         <PostGrid>
//           <Image inModal index={image.id} />
//           <InfoGrid>
//             <MiniUserGrid>
//               <ProfileImage mini />
//               <h3>Grid Gallery</h3>
//             </MiniUserGrid>
//             <div>
//               <h2>{image.title}</h2>
//             </div>
//             <div>45 Likes</div>
//           </InfoGrid>
//         </PostGrid>
//       </ModalStyled>
//     </ModalBackground>
//   );
// };