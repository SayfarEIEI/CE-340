const {event} = require("jquery");

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
            const auctionEnd = await auction.auctionEnd.call();
            const myProduct = await auction.getProductInfo();
            const dateString = new Date(auctionEnd * 1000);
            $("#AuctionOwner").text(auctionOwner);
            $("#AuctionEnd").text(dateString.toLocaleString()); 
            $("#ProductBrand").text(myProduct[0]);
            $("#SerialNumber").text(myProduct[1]);
            await updateInfo()

            auction.BidEvent()
                .on('data',async e => {
                    updateStatus(e,'BIDED')
                    await updateInfo()
                    const highestBidder = event.returnValues.highestBidder
                    const highestBid = event.returnValues.highestBid
                    $('#EventsLog').append(
                        `<li class="lead" >${highestBidder} has biden ${highestBid} Wei</li>`
                    )
                })
                .on('error', err => console.log(err) )
                auction.EndEvent().on('data',async event =>{
                    await updateStatus(event,"ENDED")
                    const highestBidder = event.returnValues.highestBidder
                    const highestBid = await auction.highestBid.call()
                    alert(`The Winner is ${highestBidder} who has biden at ${highestBid} Wei`)
                }).on('error',err =>{console.log(err)})
                auction.CancelEvent().on('data',async event =>{
                    await updateStatus(event,"CANCELLED")
                }).on('error',err =>{console.log(err)})
        } catch (err) {
            console.log(err);
            return;
        };
    });
}
async function updateInfo() {
    const highestBidder = await auction.highestBidder.call();
    const highestBid = await auction.highestBid.call();
    const currentState = await auction.STATE.call();
    const myBidEther = await auction.getMyBid.call(bidder);
    $("#HighestBidder").text(highestBidder);
    let bidEther = web3.utils.fromWei(highestBid, 'ether');
    $("#HighestBid").text(bidEther + ' Ether');
    $("#State").text(AUCTION_STATE[currentState]);
    bidEther = web3.utils.fromWei(myBidEther, 'ether');
    $("#MyBid").text(bidEther + ' Ether');
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
     const myBid = await 
     $('#MyBid').text(web3.utils.fromWei(myBid) + 'Ether');
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

const endAiction = async()=>{
    let result;
    try {
        result = await auction.endAiction({from:auctionOwner})
        console.log("resul:",result)
    } catch (err) {
        console.log(err)
    }
}
const cancelAiction = async()=>{
    let result;
    try {
        result = await auction.cancelAiction({from:auctionOwner})
        console.log("resul:",result)
    } catch (err) {
        console.log(err)
    }
}