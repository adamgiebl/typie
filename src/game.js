import React, { Component } from "react";
import styled from "styled-components";

class Game extends Component {
  state = {
    text: [],
    wpm: 0,
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
  }

  endTimer() {
    const end = performance.now();
    const time = (end - this.start) / 1000 / 60;
    const wordCount = this.charCount / 5;
    const wpm = wordCount / time;
    this.setState({ wpm: Math.floor(wpm) });
    this.end = true;
  }

  componentDidMount() {
    this.canvas = document.getElementById("canvas");
    this.canvasW = document.body.clientWidth;
    this.canvasH = document.body.clientHeight;
    this.canvas.width = this.canvasW;
    this.canvas.height = this.canvasH;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "cornflowerblue";
    this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
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
          <h2>Type this Kanye West quote:</h2>
          <Text>{this.state.text}</Text>
          <Wpm>
            {this.state.wpm !== 0 && (
              <>
                Your wpm is:{' '}
                <Large>{this.state.wpm}</Large>
              </>
            )}
          </Wpm>
        </GameContainer>
      </>
    );
  }
}

const Text = styled.div`
  color: #01172f;
  background: lavender;
  padding: 15px;
  letter-spacing: 1px;
  font-weight: bold;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Wpm = styled.div`
  margin-top: 20px;
`;

const Large = styled.span`
    font-size: 30px;
    font-weight: bold;
    padding: 0 5px;
    background: midnightblue;
`

const GameContainer = styled.div`
  width: 600px;
  height: 500px;
`;

export default Game;
