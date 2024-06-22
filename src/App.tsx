import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles.css'
import { useState } from 'react';

// Square 컴포넌트의 props 타입 정의
interface SquareProps {
  value: string;
  onSquareClick: () => void;
}

// Board 컴포넌트 정의
export default function Board() {
  // 게임 보드의 상태를 관리하는 state
  // 9개의 빈 문자열로 초기화된 배열
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
  // 현재 플레이어가 X인지 여부를 관리하는 state
  const [xIsNext, setXIsNext] = useState(true);

  // square 클릭 시 호출되는 함수
  function handleClick(i: number) {
    // 이미 채워진 칸이거나 승자가 결정된 경우 클릭 무시
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // squares 배열의 복사본 생성
    const nextSquares = squares.slice();
    // 클릭된 square의 값을 현재 플레이어("X" 또는 "O")로 설정
    nextSquares[i] = xIsNext ? "X" : "O";
    // squares 상태 업데이트
    setSquares(nextSquares);
    // 다음 플레이어로 턴 변경
    setXIsNext(!xIsNext);
  }

  // 승자 계산
  const winner: string | null = calculateWinner(squares);
  // 게임 상태 메시지
  let status: string;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      {/* 게임 상태 표시 */}
      <div className="status">{status}</div>
      {/* 게임 보드 렌더링 */}
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

// 승자를 계산하는 함수
function calculateWinner(squares: string[]): string | null {
  // 승리 조건을 나타내는 배열
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // 모든 승리 조건을 검사
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

// Square 컴포넌트 정의
function Square({ value, onSquareClick }: SquareProps) {
  // 버튼을 렌더링하고 onClick 이벤트에 onSquareClick 함수 할당
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}