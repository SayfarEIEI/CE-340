//const WEB3_URL = "http://127.0.0.1:9545/"
const WEB3_URL = "ws://127.0.0.1:8545/"
let web3,accounts,balances;

async function getAccounts(){
    if(!window.ethereum){//Truffle Develop
        accounts = await web3.eth.getAccounts()
        if(!Array.isArray(accounts)|| accounts.length <= 0){
            throw new Error('ERROR:Unable to get account information')
        }
    }
}
async function getBalances(){
   balances = []
   for(let account of accounts){
        balances.push(await web3.eth.getBalance(account))
   }
}
async function initWeb3(){
    if(window.ethereum){// Metamask
        web3 = new Web3(window.ethereum)
        accounts = await window.ethereum.request({method:'eth_requestAccounts'})
    }else{// truffle develop
        if(WEB3_URL.startsWith('ws')){ // Websocket + Ganache-cli
         web3 = new Web3(new Web3.providers.WebsocketProvider(WEB3_URL))
        }else{// Truffle develop('http')
            web3 = new Web3(new Web3.providers.HttpProvider(WEB3_URL))
           
        }
        await getAccounts();
    }
    await getBalances()
    console.log('-----------------------')
    console.log(accounts)
    console.log('-----------------------')
    console.log('-----------------------')
    console.log(balances)
    console.log('-----------------------')
}