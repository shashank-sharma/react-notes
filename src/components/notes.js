import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import Sidebar from "./sidebar";
import Content from "./content";
import "./notes.css";


class Notes extends Component {

  state = {
    activePage: ""
  };

  componentDidMount() {
  }

  componentWillMount() {
  }

  pageHandler = (pageName) => {
    console.log("PageHandler " + pageName);
    this.setState({
      activePage: pageName
    });
  }

  render() {
    return (
      <Row className={"notes-container"}>
        <Col xl={"2"} md={"3"} sm={"12"} className={"sticky-sidebar"}><Sidebar pageHandler={this.pageHandler}/></Col>
        <Col lg={"10"} md={"9"} sm={"12"}><Content activePage={this.state.activePage}/></Col>
      </Row>
    );
  }
}

export default Notes;