import React, { Component, Fragment } from 'react';
import AppNavBar from './components/AppNavbar';
import Contacts from './components/Contacts';
import ContactModal from './components/ContactModal';
import SearchModal from './components/SearchModal';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component{

  render (){

    return (
      <div className="HomePage">
        <video className="videoparallax" autoPlay loop muted>
          <source src={require('./people.mp4')} type="video/mp4"/>
        </video>
        <AppNavBar />
        <Container>
          {this.props.auth.isAuthenticated ? 
            <div>
              <ContactModal />
              <SearchModal />
            </div>
          : <Fragment/>}
          <Contacts />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

// export default App;
export default connect(mapStateToProps, {})(App);