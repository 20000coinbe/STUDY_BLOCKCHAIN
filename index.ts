import * as cryptoJS from 'crypto-js';

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (index: number, previousHash: string, data: string, timestamp: number): string => {
        return cryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    }

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === 'number' &&     
        typeof aBlock.hash === 'string' && 
        typeof aBlock.data === 'string' && 
        typeof aBlock.previousHash === 'string' && 
        typeof aBlock.timestamp === 'number';

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }


}

const genesisBlock: Block = new Block(0, "20202020", "", "Hello", 123456);

// 블록체인은 블록의 연결 : 배열를 사용해보자

let blockChain: Array<Block> = [genesisBlock];

const getBlockchain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1]

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimeStamp);
    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};

const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(
    aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp
);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.hash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true
    }
};

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};



createNewBlock("second block");
createNewBlock("three block");
createNewBlock("four block");

console.log(blockChain);
