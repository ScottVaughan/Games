export interface Iship {
    position: [];
    length: number;
}

export class ship implements Iship {
    position;
    constructor(public positon: [], public length: number) {}
}