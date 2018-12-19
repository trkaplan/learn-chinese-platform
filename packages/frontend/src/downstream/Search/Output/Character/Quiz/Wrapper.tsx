import * as React from "react";
import { Component } from "react";
import styled from "styled-components";
import { Trigger } from "./Trigger";
import { Display } from "./Display";
import { Title } from "./Title";
import { Options } from "./Options";
import { Controls } from "./Controls";
import { Statistics } from "./Statistics";
import { Message } from "./Message";

interface IWrapper {
  text: string;
  stroke: any;
}

const WrapperView = styled("div")``;

class Wrapper extends Component<IWrapper> {
  state = {
    open: false,
    running: false,
    finishedOnce: false,
    width: 100,
    height: 100,
    remaining: 0,
    mistakesInQuiz: 0,
    mistakesInStroke: 0,
    messages: [
      {
        text: "You made a mistake"
      },
      {
        text: "You did it!",
        positive: true
      }
    ]
  };

  toggleQuiz = () =>
    this.setState({
      open: !this.state.open
    });

  startOrRestart = () => {
    this.setState({
      running: !this.state.running
    });
    this.finishQuiz();
  };

  finishQuiz = () =>
    this.setState({
      finishedOnce: true
    });

  zoomIn = () =>
    this.setState({
      width: this.state.width + 10,
      height: this.state.height + 10
    });

  zoomOut = () =>
    this.setState({
      width: this.state.width - 10,
      height: this.state.height - 10
    });

  render() {
    const { text, stroke } = this.props;

    return (
      <WrapperView {...this.props}>
        <Title title={text} />
        {this.state.open && (
          <>
            <Options onZoomIn={this.zoomIn} onZoomOut={this.zoomOut} />
            <Display stroke={stroke} />
            <Controls
              onStartQuiz={this.startOrRestart}
              running={this.state.finishedOnce}
            />
            {this.state.messages.map((message, index) => (
              <Message
                text={message.text}
                positive={message.positive}
                key={index}
              />
            ))}
            <Statistics
              remaining={this.state.remaining}
              mistakesInQuiz={this.state.mistakesInQuiz}
              mistakesInStroke={this.state.mistakesInStroke}
            />
          </>
        )}
        <Trigger onTrigger={this.toggleQuiz} active={this.state.open} />
      </WrapperView>
    );
  }
}

export { IWrapper, Wrapper };
