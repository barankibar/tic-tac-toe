window.addEventListener('DOMContentLoaded', () => {

    // Declarations
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const info = document.querySelector('.info');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    // For end of the game
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    // For actions
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    // after action add players name on tile after that updateboard, check the result and change player
    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive){
            tile.innerHTML = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    // Checks for Results 

    // 0 - 1 - 2
    // 3 - 4 - 5
    // 6 - 7 - 8
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation(){
        let roundWon = false;
        
        for(let i = 0; i <= 7; i++){
            // Condition's array with 1 index
            const winningCondition = winningConditions[i];
            
            const a = board[winningCondition[0]];
            const b = board[winningCondition[1]];
            const c = board[winningCondition[2]];

            if(a === '' || b === '' || c === ''){
                continue;
            }
            
            if(a === b && b === c){
                roundWon = true;
                break;
            }
        }
        
        if(roundWon){
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            info.classList.add('hide');
            return;
        }

        if(!board.includes('')){
            announce(TIE);
            info.classList.add('hide');
        }
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerHTML = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerHTML = 'TIE';
        }
        announcer.classList.remove('hide');
    }

    const isValidAction = (tile) => {
        if(tile.innerHTML === 'X' || tile.innerHTML === 'O'){
            return false;
        }

        return true;
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
        info.classList.remove('hide');
        if(currentPlayer === 'O'){
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerHTML = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    resetButton.addEventListener('click',resetBoard);
});