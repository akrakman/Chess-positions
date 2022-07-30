import { useRef, useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './App.css'
import axios from 'axios';

var game1num = 0;
var game2num = 0;
export default function PlayVsPlay({ boardWidth }) {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [game2, setGame2] = useState(new Chess());
  const [fen, setFen] = useState('1q4k1/1pR3p1/p1bPNn1p/2P2p2/3Q4/P6P/1P3PP1/6K1 w - -');
  
  
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    fetch('/chess').then(res => res.json()).then(data => {
      setFen(data.first);
      console.log(data);
    });
  }, []);
  
  const getNum = () => {
    const num = getRandom(0, fen.length - 1);
    //console.log(num);
    return num;
  }

  const get = (num1, num2) => {
    game1num = num1;
    game2num = num2;
  }

  function safeGameMutate1(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }
  function safeGameMutate2(modify) {
    setGame2((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });
    setGame(gameCopy);
    return move;
  }
  
  /*const link = () => {
    window.open('https://lichess.org/analysis/' + fen[globalnum].replace(" ", "_"));
  }*/

  function handlePostQuery(query) {
    var myParams = {
      data: query
    }
    if (query !== "") {
      axios.post('http://127.0.0.1:5000/api/query', myParams)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      alert("Query empty");
    }
  }

  return (
    <div className="container">
      <div className='board-container'>
        <p>Which game position do you prefer? Reset both games before selecting again!</p>
        <div className="inline">
          <Chessboard
          className="board1"
          id="FirstBoard"
          animationDuration={200}
          boardWidth={boardWidth}
          position={game.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 0px 5px rgba(0, 0, 0, 0.5)'
          }}
          ref={chessboardRef}
        />
        <button type='button' className='btn1' onClick={() => {
          console.log('game1num ' + game1num);
          handlePostQuery([game1num, fen[game1num]]);
        }}>Select Game 1</button>
        </div>
        <div className="inline">
          <Chessboard
          className="board2"
          id="SecondBoard"
          animationDuration={200}
          boardWidth={boardWidth}
          position={game2.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 0px 5px rgba(0, 0, 0, 0.5)'
          }}
          ref={chessboardRef}
        />
        <button type='button' className='btn2' onClick={() => {
          safeGameMutate2((game) => {
            //game2num = getNum();
            //const num = getNum();
            console.log('g2num ' + game2num);
            //game.load(fen[game2num]);
            handlePostQuery([game2num, fen[game2num]]);
          });
        }}>Select Game 2</button>
        </div>
      </div>
        <div className='reset-button'>
          <button type='button' className='btn3' onClick={() => {
            get(getNum(), getNum());
            console.log('g1 ' + game1num, 'g2 ' + game2num);
            safeGameMutate1((game) => {
              game.load(fen[game1num]);
            });
            safeGameMutate2((game2) => {
              game2.load(fen[getNum()]);
            });
          }}>Reset Both Games</button>
        </div>
        {/*<button className='btn' onClick={link}>Open Lichess Analysis</button>
        <button className='btn' onClick={link}>Open Lichess Analysis</button>*/}
      <button> 
        <a href='http://127.0.0.1:5000/api/query' download>link</a>
      </button>
    </div>
  );
}