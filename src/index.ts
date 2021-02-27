import * as CryptoJS from "crypto-js";

// 블록만들기
class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "20202020", "", "hello", 123456);

let blockChain: Array<Block> = [genesisBlock];

console.log(blockChain);

export {}