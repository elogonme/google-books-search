import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container } from 'semantic-ui-react';


function Nav(props) {

  return (
    <Container>
      <Menu tabular>
          <Menu.Item as={ NavLink } to="/search"
            name='Search'
            active={props.location === 'search'}
          />
          <Menu.Item as={ NavLink } to="/saved"
            name='Saved Books'
            active={props.location === 'saved'}
          />
      </Menu>
    </Container>
    
  );
}

export default Nav;
