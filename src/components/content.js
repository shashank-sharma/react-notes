import React, {Component} from "react";
import './content.css'
import fm from "front-matter";
import marked from "marked";


class Content extends Component {

  state = {
    markdown: "",
    attributes: {},
    activePage: "",
    loading: false
  };

  componentDidMount() {
    console.log("Component Did Mount");
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    console.log("Component receive prop", nextProps);
    if (nextProps.activePage !== this.state.activePage) {
      this.setState({
        activePage: nextProps.activePage,
        loading: true
      });

      this.fetchMarkdown(nextProps.activePage);
    }
  }

  fetchMarkdown(fileName) {
    const readmePath = require("../posts/" + fileName).default;
    fetch(readmePath)
      .then(response => {
        return response.text();
      })
      .then(text => {
        const markdownContent = fm(text)
        this.setState({
          markdown: marked(markdownContent.body),
          attributes: markdownContent.attributes,
          loading: false
        })
      })
  }

  // componentDidUpdate(prevProp){
  //   if (this.props.activePage) {
  //     this.fetchMarkdown(this.props.activePage)
  //   }
  // }

  // static getDerivedStateFromProps(props, current_state) {
  //   console.log("Hey");
  //   console.log(props);
  //   console.log(current_state);
  //   // if (props.activePage) {
  //   //   // this.fetchMarkdown(props.activePage)
  //   //   const fileName = props.activePage
  //   //   const readmePath = require("../posts/" + fileName).default;
  //   //   fetch(readmePath)
  //   //     .then(response => {
  //   //       return response.text();
  //   //     })
  //   //     .then(text => {
  //   //       const markdownContent = fm(text)
  //   //       current_state.setState({
  //   //         markdown: marked(markdownContent.body),
  //   //         attributes: markdownContent.attributes
  //   //       })
  //   //     })
  //   // }
  //   return null
  // }

  render() {
    const { markdown } = this.state;
    if (this.state.loading) {
      return (
        <div className={"content-container"}>
          <h1 className={"content-title"}>Loading</h1>
        </div>
      )
    } else{
      return (
        <div className={"content-container"}>
          <h1 className={"content-title"}>{this.state.attributes.title}</h1>
          <h7 className={"content-date"}>{this.state.attributes.date}</h7>
          <hr/>
          {/*<div dangerouslySetInnerHTML={{ __html: data.html }} />*/}
          <span dangerouslySetInnerHTML={{__html: markdown}}></span>
        </div>
      )
    }
  }
}

export default Content;