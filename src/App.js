import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

require('./app.css');
require('./Pages/Login/login-page-style.css');

import MainHeader   from './Components/Header/main-header.js';
import LoginHeader  from './Components/Header/login-header.js';
import HomePage     from './Pages/Home/home.js';
import ChartsPage   from './Pages/Charts/charts.js';
import MyGalleyPage from './Pages/MyGallery/my-gallery.js';
import GallerysWCategoryPage from './Pages/GalleryWCategory/gallery-w-category.js';
import SignIn       from './Pages/Login/sign-in.js';
import SignUp       from './Pages/Login/sign-up.js';
import Footer       from './Components/Footer/footer.js';

class App extends Component {
  constructor(props){
    super(props);
  }

  handlingRenderMainHeader(){
    const href = window.location.href;
    if(href.indexOf("sign-up") !== -1 || href.indexOf("sign-in") !== -1)
    {
      return <LoginHeader></LoginHeader>
    }
    return <MainHeader></MainHeader>
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className="app">
            { this.handlingRenderMainHeader() }
            <Route exact path='/'      component={HomePage} />
            <Route path='/charts'      component={ChartsPage} />
            <Route path='/my-gallerys' component={MyGalleyPage} />
            <Route path='/gallery/:category' component={GallerysWCategoryPage}/>
            <Route path='/sign-in' component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
