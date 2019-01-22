import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

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

    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render

    console.log('Is modal: ', isModal);
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
          <Route path="/img/:id" component={ImageView} />
        </Switch>
        {isModal ? <Route path="/img/:id" component={Modal} /> : null}
      </div>
    );
  }
}

const Image = styled.div`
  width: 305px;
  height: 305px;
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

const IMAGES = [
  { id: 1, title: 'Blueberry' },
  { id: 2, title: 'House' },
  { id: 3, title: 'Girl' },
  { id: 4, title: 'Bull' },
  { id: 5, title: 'Palm' },
  { id: 6, title: 'Cat' },
  { id: 7, title: 'Camera' },
  { id: 8, title: 'Compass' },
  { id: 9, title: 'Fire' },
  { id: 10, title: 'Wave' },
  { id: 11, title: 'Coffee' },
  { id: 12, title: 'Stick Man' },
  { id: 13, title: 'Mountain' },
  { id: 14, title: 'Succulent' },
  { id: 15, title: 'Barn' }
];

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

const PhotoGrid = styled.div.attrs({
  className: 'photogrid'
})`
  display: grid;
  grid-template-columns: repeat(3, 305px);
  gap: 20px;
  width: 950px;
  margin: auto;
  margin-top: 80px;
`;

function Gallery() {
  return (
    <PhotoGrid>
      {IMAGES.map(image => (
        <Link
          key={image.id}
          to={{
            pathname: `/img/${image.id}`,
            // this is the trick!
            state: { modal: true }
          }}
        >
          <Image index={image.id} />
        </Link>
      ))}
    </PhotoGrid>
  );
}

function ImageView({ match }) {
  let image = IMAGES[parseInt(match.params.id, 10) - 1];

  if (!image) return <div>Image not found</div>;

  return (
    <div>
      <h1>{image.title}</h1>
      <Image index={image.id} />
    </div>
  );
}

function Modal({ match, history }) {
  let image = IMAGES[parseInt(match.params.id, 10) - 1];

  if (!image) return null;

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div
      onClick={back}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <div
        className="modal"
        style={{
          position: 'absolute',
          background: '#fff',
          top: 25,
          left: '10%',
          right: '10%',
          padding: 15,
          border: '2px solid #444'
        }}
      >
        <h1>{image.title}</h1>
        <Image inModal index={image.id} />
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
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
