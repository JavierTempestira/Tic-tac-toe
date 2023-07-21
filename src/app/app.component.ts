import { Component } from '@angular/core';

interface IWinner {
  player: number;
  date: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  player: number = 1;
  playerWinner!: number;
  gameStatus !: 'play' | 'tie' | 'win';
  board !: number[];

  winnersBoard: IWinner[] = [];
  showScoreboard: boolean = false;



  constructor() {
    this.newGame();
    this.loadWinners();
  }

  newGame(){
    this.player = 1;
    this.gameStatus = 'play';
    this.playerWinner = 0;
    this.board = [0, 0, 0,
                  0, 0, 0,
                  0, 0, 0,]
  }

  selectCell(index: number){

    if (this.gameStatus !== 'play'){
       return;
    }

    if (this.board[index] !== 0) {
      return;
    }

     this.board[index] = this.player;
     this.player = this.player === 1 ? 2 : 1; //Esto es un if

     this.checkGameStatus();
  }

  checkGameStatus(){
    for (let i = 0; i < 9; i += 3){
     if (this.board[i] !== 0 &&
         this.board[i] === this.board[i + 1] &&
         this.board[i + 1] === this.board[i + 2]
         ) {
        this.setWinner(this.board[i]);
        return;
     }
    }

    for (let i = 0; i < 3; i++) {
      if(this.board[i] !== 0 &&
         this.board[i] === this.board[i + 3] &&
         this.board[i+3] === this.board[i+6]){
          this.setWinner(this.board[i]);
          return;
         }
    }

    if (this.board[0] !== 0 &&
        this.board[0] === this.board[4] &&
        this.board[0] === this.board[8]
        ){
          this.setWinner(this.board[0]);
          return;
         }

    if (this.board[2] !== 0 &&
    this.board[0] === this.board[4] &&
    this.board[0] === this.board[6]
    ){
    this.setWinner(this.board[2]);
    return;
    }

  if(this.board.indexOf(0) === -1){
    this.setTie();
  }

}

  setWinner(player: number){
    this.gameStatus = 'win';
    this.playerWinner = player;
    this.saveWinner;
  }

  setTie(){
    this.gameStatus = 'tie';
  }

  saveWinner() {
    const winner: IWinner = {
      player: this.playerWinner,
      date: new Date()
    };
    this.winnersBoard.push(winner);
    localStorage.setItem('winners', JSON.stringify(this.winnersBoard));
  }
  loadWinners(){
   const winners = localStorage.getItem('winners');
   if (winners) {
    this.winnersBoard = JSON.parse(winners);
   }
  }
}
