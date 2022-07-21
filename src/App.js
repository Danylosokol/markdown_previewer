import React from 'react';
import test from "./test.js";
import { marked } from 'marked';
import hljs from 'highlight.js';
import "highlight.js/styles/monokai.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function (code) {
    return hljs.highlightAuto(code, ["html", "javascript"]).value;
  },
  breaks: true,
});


class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      markdown: test,
      html: marked(test),
      editorFullScreen: false,
      previewFullScreen: false
    };

    this.processMarkdown = this.processMarkdown.bind(this);
    this.editorToggle = this.editorToggle.bind(this);
    this.previewToggle =this.previewToggle.bind(this);
  }

  processMarkdown(event){
    this.setState({
      markdown: event.target.value,
      html: marked.parse(event.target.value),
    });
  }

  editorToggle(){
    this.setState((state) => ({
      editorFullScreen: !state.editorFullScreen,
      previewFullScreen: false
    }));
  }

  previewToggle(){
    this.setState((state) => ({
      editorFullScreen: false,
      previewFullScreen: !state.previewFullScreen
    }))
  }

  render(){
    let editorMode = 'regular';
    let previewMode = 'regular';
    let editorIcon = faExpand;
    let previewIcon = faExpand;
    if(this.state.editorFullScreen){
      editorMode = 'fullScreen';
      previewMode = 'hide';
      editorIcon = faCompress;
    }else if(this.state.previewFullScreen){
      editorMode = 'hide';
      previewMode = 'fullScreen';
      previewIcon = faCompress;
    }

    return (
      <div>
        <div className={editorMode}>
          <div className="header">
            <span>
              <FontAwesomeIcon icon={faFreeCodeCamp} />
              Editor
            </span>
            <FontAwesomeIcon
              className="editorToggleBtn"
              icon={editorIcon}
              onClick={this.editorToggle}
            />
          </div>
          <textarea onChange={this.processMarkdown} id="editor">
            {this.state.markdown}
          </textarea>
        </div>

        <div className={previewMode}>
          <div className="header">
            <span>
              <FontAwesomeIcon icon={faFreeCodeCamp} />
              Preview
            </span>
            <FontAwesomeIcon
              className="previewToggleBtn"
              icon={previewIcon}
              onClick={this.previewToggle}
            />
          </div>
          <div
            id="preview"
            dangerouslySetInnerHTML={{ __html: this.state.html }}
          ></div>
        </div>
      </div>
    );
  }
}

export default App;