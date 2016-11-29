import React from 'react';
const { Component } = React;
class Block extends Component {
   render() {
    const { index, title} = this.props;
    
    const blockclass  = "block block"+title;
    return (
        <div className={blockclass}>
           {title}
        </div>
      );
    }
}


class App2048 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      previous:[],
      key:"",
      score: 0,
      prescore: 0,

    };
    this.intialgame();
    
  }
  componentDidMount() {
    
    this.handlekey(); 
  }
  reset(){
    this.state.previous = [];
    this.state.blocks = [];
    this.state.score = 0;
    this.state.prescore = 0;
    this.updateState();
  }
  intialgame(){
    this.reset();
    for (let i = 0; i < 16; i++){
      this.state.blocks.push({val : 0});
      this.state.previous.push({val : 0});
    }  
    this.updateState();
    this.newblock();
  }
  updateState() {
    this.setState({
      blocks: this.state.blocks,
      score: this.state.score,
      prescore: this.state.prescore,
      previous: this.state.previous
    })
  }

  handlekey(){

    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if (keyName=="ArrowDown")
        this.state.key = "D";
      else if (keyName=="ArrowUp")
        this.state.key = "U";
      else if (keyName=="ArrowLeft")
        this.state.key = "L";
      else if (keyName=="ArrowRight")
        this.state.key = "R";
      this.updateState();
      this.move();
     }, false);
  }
  handlerefresh(){
    this.intialgame()
    
  }
  handlerepeat(){
   
    this.state.blocks = this.state.previous.slice();
    this.state.score = this.state.prescore;
    this.updateState();

  }
  
  
  move(){
    let j;
    const {key, blocks,score} = this.state;
    this.state.prescore = score;
    this.updateState();
    console.log(this.state.previous[12].val);
    switch(key){
      case 'U':
        for(let i = 4; i < 16; i++){
          j = i;
          while(j >= 4){
            this.merge(j-4, j);
              j -= 4;
          }
        }
        break;
      case 'D':
        for(let i = 11; i >= 0; i--){
          j = i;
          while(j <= 11){
            this.merge(j + 4, j);
            j += 4;
          }
        }
        break;
      case 'L':
        for(let i = 1; i < 16; i++){
            j = i;
            while(j % 4 != 0){
              this.merge(j - 1, j);
              j -= 1;
            }
        }
        break;
      case 'R':
       for(let i = 14; i >= 0; i--){
          j = i;
          while(j % 4 != 3){
            this.merge(j + 1, j);
            j += 1;
          }
        }
        break;
    };
    this.state.previous = this.state.blocks.slice();
    this.newblock();
  }

  merge(Summand, Addend) {
    const { blocks  } = this.state;
      if(blocks[Addend].val != 0){
        if(blocks[Summand].val == 0){
          blocks[Summand].val =  blocks[Addend].val;
          blocks[Addend].val = 0;
        }
        else if(blocks[Summand].val == blocks[Addend].val){
          blocks[Summand].val =  2*blocks[Summand].val;
          blocks[Addend].val = 0;
          this.state.score += blocks[Summand].val;
        }
      }
    this.updateState();

  }
  newblock(){
    const {blocks} = this.state;
    let temp = 0;
    do{
      temp = parseInt(15*Math.random());
    } while(blocks[temp].val !== 0)
    blocks[temp].val = 2;
    this.updateState();
  }
  renderBlock(item, i) {
    return (

      <Block
        index={i}
        title={item.val}
      />
    );
  }
  render() {
    const {blocks , score} = this.state;
    return (
      <div className="myapp">
        <div className="title">
           <div className="name">2048</div>
           <div className="score">score</div>
           <div className="score2">{score}</div>
           <div className="icon">
            <span className="glyphicon glyphicon-refresh" onClick = {this.handlerefresh.bind(this)}></span>
            <span className="glyphicon glyphicon-repeat" onClick = {this.handlerepeat.bind(this)}></span>
           </div>
        </div> 
        <div className="puzzle">
          {blocks.map(this.renderBlock, this)}
        </div>

      </div>
    );
  }
}



export default App2048;
