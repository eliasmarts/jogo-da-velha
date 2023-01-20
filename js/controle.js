

class JogoDaVelhaControle {
    constructor() {
        this.board = [];
        this.winner = '-';
        this.winnerTiles = [];

        this.state = 'playing';

        for (let i = 0; i < 9; i++)
            this.board[i] = '-';

        this.actualPlayer = 'x';
    }


    canPlay(position) {
        return this.board[position] == '-' && this.state == 'playing';
    }


    play(position) {
        if (this.canPlay(position)) {
            this.board[position] = this.actualPlayer;

            this.switchPlayer();

            this.checkState();
        }
    }


    switchPlayer() {
        if (this.actualPlayer == 'x') {
            this.actualPlayer = 'o'
        }
        else {
            this.actualPlayer = 'x';
        }
    }


    checkState() {
        // check draw
        if (this.board.lastIndexOf('-') == -1) {
            this.updateState('draw');
        }

        // check win
        for (let i = 0; i < 3; i++) {
            // column
            if (this.board[0 + i] != '-'
                && (this.board[0 + i] == this.board[3 + i]
                && this.board[0 + i] == this.board[6 + i])) {
                    this.winner = this.board[0 + i];
                    this.winnerTiles = [0 + i, 3 + i, 6 + i];
                    this.updateState('win');
                    return;
            }

            // row
            if (this.board[0 + 3 * i] != '-'
                && (this.board[0 + 3 * i] == this.board[1 + 3 * i]
                && this.board[0 + 3 * i] == this.board[2 + 3 * i])) {
                    this.winner = this.board[0 + 3 * i];
                    this.winnerTiles = [0 + 3 * i, 1 + 3 * i, 2 + 3 * i];
                    this.updateState('win');
                    return;
            }
        }

        // diagonals
        // main
        if (this.board[0] != '-'
                && this.board[0] == this.board[4]
                && this.board[0] == this.board[8]) {
                    this.winner = this.board[0];
                    this.winnerTiles = [0, 4, 8];
                    this.updateState('win');
                    return;
        }
        // reversed
        if (this.board[2] != '-'
                && this.board[2] == this.board[4]
                && this.board[2] == this.board[6]) {
                    this.winner = this.board[2];
                    this.winnerTiles = [2, 4, 6];
                    this.updateState('win');
                    return;
        }
    }


    updateState(state) {
        this.state = state;
    }


    restart() {
        for (let i = 0; i < 9; i++) {
            this.board[i] = '-';
        }

        this.actualPlayer = 'x';
        this.updateState('playing');
        this.winnerTiles = [];
    }
}


/* ################################################ */


class JogoDaVelhaView {
    constructor(gameHTML) {
        this.gameControl = new JogoDaVelhaControle();
        this.gameHTML = gameHTML;

        this.circleIcon = `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </svg>`

        this.xIcon = `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>`
    }


    play(position) {
        this.gameControl.play(position);
        this.updateView();
    }


    buildBoard() {
        for (let i = 0; i < 9; i++) {
            let el = `<div class="campo-jogo" id="campo_${i}"
            onclick="gameView.play(${i})">
            </div>`

            this.gameHTML.innerHTML += el;
        }
    }


    updateView() {
        this.updateTiles();
        this.updateState();
    }


    updateTiles() {
        for (let i = 0; i < 9; i++) {
            let campo = document.getElementById('campo_' + i);
            if (this.gameControl.board[i] == 'x')
                campo.innerHTML = this.xIcon;
            else if (this.gameControl.board[i] == 'o')
                campo.innerHTML = this.circleIcon;
            else
                campo.innerHTML = "";
        }
    }


    updateState() {
        let status = document.getElementById('statusJogo');
        let state = this.gameControl.state;

        if (state == 'draw')
            status.innerHTML = 'Empate!';
        else if (state == 'playing')
            status.innerHTML = '';
        else if (state == 'win') {
            status.innerHTML = 'Vitória de ' + this.gameControl.winner;
            this.colorWinnerTiles();
        }
    }


    colorWinnerTiles() {
        for (let i = 0; i < this.gameControl.winnerTiles.length; i++) {
            let campo = document.getElementById('campo_' + this.gameControl.winnerTiles[i]);
            campo.style.backgroundColor = 'green';
        }
    }


    restartTiles() {
        for (let i = 0; i < 9; i++) {
            let campo = document.getElementById('campo_' + i);
            campo.style.backgroundColor = 'lightsalmon';
        }
    }


    start() {
        this.buildBoard();
    }


    restart() {
        this.gameControl.restart();
        this.restartTiles();
        
        this.updateView();

    }
}

let game = document.getElementById('jogo');

let gameView = new JogoDaVelhaView(game);

gameView.start();