import { ethers } from "ethers";

let provider = null;
let contract = null;

const CONTRACT_ADDRESS = '0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44';
const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_gameid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            }
        ],
        "name": "GameCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_gameid",
                "type": "uint256"
            }
        ],
        "name": "GameDraw",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_gameid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "player1",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "player2",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_turn",
                "type": "address"
            }
        ],
        "name": "GameStarted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_gameid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "playedBy",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "r",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "c",
                "type": "uint256"
            }
        ],
        "name": "Move",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_gameid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "winner",
                "type": "address"
            }
        ],
        "name": "WinnerDecleared",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_paytoken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_betamount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_timelimit",
                "type": "uint256"
            }
        ],
        "name": "addRoomType",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "games",
        "outputs": [
            {
                "internalType": "address",
                "name": "player1",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "player1Name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "player2",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "player2Name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "turn",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isRunning",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "roomInfo",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_gameId",
                "type": "uint256"
            }
        ],
        "name": "getGame",
        "outputs": [
            {
                "internalType": "address",
                "name": "player1",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "player1Name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "player2",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "player2Name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "turn",
                "type": "address"
            },
            {
                "internalType": "uint256[3][3]",
                "name": "board",
                "type": "uint256[3][3]"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isRunning",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_roomid",
                "type": "uint256"
            }
        ],
        "name": "getRoomInfo",
        "outputs": [
            {
                "internalType": "address",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_betAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_timelimit",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRoomTypeCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "count",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getUserActiveGame",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_gameId",
                "type": "uint256"
            }
        ],
        "name": "getWinner",
        "outputs": [
            {
                "internalType": "address",
                "name": "_winner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_gameId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_player",
                "type": "address"
            }
        ],
        "name": "isWinner",
        "outputs": [
            {
                "internalType": "bool",
                "name": "winner",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_roomid",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "joinGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_gameId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_r",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_c",
                "type": "uint256"
            }
        ],
        "name": "play",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "roomInfo",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "payToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "betAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timelimit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "game",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "watingForPlayer",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
/**
 * we will get access to provider and contract in all the components without reinitialization
 */
export const initEthers = async() => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

export const getProvider = () => provider;
export const getContract = () => contract;