import { Component, OnInit } from '@angular/core';
import { board } from '../models/board';
import { cell } from '../models/cell';

import { ship } from './../models/ship';
import * as Constants from './../constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  computersBoard;
  playersBoard;

  constructor() { }

  ngOnInit() {
    this.playersBoard = this.setupBoard(this.playersBoard);
    this.computersBoard = this.setupBoard(this.computersBoard);
    this.placeComputersShips();
  }

  setupBoard: (board: any) => [][] = (board: any) => {
    board = new Array(3);
    for(let column = 0; column < board.length; column++){
      board[column] = new Array(3);
      for(let row = 0; row < board[column].length; row++){
        board[column][row] = new cell(false, false)
      }
    }
    return board;
  }

  onAttack: (cell: cell) => void = (cell: cell) => {
    cell.hit = true;

    let t = cell;
  }

  placeComputersShips: () => void = () => {
    const ships = this.createShips();    
    for(let i = 0; i < ships.length; i++){
        const coordinates = this.getInitCoordinate();
        const row = coordinates.row;
        const column = coordinates.column;

        const vertical = this.getRandomPosition();
        let num = 1;
        for(let y = 1; y < ships[i].length; y++) {
          if(vertical){
            // if the ship goes off the board
            if(column + y === this.computersBoard.length){
              this.computersBoard[column - num][row].shipPlaced = true;
              num =- num;
            }
            this.computersBoard[column + y][row].shipPlaced = true;
          }else{
            if(row + y === this.computersBoard.length){
              this.computersBoard[column][row - num].shipPlaced = true;
              num =- num;
            }
            this.computersBoard[column][row + y].shipPlaced = true;
          }
        }
    }
  }

  getInitCoordinate: () => any = () => {
    let column: number;
    let row: number;

    let coordinateOccupied = true;
    while(coordinateOccupied){
      column = this.getRandomCoordinate();
      row = this.getRandomCoordinate();
      if(!this.computersBoard[column][row].shipPlaced){
        this.computersBoard[column][row].shipPlaced = true;
        coordinateOccupied = false;
      }
    }
    return {column, row};
  }

  getRandomCoordinate: () => number = () => {
    // this will determine the initial starting coordinate for each ship
    const min = 0;
    const max = Math.floor(this.computersBoard.length - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomPosition: () => boolean = () => {
    // this will determine if we place the ship vertically or horizontally
    const num = Math.round(Math.random());
    return num ? true : false;
  }

  createShips: () => Array<ship> = () => {
    const ships = [
      new ship([], Constants.SHIP_LENGTH.SMALL_SHIP),
      new ship([], Constants.SHIP_LENGTH.SUBMARINE),
      new ship([], Constants.SHIP_LENGTH.DESTROYER),
      new ship([], Constants.SHIP_LENGTH.BATTLE_SHIP),
      new ship([], Constants.SHIP_LENGTH.AIRCRAFT_CARRIER),    
    ];
    return ships;
  }


}
