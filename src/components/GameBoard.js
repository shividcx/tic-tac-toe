import { useState, useEffect, useLayoutEffect } from 'react';
import {getContract, getProvider} from '../services/CustomEthers.service';
import { ethers } from "ethers";

import './GameBoard.css';

const Player = ({ name, active = false }) => {
    return (
        <div className={`player ${active? 'active': ''}`}>{name}</div>
    )
}


const GameBoard = ({player1, player1Name, player2, player2Name, gameBoard = [Array(3).fill(''), Array(3).fill(''), Array(3).fill('')], primaryPlayer, turn}) => {
    const [board, setboard] = useState(gameBoard);
    const [move, setmove] = useState('X');
    const [activePlayer, setactivePlayer] = useState('');

    useEffect(() => {
     if(turn === primaryPlayer){
        primaryPlayer === player1 ? setactivePlayer('Player1'): setactivePlayer('Player2');
     }

    }, [])
    

    function renderTicTacToeBoard(arr) {
        return (
            arr.map((row, i) => {
                return (
                    <div key={i} className="row">
                        {row.map((col, j) => {
                            return (
                                <div key={j + i} className="col" onClick={()=>{handleClick(i,j)}}>{col}</div>)
                        })}
                    </div>
                )
            })
        )
    }

    function handleClick(row, col){
        console.log('comparing::', turn === primaryPlayer);
        if(board[row][col] || Number(turn) != Number(primaryPlayer)) return;

        const contract = getContract();
        contract.play(0, row, col);

        let newBoard = [...board];
        newBoard[row][col] = move;
        move === 'X'? setmove('O'): setmove('X');
        setboard(newBoard);
        // change the active player
        activePlayer === 'Player1'? setactivePlayer('Player2'): setactivePlayer('Player1');
    }

    return (
        <div className='game_board_wrapper'>
            <div className="tic_tac_toe">
                <div className="Header">
                    Playing Tic Tac Toe
                </div>
                <div className="play_arena">
                    <div>
                        <Player name={player1Name} active={activePlayer === 'Player1'}/>
                    </div>
                    <div className="board">
                        {renderTicTacToeBoard(board)}
                    </div>
                    <div>
                        <Player name={player2Name} active={activePlayer === 'Player2'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameBoard;


  // <div className='game_board_wrapper'>
        //     Tic Tac Toe shall be played here
        //     <br/>
        //     <div className="tic_tac_toe">
        //     <div className="row">
        //         <div className="col"></div>
        //         <div className="col"></div>
        //         <div className="col"></div>
        //     </div>
        //     <div className="row">
        //     <div className="col"></div>
        //         <div className="col"></div>
        //         <div className="col"></div>
        //     </div>
        //     <div className="row">
        //         <div className="col"></div>
        //         <div className="col"></div>
        //         <div className="col"></div>
        //     </div>
        //     </div>
        // </div>