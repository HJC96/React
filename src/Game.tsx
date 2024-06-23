import React, { useState } from 'react';
import './styles.css';

// Square 컴포넌트의 props 타입 정의
interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

// Square 컴포넌트 정의
function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board 컴포넌트의 props 타입 정의
interface BoardProps {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: Array<string | null>) => void;
}

// Board 컴포넌트 정의
function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}



export default function Game() {
  // 게임 히스토리를 저장하는 상태
  const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
  // 현재 이동(턴) 번호를 저장하는 상태
  const [currentMove, setCurrentMove] = useState(0);
  // 현재 플레이어가 X인지 결정 (짝수 턴이면 X, 홀수 턴이면 O)
  const xIsNext = currentMove % 2 === 0;
  // 현재 게임 보드 상태
  const currentSquares = history[currentMove];

  // 플레이어가 움직임을 수행했을 때 호출되는 함수
  function handlePlay(nextSquares: Array<string | null>) {
    // 현재 이동까지의 히스토리에 새로운 보드 상태를 추가
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // 현재 이동을 새 히스토리의 마지막 인덱스로 설정
    setCurrentMove(nextHistory.length - 1);
  }

  // 특정 이동으로 점프하는 함수
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  // 이동 히스토리를 표시하는 버튼 목록 생성
  const moves = history.map((squares, move) => {
    let description: string;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// 승자를 계산하는 함수
function calculateWinner(squares: Array<string | null>): string | null {
  // 승리 조건을 나타내는 라인들
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // 모든 승리 조건을 확인
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // 세 칸이 모두 같은 플레이어로 채워져 있으면 해당 플레이어가 승자
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // 승자가 없으면 null 반환
  return null;
}