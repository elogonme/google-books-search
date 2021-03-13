import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button, Icon } from 'semantic-ui-react';
import { useStoreContext} from "../../utils/GlobalState"
import { CLEAR_SEARCH } from "../../utils/actions";

// Nav bar component with page tabs - Using Semantic UI library
function Nav(props) {
  const [state, dispatch] = useStoreContext();
  
  // Clear search results on button click
  const handleClick = () => {
    dispatch({type: CLEAR_SEARCH});
  }

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
          {state.books.length > 0 && <Menu.Item position='right'>
          <Button basic icon onClick={handleClick}>
            <Icon name='remove' />
          </Button>
          </Menu.Item>}
      </Menu>
    </Container>
    
  );
}

export default Nav;
