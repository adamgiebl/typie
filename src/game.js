import React, { Component } from "react";
import kanye from "./giphy.gif"
import styled, { keyframes } from "styled-components";

class Game extends Component {
  state = {
    text: [],
    wpm: 0,
    showKanye: false,
    started: false
  };

  body = document.getElementsByTagName('body')[0];
  letters = [];
  canvas = 0;
  canvasW = 0;
  canvasH = 0;
  ctx = 0;
  index = 0;
  timer = false;
  start = 0;
  wordCount = 0;
  end = false;

  charTyped(e) {
    const state = this.state;
    if (!this.end) {
      if (!this.timer) {
        this.startTimer();
      }
      if (e.key === state.text[this.index].props.children) {
        document.getElementById(this.index).classList.add('g');
        this.floatLetter(state.text[this.index].props.children);
        this.index = ++this.index;
        console.log(this.state.text);
      }
      if (this.index === state.text.length) {
        this.endTimer();
      }
    }
  }

  floatLetter(letter) {
    this.letters.push({
      char: letter,
      positionY: 0,
      positionX: Math.floor(Math.random() * this.canvasW)
    });
  }

  float() {
    this.ctx.clearRect(0,0, this.canvasW, this.canvasH);
    if (this.letters) {
      this.letters.forEach(letter => {
        letter.positionY += 1;
        this.ctx.fillText(letter.char, letter.positionX, letter.positionY);
      }); 
    }
  }

  startTimer() {
    this.timer = true; 
    this.start = performance.now();
    setInterval(() => this.float(), 10);
    this.setState({ started: true })
  }

  endTimer() {
    const end = performance.now();
    const time = (end - this.start) / 1000 / 60;
    const wordCount = this.charCount / 5;
    const wpm = wordCount / time;
    this.setState({ wpm: Math.floor(wpm), showKanye: true });
    this.end = true;
  }

  componentDidMount() {
    this.canvas = document.getElementById("canvas");
    this.canvasW = document.body.clientWidth;
    this.canvasH = document.body.clientHeight;
    this.canvas.width = this.canvasW;
    this.canvas.height = this.canvasH;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "bold 80px Baloo Bhai";
    this.ctx.fillStyle = "#91b7f7";
    document.addEventListener("keydown", e => this.charTyped(e));
    fetch("https://api.kanye.rest")
      .then(res => res.json())
      .then(({ quote }) => {
        this.setState({
          text: quote.split("").map((letter, index) => (
            <span id={index} key={index}>{`${letter}`}</span>
          ))
        });
        this.charCount = quote.split("").length;
        console.log(this.state.text)
      });
    
    
  }
  render() {
    return (
      <>
        <canvas id="canvas"></canvas>
        <GameContainer>
          <Heading>Type this Kanye West quote:</Heading>
          <Text started={this.state.started}>{this.state.text}</Text>
          <Flex>
            <Wpm>
              {this.state.wpm !== 0 && (
                <>
                  Your wpm is:{' '}
                  <Large>{this.state.wpm}</Large>
                </>
              )}
            </Wpm>
            <ReloadButton onClick={()=> window.location.reload()}>New quote</ReloadButton>
          </Flex>
        </GameContainer>
        {this.state.showKanye && 
          <KanyeImg src={kanye} />
        }
      </>
    );
  }
}

const blink = keyframes`
  from, to {
    color: transparent;
  }
  50% {
    color: black;
  }
`

const Text = styled.div`
  color: #2B2D42;
  background: #EDF2F4;
  padding: 20px;
  letter-spacing: 1px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 0 0 15px #EDF2F4;
  span { position: relative; }
  span:first-child:before {
    content: ${(props) => props.started ? "''" : "'|'"};
    position: absolute;
    left: -6px;
    font-size: 20px;
    top: -2px;
    animation: 1s ${blink} step-end infinite;
  }
`;

const Wpm = styled.div`
  margin-top: 0px;
  font-weight: bold;
  user-select: none;
`;

const Heading = styled.h1`
  margin-bottom: 40px;
`

const Large = styled.span`
    font-size: 30px;
    font-weight: bold;
    padding: 0 5px;
    background: #2B2D42;
`

const comeUp = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1;
  }
`;

const KanyeImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  animation: ${comeUp} .2s linear;
`

const GameContainer = styled.div`
  width: 600px;
  height: 500px;
`;

const ReloadButton = styled.button`
  cursor: pointer;
  padding: 12px 17px;
  background: #D80032;
  outline: 0;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  float: right;
  transition: all .3s;
  box-shadow: 5px 5px 0px -1px #EDF2F4;
  user-select: none;
  &:focus, &:hover {
    box-shadow: 3px 3px 0px -1px #EDF2F4;
    background: #B7002A;
  }
`

const Flex = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default Game;
