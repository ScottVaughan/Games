export interface ICell{
    shipPlaced: boolean;
    hit: boolean;
}

export class cell implements ICell {
    constructor(
        public shipPlaced: boolean, 
        public hit: boolean) {}
}