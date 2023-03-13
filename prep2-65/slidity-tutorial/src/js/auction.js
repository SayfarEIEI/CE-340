let auctionContract,auctionOwner,auction
const AuctionState = ['STARTED','CANCELLED','ENDED','DESTRUCTED']
let bidder,currentAccount
let initialized = false


async function init() {
    try {
        await initWeb3();
    } catch (err) {
        console.log(err);
    }
    if (typeof web3 == 'undefined')
        throw (new Error('ERROR: Unable to connect with web3 provider!!!'));
    console.log('current web3', web3);

    // w3.eth.defaultAccount = bidder;
    $.getJSON('MyAuction.json', async contractABI => {

        const auctionContract = TruffleContract(contractABI);
        auctionContract.setProvider(web3.currentProvider);
        try {
            accounts = await web3.eth.getAccounts();
            // console.log(accounts);
            bidder = accounts[0];
            updateAccounts(accounts);
            auction = await auctionContract.deployed();
        } catch (err) {
            console.log(err);
            return;
        };

        try {
            const auctionEnd = await auction.auctionEnd.call();
            const highestBidder = await auction.highestBidder.call();
            const highestBid = await auction.highestBid.call();
            const myProduct = await auction.getProductInfo();
            const currentState = await auction.STATE.call();
            const myBidEther = await auction.getMyBid.call(bidder);
            const dateString = new Date(auctionEnd * 1000);
            $("#AuctionOwner").text(auctionOwner);
            $("#AuctionEnd").text(dateString.toLocaleString());
            $("#HighestBidder").text(highestBidder);
            let bidEther = web3.utils.fromWei(highestBid, 'ether');
            $("#HighestBid").text(bidEther + ' Ether');
            $("#State").text(AuctionState[currentState]);
            $("#ProductBrand").text(myProduct[0]);
            $("#SerialNumber").text(myProduct[1]);
            bidEther = web3.utils.fromWei(myBidEther, 'ether');
            $("#MyBid").text(bidEther + ' Ether');

            auction.BidEvent()
                .on('data',async e => {
                    updateStatus(e,'BIDED')
                })
                .on('error', err => console.log(err) )
        } catch (err) {
            console.log(err);
            return;
        };
    });
}
async function updateStatus(event,msg){
    const dateString = new Date(event.returnValues.timestamp * 1000)
  
    $('#EventsLog').append(`<li class = "lead"> ${msg} at ${dateString} </li>`)
    const currentState = await auction.STATE.call()
    $('#State').text(AuctionState[currentState])
}
const formatBalance = (balance) =>  Number(web3.utils.fromWei(balance)).toFixed(6);
async function updateAccounts() {
  auctionOwner = accounts[0];
  let html = '<option value="0"> Please Select Account </option> ';
  for (let i = 1; i < accounts.length; i++) {
    html += "<option value=" + i + " >" + accounts[i] + "(" + formatBalance(balances[i]) +"Ether ) </option> ";
  }
  $('#AccountList').html(html);
  if(!initialized) {
    initialized = true;
   }
   else{
    return;
   }

   $('#AccountList').on('change', async e => {
     currentAccount = e.target.value;
     bidder = accounts[currentAccount];
// const myBid = await 
//      $('#MyBid').text(web3.utils.fromWei(myBid) + 'Ether');
   });
}
const bid = async () =>{
    const myBid = $('#Value').val()
    let result;
    try{
        result = await auction.bid({from:bidder,value:web3.utils.toWei( myBid,'ether')})
        console.log('tx result',result)
    }catch(err){
        console.log(err)
    }
}
const endAiction = async()=>{}
const cancelAiction = async()=>{}