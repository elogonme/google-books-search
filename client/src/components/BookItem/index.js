import React from 'react';
import "./style.css"
import { Item, Icon, Button, Label } from 'semantic-ui-react'

const BookItem = (props) => {
    const { title, authors, description, src, link, handleSave, bookId, deleteBtn, handleDelete } = props;
    return (
        <Item>
            <Item.Image size='tiny' src={src} />
            <Item.Content verticalAlign='middle'>
                <div>
                <Item.Header className='item-header'>{title}
                    <Button as='div' labelPosition='left' floated="right">
                        <Label basic pointing='right' as='a' href={link} target='blank' >
                            View
                        </Label>
                        {deleteBtn ? (
                            <Button icon onClick={() => handleDelete(bookId)}>
                                <Icon name='delete' />
                                Delete
                            </Button>
                        ) : (
                            <Button icon onClick={() => handleSave(bookId)}>
                                <Icon name='heart' />
                                Save
                            </Button>
                        )}
                        
                    </Button>
                </Item.Header>
                </div>
                <Item.Meta>Written by {authors}</Item.Meta>
                <Item.Description>
                    {description}
                </Item.Description>
            </Item.Content>
        </Item>
)};

export default BookItem