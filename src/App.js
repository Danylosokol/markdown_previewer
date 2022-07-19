import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";


class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      markdown: "",
    }

    this.processMarkdown = this.processMarkdown.bind(this);
  }

  processMarkdown(event){
    this.setState({
      markdown: event.target.value,
    });
  }

  render(){
    return (
      <div>
        <textarea onChange={this.processMarkdown} id="editor">
          {this.state.markdown}
        </textarea>
        <div id="preview">
          <ReactMarkdown
            children={this.state.markdown}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;