import React from "react";
import { Container } from "semantic-ui-react";

function NoMatch() {
  return (
    <Container textAlign='center' style={{marginTop: 40}}>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
    </Container>
  );
}

export default NoMatch;
