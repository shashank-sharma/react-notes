import React, {Component} from "react";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './sidebar.css';


class PostLink extends Component {

  state = {};

  componentDidMount() {
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className={"post-sidebar-fcontainer"} onClick={() => {this.props.pageHandler(this.props.filename)}}>
        <div className={"post-sidebar-filename"}>
      <span className={"post-sidebar-icon"}>
        <FontAwesomeIcon icon={faFile} size="1x" style={{color: 'white'}} />
      </span>
          {this.props.title}
        </div>
      </div>
    );
  }
}

export default PostLink;