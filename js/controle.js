let game = document.getElementById('jogo');

class JogoDaVelha {
    constructor(game) {
        this.game = game;
        this.board = [];
        this.winner = '-';

        this.state = 'playing';

        for (let i = 0; i < 9; i++)
            this.board[i] = '-';

        this.actualPlayer = 'x';

        this.circleIcon = `<svg style="width:90px;height:90px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </svg>`

        this.xIcon = `<svg style="width:90px;height:90px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>`
    }


    buildBoard() {
        for (let i = 0; i < 9; i++) {
            let el = `<div class="campo-jogo" id="campo_${i}"
            onclick="gameControl.play(${i})">
            </div>`

            game.innerHTML += el;
        }
    }


    play(position) {
        if (this.board[position] == '-' && this.state == 'playing') {
            this.board[position] = this.actualPlayer;
            let campo = document.getElementById('campo_' + position);

            if (this.actualPlayer == 'x')
                campo.innerHTML = this.xIcon;
            else
                campo.innerHTML = this.circleIcon;

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
                    this.updateState('win');
                    return;
            }

            // row
            if (this.board[0 + 3 * i] != '-'
                && (this.board[0 + 3 * i] == this.board[1 + 3 * i]
                && this.board[0 + 3 * i] == this.board[2 + 3 * i])) {
                    this.winner = this.board[0 + 3 * i];
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
                    this.updateState('win');
                    return;
        }
        // reversed
        if (this.board[2] != '-'
                && this.board[2] == this.board[4]
                && this.board[2] == this.board[6]) {
                    this.winner = this.board[2];
                    this.updateState('win');
                    return;
        }
    }


    updateState(state) {
        this.state = state;

        let status = document.getElementById('statusJogo');

        if (state == 'draw')
            status.innerHTML = 'Empate!';
        else if (state == 'playing')
            status.innerHTML = '';
        else if (state == 'win')
            status.innerHTML = 'Vitória de ' + this.winner;
    }


    restart() {
        for (let i = 0; i < 9; i++) {
            this.board[i] = '-';
            document.getElementById('campo_' + i).innerHTML = "";
        }

        this.actualPlayer = 'x';
        this.updateState('playing');
    }
}


let gameControl = new JogoDaVelha(game);

gameControl.buildBoard();