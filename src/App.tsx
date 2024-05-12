import React from 'react';
import {useEffect,useState,useCallback} from 'react';

const gridSize = 20;
const intial_speed = 100;

enum Direction{
  Up,
  Down,
  Left,
  Right
}

interface Coordinate{
  x:number,
  y:number
}


const App: React.FC = () => {

  const [snake,setSnake] = useState<Coordinate[]>([{x:10,y:10}]);
  const [food,setFood] = useState<Coordinate>({x:5,y:5});
  const [gameover,setGameover] = useState<boolean>(false);
  const [direction,setDirection] = useState<Direction>(Direction.Right);
 //Not required since react will take care of speed // const [speed,Setspeed] = useState<number>(intial_speed);
  const [score,setScore] = useState<number>(0);

  useEffect(()=>{

    const handlekeyPress = (event:KeyboardEvent) =>{
      switch(event.key){
        case 'ArrowUp' :{
          setDirection(Direction.Up)
          break;
        }
        case 'ArrowDown':{
          setDirection(Direction.Down)
          break;
        }
        case 'ArrowRight':{
          setDirection(Direction.Right)
          break;
        }
        case 'ArrowLeft':{
          setDirection(Direction.Left)
          break;
        }

      }
    }

    document.addEventListener('keydown',handlekeyPress);

    return () => {
      document.removeEventListener('keydown',handlekeyPress)
    } 

  },[])


const moveSnake = useCallback(()=>{

  if(gameover) return;
  
  const newSnake = [...snake] 
  let newHead = {...newSnake[0]} 

  switch(direction){
    case Direction.Up:
      newHead.y--;
      break;
    case Direction.Down:
      newHead.y++;
      break;    
    case Direction.Right:
      newHead.x++;
      break;
    case Direction.Left:
      newHead.x--;
      break;
    default:
      break;
    }

//check if snake eats food or not 

if(newHead.x == food.x && newHead.y == food.y){
  setScore(score + 1);
  setFood({x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)})
}
else{
  newSnake.pop()
}

// check if it hits the wall or itself,gameover

const collision = newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y) 

if(newHead.x >= gridSize || newHead.x < 0 || newHead.y >= gridSize || newHead.y < 0 || collision){
    setGameover(true)
    return ;
  }
  newSnake.unshift(newHead)
  setSnake(newSnake)
  
},[snake,food,direction,gameover,score])

// to run this code 
useEffect(()=>{
  const interval = setInterval(moveSnake,intial_speed)

  return () => {
    clearInterval(interval);
  }

},[moveSnake,intial_speed])



return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor:"#242424"}}>
    <div style={{ textAlign: 'center', }}>
      <h1>{gameover ? 'Game Over' : 'Snake Game'}</h1>
      <h2>Score: {score}</h2>
      <div

      style={{
        width: `${gridSize * 20}px`,
        height: `${gridSize * 20}px`,
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {snake.map((segment, index) => (
        <div
          key={index}
          style={{
            width: '20px',
            height: '20px',
            background: 'white',
            position: 'absolute',
            left: `${segment.x * 20}px`,
            top: `${segment.y * 20}px`,
          }}
        />
      ))}
      <div
        style={{
          width: '20px',
          height: '20px',
          background: 'red',
          position: 'absolute',
          left: `${food.x * 20}px`,
          top: `${food.y * 20}px`,
        }}
      />
    </div>
  </div> 
  </div>
)
} 

export default App;





