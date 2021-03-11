import React from "react";
import "./style.css"
import { Header, Icon } from 'semantic-ui-react';

const PageHeader = () => (
    <Header as='h2' icon textAlign='center' className="page-header">
        <Icon name='goodreads' color="blue" />
        <span style={{color: "red"}}>Google</span>
        <span style={{color: "orange"}}> Books</span>
        <span style={{color: "green"}}> Search</span>
        <Header.Subheader color="orange">
        Search for and Save Books of Interest
        </Header.Subheader>
    </Header>
)

export default PageHeader;