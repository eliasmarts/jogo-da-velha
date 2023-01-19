let game = document.getElementById('jogo');

class JogoDaVelha {
    constructor(game) {
        this.game = game;
        this.board = [];
        for (let i = 0; i < 9; i++)
            this.board[i] = '-';

        this.actualPlayer = 'x';


        this.circleIcon = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </svg>`
        this.xIcon = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>`
    }


    buildBoard() {
        for (let i = 0; i < 9; i++) {
            let el = `<div class="campo-jogo" id="campo_${i}"
            onclick="gameControl.play(${i})">
            oi
            </div>`

            game.innerHTML += el;
        }
    }


    play(position) {
        this.board[position] = this.actualPlayer;
        let campo = document.getElementById('campo_' + position);

        if (this.actualPlayer == 'x')
            campo.innerHTML = this.xIcon;
        else
            campo.innerHTML = this.circleIcon;
    }
}


let gameControl = new JogoDaVelha(game);

gameControl.buildBoard();