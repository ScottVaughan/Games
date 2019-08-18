export interface Iboard{
    
}

export class board implements Iboard {
    constructor(public coordinate: string, public hit: boolean) {}
}