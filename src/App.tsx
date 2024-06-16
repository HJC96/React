import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles.css'
import { useState } from 'react';

interface SquareProps {
  value: string;
  onSquareClick: () => void;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(''));

  function handleClick() {
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }
  
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => {}} />
        <Square value={squares[1]} onSquareClick={() => {}} />
        <Square value={squares[2]} onSquareClick={() => {}} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => {}} />
        <Square value={squares[4]} onSquareClick={() => {}} />
        <Square value={squares[5]} onSquareClick={() => {}} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => {}} />
        <Square value={squares[7]} onSquareClick={() => {}} />
        <Square value={squares[8]} onSquareClick={() => {}} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }: SquareProps) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}