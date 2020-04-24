import React, { Component } from 'react';
import Food from './Food';
import './App.css';

const generateRandomSnakeFood = () => {
  let min = 1;
  let max = 99;
  let food = [min, max];
  food = [checkifEvenNumber(Math.floor(Math.random() * (max - min + 1)+ min)), checkifEvenNumber(Math.floor(Math.random() * (max - min + 1)+ min))];
  return food;
}

const checkifEvenNumber = (number) => {
  return number%2 === 0 ? number : number < 50 ? number +1 : number -1;
}

class App extends Component {
  state={
    begin: [
      [0,0],
      [2,0]
    ],
    direction: "RIGHT",
    speed: 200,
    food: generateRandomSnakeFood()
  }

  componentDidMount(){
    // this.generateRandomSnakeFood();
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(prevState){
    if(this.state.begin !== prevState.begin){
      this.checkIfOutOfBounds();
      // this.checkIfFoodisEat();
    }
  }

  checkIfFoodisEat = () => {
    let snake = [...this.state.begin];
    let head = snake[snake.length - 1];
    // console.log("food: "+ this.state.food);
    if(parseInt(head[0]) === parseInt(this.state.food[0]) && parseInt(head[1]) === parseInt(this.state.food[1])){
      return true;
    }else{
      return false;
    }
  }

  checkIfOutOfBounds = () => {
    let snake = [...this.state.begin];
    let head = snake[snake.length - 1];
    if(head[0] < 0 || head[0] >= 100 || head[1] < 0 || head[1] >= 100){
      alert("Game Over!.");
      this.setState({
        begin: [
          [0,0], [2,0]
        ],
        direction: "RIGHT",
        speed: 200
      })
    }
  }

  onKeyDown = (e) => {
    e = e || window.event;
    let direction = "RIGHT";
    switch(e.keyCode){
      case 40: direction = "DOWN"; break;
      case 37: direction = "LEFT"; break;
      case 38: direction = "UP"; break;
      case 39: direction = "RIGHT"; break;
    }
    this.setState({direction});
  }

  moveSnake = () => {
    let snake = [...this.state.begin];
    let head = snake[snake.length - 1];
    switch(this.state.direction){
      case 'RIGHT': head = [head[0]+2 , head[1]]; break;
      case 'DOWN': head = [head[0], head[1]+2]; break;
      case 'LEFT': head = [head[0]-2, head[1]]; break;
      case 'UP': head = [head[0], head[1]-2]; break;
    }
    snake.push(head);
    if(!this.checkIfFoodisEat()){
    snake.shift();
    }else{
      let currSpeed = this.state.speed - this.state.begin.length - 2 * 5;
      console.log("currSpeed: ", currSpeed);
      this.setState({
        food: generateRandomSnakeFood(),
        speed: currSpeed
      })
    }
    console.log("Speed: ", this.state.speed)
    this.setState({begin: snake})
  }

  render(){
    const {begin, direction} = this.state;
  return (
   <div className="Main">
    <div style={{position: 'absolute', top: '-5%'}}>Scores: {this.state.begin.length -2}</div>
     {
       this.state.begin.map((obj, i)=> {
        const style={
          left: obj[0]+"%", top: obj[1]+"%"
        }
        return(
          <div className="snake" key={i} style={style}></div>
        )
       }
       )
     }
     <Food food={this.state.food}/>
   </div>
  );
  }
}

export default App;
