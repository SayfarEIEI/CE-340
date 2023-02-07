const web3_url = "http://127.0.0.1:9545/"
// WEB3 RPC 2 type => HTTP RTC / WEB_SOCKET
const initWeb3 = async () =>{
    let provider ;
    let web3;
    // ceate web3 Provider
    if (web3_url.startsWith('http')){
        provider = new Web3.providers.HttpProvider(web3_url);
    }
    else{
        provider = new Web3.providers.WebsocketProvider(web3_url);
    }
    // ceare web3 Object
    web3 = new Web3(provider);
    console.log(web3);
};