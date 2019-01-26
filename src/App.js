import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Modal from './Modal/Modal';
import Gallery from './Gallery/Gallery';
import ModalDirect from './Modal/ModalDirect';

// This example shows how to render two different screens
// (or the same screen in a different context) at the same url,
// depending on how you got there.
//
// Click the colors and see them full screen, then "visit the
// gallery" and click on the colors. Note the URL and the component
// are the same as before but now we see them inside a modal
// on top of the old screen.

class ModalSwitch extends React.Component {
  // We can pass a location to <Switch/> that will tell it to
  // ignore the router's current location and use the location
  // prop instead.
  //
  // We can also use "location state" to tell the app the user
  // wants to go to `/img/2` in a modal, rather than as the
  // main page, keeping the gallery visible behind it.
  //
  // Normally, `/img/2` wouldn't match the gallery at `/`.
  // So, to get both screens to render, we can save the old
  // location and pass it to Switch, so it will think the location
  // is still `/` even though its `/img/2`.
  previousLocation = this.props.location;

  componentDidUpdate(prevProps) {
    let { location } = this.props;
    console.log(prevProps.history.action);
    // history.action !== 'POP' whenever a link is clicked (link clicked --> 'PUSH')
    // set previousLocation if props.location is not modal
    if (
      prevProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
      ) {
        this.previousLocation = this.props.location;
      }
    }
    
    render() {
      console.log('prevLocation', this.previousLocation);
      console.log('curLocation', this.props.location);
      let { location } = this.props;
      
      // location.state.modal set to true when gallery thumbnail clicked
      // this happens in Gallery.js (Gallery component)
      let isModal = !!(
        location.state &&
        location.state.modal &&
        this.previousLocation !== location
        ); // not initial render
        
    return (
      <div>
        {/* A location object in <Switch> is used for matching children elements instead 
        of the current history location (usually the current browser URL).
        
        // If say we click on gallery thumbnail, componentDidUpdate will set 
        // previousLocation to props.location. This means the Switch location -->
        // is set to path="/gallery". Therefore, the route (and the background) 
        // remains on gallery, while the popup modal appears
        
        */}
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/img/:id" component={ModalDirect} />
        </Switch>
        {/* Show modal overlay with gallery page in background */}
        {isModal ? <Route path="/img/:id" component={Modal} /> : null}
      </div>
    );
  }
}

export const Image = styled.div`
  width: 305px;
  height: 305px;
  @media (max-width: 990px) {
    width: 100%;
    background-size: cover;
  }
  /* destructure index from props */
  background: url(/img/${({ index }) => index}.jpeg) no-repeat center/150%;

  /* Don't add hover effect to images with props set to inModal  */
  ${({ inModal }) =>
    !inModal && css`
      &:hover {
        opacity: 0.7;
      }
    `}
`;

function Home() {
  return (
    <div>
      <Link to="/gallery">Visit the Gallery</Link>
      <h2>Featured Images</h2>
      <ul>
        <li>
          <Link to="/img/2">Tomato</Link>
        </li>
        <li>
          <Link to="/img/4">Crimson</Link>
        </li>
      </ul>
    </div>
  );
}

function ModalGallery() {
  return (
    <Router>
      <Route component={ModalSwitch} />
    </Router>
  );
}

export default ModalGallery;
