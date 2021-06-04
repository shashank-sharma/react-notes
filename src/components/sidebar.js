import React, {Component} from "react";
import fm from "front-matter";
import PostLink from "./postlink";
import './sidebar.css';


class Sidebar extends Component {

  state = {
    markdownList: []
  };

  async getFrontMatter(name) {
    const markdownName = name.split("/")[1]
    const readmePath = require("../posts/" + markdownName).default;
    const response = await fetch(readmePath)
      .then(response => {
        return response.text();
      })
      .then(text => {
        return fm(text).attributes
      })
    response['filename'] = markdownName
    return response;
  }

  componentDidMount() {
    const markdownContext = require.context('../posts', true, /\.md$/);
    const markdownKeys = markdownContext.keys()
    const posts = []
    for (let x in markdownKeys) {
      posts.push(this.getFrontMatter(markdownKeys[x]))
      // this.getFrontMatter(markdownKeys[x]).then(node => {
      //   posts.push(node);
      //   // this.setState(prevState => ({
      //   //   markdownList: [...prevState.markdownList, node]
      //   // }))
      // })
    }
    Promise.all(posts).then((values) => {
      this.setState({
        markdownList: values
      })
    });
    // const posts = markdownKeys
    //   .map(name => this.getFrontMatter(name))
    //   .filter(node => !!node.date)

    // const readmePath = require("../posts/post-two.md").default;
    // fetch(readmePath)
    //   .then(response => {
    //     return response.text();
    //   })
    //   .then(text => {
    //     const markdownContent = fm(text)
    //     console.log(markdownContent);
    //     this.setState({
    //       markdown: marked(markdownContent.body)
    //     })
    //   })
  }

  componentWillMount() {
  }

  render() {
    // const { markdown } = this.state;
     // You can filter your posts based on some criteria
      // .map(node => <PostLink title={node.title} />)
    return (
      <div className={"post-sidebar"}>
        {this.state.markdownList.map((data) => {
          return <PostLink title={data.title} filename={data.filename} pageHandler={this.props.pageHandler} />
        })}
        {/*<span dangerouslySetInnerHTML={{__html: markdown}}></span>*/}
      </div>
    );
  }
}

export default Sidebar;