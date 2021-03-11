import React from "react";
import "./style.css"
import { Header, Icon } from 'semantic-ui-react';
import logo from "../../images/logo.png";

const PageHeader = () => (
    <Header as='h2' icon textAlign='center' className="page-header">
        <div><img src={logo} height={68}/></div>
        <span style={{color: "red"}}>Google</span>
        <span style={{color: "orange"}}> Books</span>
        <span style={{color: "green"}}> Search</span>
        <Header.Subheader color="orange">
        Search for and Save Books of Interest
        </Header.Subheader>
    </Header>
)

export default PageHeader;