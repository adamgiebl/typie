(this.webpackJsonptyp=this.webpackJsonptyp||[]).push([[0],{11:function(t,n,e){t.exports=e.p+"static/media/giphy.940379d5.gif"},18:function(t,n,e){t.exports=e(29)},23:function(t,n,e){},29:function(t,n,e){"use strict";e.r(n);var a=e(0),i=e.n(a),r=e(7),o=e.n(r),s=(e(23),e(1)),c=e(2),u=e(8),l=e(9),h=e(14),p=e(10),d=e(15),f=e(11),m=e.n(f);function x(){var t=Object(s.a)(["\n  margin-top: 40px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"]);return x=function(){return t},t}function v(){var t=Object(s.a)(["\n  cursor: pointer;\n  padding: 12px 17px;\n  background: #D80032;\n  outline: 0;\n  border: none;\n  color: white;\n  font-size: 18px;\n  font-weight: bold;\n  float: right;\n  transition: all .3s;\n  box-shadow: 5px 5px 0px -1px #EDF2F4;\n  user-select: none;\n  &:focus, &:hover {\n    box-shadow: 3px 3px 0px -1px #EDF2F4;\n    background: #B7002A;\n  }\n"]);return v=function(){return t},t}function b(){var t=Object(s.a)(["\n  width: 600px;\n  height: 500px;\n"]);return b=function(){return t},t}function g(){var t=Object(s.a)(["\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  animation: "," .2s linear;\n  z-index: -1;\n"]);return g=function(){return t},t}function y(){var t=Object(s.a)(["\n  from {\n    opacity: 0\n  }\n  to {\n    opacity: 1;\n  }\n"]);return y=function(){return t},t}function w(){var t=Object(s.a)(["\n    font-size: 30px;\n    font-weight: bold;\n    padding: 0 5px;\n    background: #2B2D42;\n"]);return w=function(){return t},t}function E(){var t=Object(s.a)(["\n  margin-bottom: 40px;\n"]);return E=function(){return t},t}function j(){var t=Object(s.a)(["\n  margin-top: 0px;\n  font-weight: bold;\n  user-select: none;\n"]);return j=function(){return t},t}function k(){var t=Object(s.a)(["\n  color: #2B2D42;\n  background: #EDF2F4;\n  padding: 20px;\n  letter-spacing: 1px;\n  font-size: 18px;\n  font-weight: bold;\n  box-shadow: 0 0 0 15px #EDF2F4;\n  span { position: relative; }\n  span:first-child:before {\n    content: ",";\n    position: absolute;\n    left: -6px;\n    font-size: 20px;\n    top: -2px;\n    animation: 1s "," step-end infinite;\n  }\n"]);return k=function(){return t},t}function O(){var t=Object(s.a)(["\n  from, to {\n    color: transparent;\n  }\n  50% {\n    color: black;\n  }\n"]);return O=function(){return t},t}var F=function(t){function n(){var t,e;Object(u.a)(this,n);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(e=Object(h.a)(this,(t=Object(p.a)(n)).call.apply(t,[this].concat(i)))).state={text:[],wpm:0,showKanye:!1,started:!1},e.body=document.getElementsByTagName("body")[0],e.letters=[],e.canvas=0,e.canvasW=0,e.canvasH=0,e.ctx=0,e.index=0,e.timer=!1,e.start=0,e.wordCount=0,e.end=!1,e}return Object(d.a)(n,t),Object(l.a)(n,[{key:"charTyped",value:function(t){var n=this.state;this.end||(this.timer||this.startTimer(),t.key===n.text[this.index].props.children&&(document.getElementById(this.index).classList.add("g"),this.floatLetter(n.text[this.index].props.children),this.index=++this.index,console.log(this.state.text)),this.index===n.text.length&&this.endTimer())}},{key:"floatLetter",value:function(t){this.letters.push({char:t,positionY:0,positionX:Math.floor(Math.random()*this.canvasW)})}},{key:"float",value:function(){var t=this;this.ctx.clearRect(0,0,this.canvasW,this.canvasH),this.letters&&this.letters.forEach((function(n){n.positionY+=1,t.ctx.fillText(n.char,n.positionX,n.positionY)}))}},{key:"startTimer",value:function(){var t=this;this.timer=!0,this.start=performance.now(),setInterval((function(){return t.float()}),10),this.setState({started:!0})}},{key:"endTimer",value:function(){var t=(performance.now()-this.start)/1e3/60,n=this.charCount/5/t;this.setState({wpm:Math.floor(n),showKanye:!0}),this.end=!0}},{key:"componentDidMount",value:function(){var t=this;this.canvas=document.getElementById("canvas"),this.canvasW=document.body.clientWidth,this.canvasH=document.body.clientHeight,this.canvas.width=this.canvasW,this.canvas.height=this.canvasH,this.ctx=this.canvas.getContext("2d"),this.ctx.font="bold 80px Baloo Bhai",this.ctx.fillStyle="#91b7f7",document.addEventListener("keydown",(function(n){return t.charTyped(n)})),fetch("https://api.kanye.rest").then((function(t){return t.json()})).then((function(n){var e=n.quote;t.setState({text:e.split("").map((function(t,n){return i.a.createElement("span",{id:n,key:n},"".concat(t))}))}),t.charCount=e.split("").length,console.log(t.state.text)}))}},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("canvas",{id:"canvas"}),i.a.createElement(A,null,i.a.createElement(W,null,"Type this Kanye West quote:"),i.a.createElement(T,{started:this.state.started},this.state.text),i.a.createElement(K,null,i.a.createElement(D,null,0!==this.state.wpm&&i.a.createElement(i.a.Fragment,null,"Your wpm is:"," ",i.a.createElement(C,null,this.state.wpm))),i.a.createElement(I,{onClick:function(){return window.location.reload()}},"New quote"))),this.state.showKanye&&i.a.createElement(H,{src:m.a}))}}]),n}(a.Component),B=Object(c.b)(O()),T=c.a.div(k(),(function(t){return t.started?"''":"'|'"}),B),D=c.a.div(j()),W=c.a.h1(E()),C=c.a.span(w()),z=Object(c.b)(y()),H=c.a.img(g(),z),A=c.a.div(b()),I=c.a.button(v()),K=c.a.div(x()),L=F;function M(){var t=Object(s.a)(["\n  height: 100vh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);return M=function(){return t},t}var N=c.a.div(M()),S=function(){return i.a.createElement(N,{className:"App"},i.a.createElement("header",{className:"App-header"}),i.a.createElement(L,null))};o.a.render(i.a.createElement(S,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.022aed54.chunk.js.map