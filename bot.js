const ethers = require('ethers');

const addresses = {
    WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
}

const swapPancakeAbi = ['function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'];

const provider = new ethers.providers.WebSocketProvider("${API-PROVIDER-HERE-USING-WWS}")


//const honeyCheck = new ethers.Contract(addresses.honeyAddress, honeyABI, provider);
const factory = new ethers.Contract( addresses.factory, ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'], provider);

factory.on("PairCreated", async (token0, token1, addressPair) => {
    const symbolName = new ethers.Contract(addressPair, ['function symbol() external pure returns (string memory)'], provider);
    if(token0 === addresses.WBNB){
        token0 = 'WBNB';
        const token1 = await symbolName.methods.symbol().call();
        
    console.log(`
    ~~~~~~~~~~~~~~~~~~
    New pair detected
    ~~~~~~~~~~~~~~~~~~
    token0: ${token0}
    token1: ${token1}
    addressPair: ${addressPair}
    `);
    }

    else if(token1 === addresses.WBNB){
        token1 = 'WBNB';
        const token0 = await symbolName.methods.symbol().call();

    console.log(`
    ~~~~~~~~~~~~~~~~~~
    New pair detected
    ~~~~~~~~~~~~~~~~~~
    token0: ${token0}
    token1: ${token1}
    addressPair: ${addressPair}
    `);
    } 

    else {
        console.log('This is not a BNB pair!')
    }

});
