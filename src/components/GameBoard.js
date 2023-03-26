import { useState } from 'react';
import {getContract} from '../services/CustomEthers.service';
import { ethers } from "ethers";

import './GameBoard.css';

const Player = ({ name, active = false }) => {
    return (
        <div className={`player ${active? 'active': ''}`}>{name}</div>
    )
}


const GameBoard = () => {
    const [board, setboard] = useState([Array(3).fill(''), Array(3).fill(''), Array(3).fill('')]);
    const [move, setmove] = useState('X');
    const [activePlayer, setactivePlayer] = useState('Player1');

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
        if(board[row][col]) return;
        let newBoard = [...board];
        newBoard[row][col] = move;
        move === 'X'? setmove('O'): setmove('X');
        setboard(newBoard);
        // change the active player
        activePlayer === 'Player1'? setactivePlayer('Player2'): setactivePlayer('Player1');
        getInfoFromContract();
    }

    async function getInfoFromContract(){
        const contract = getContract();
        let count = await contract.getCandidateCount();
        console.log('the count is::', count);
    }

    return (
        <div className='game_board_wrapper'>
            <div className="tic_tac_toe">
                <div className="Header">
                    Playing Tic Tac Toe
                </div>
                <div className="play_arena">
                    <div>
                        <Player name="Player1" active={activePlayer === 'Player1'}/>
                    </div>
                    <div className="board">
                        {renderTicTacToeBoard(board)}
                    </div>
                    <div>
                        <Player name="Player2" active={activePlayer === 'Player2'}/>
                    </div>
                </div>
            </div>
        </div>

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
    )
}

export default GameBoard;