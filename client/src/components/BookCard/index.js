import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

const BookCard = (props) => {
    const { title, authors, description, src, link } = props;
    return (
  <Card>
    
    <Card.Content>
        <Image src={src} floated='left' size='mini' />
      <Card.Header>{title}</Card.Header>
      <Card.Meta>
        <span className='date'>Written by {authors}</span>
      </Card.Meta>
      <Card.Description>
        {description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            View
          </Button>
          <Button basic color='red'>
            Save
          </Button>
        </div>
      </Card.Content>
  </Card>
)};

export default BookCard