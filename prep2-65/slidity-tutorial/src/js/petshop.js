// const WEB3_URL = 'http://localhost:8545';
const WEB3_URL = "ws://localhost:8545";

const getJsonPromisify = (jsonfile, options) => {
  return new Promise((resolve, reject) => {
    $.getJSON(jsonfile, options)
      .done((json) => resolve(json))
      .fail((...error) => reject(error));
  });
};

const App = {
  web3: null,
  account: null,
  meta: null,
  owner:null,

  initWeb3: async () => {
    if (window.ethereum) {
      App.web3 = new Web3(window.ethereum); 
      try {
          App.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });  
          window.ethereum.on('accountsChanged', accounts => App.accounts = accounts);
      } catch (err) {
          console.log(err);
      }
    } else {
        if (WEB3_URL.startsWith('ws'))
          App.web3 = new Web3(new Web3.providers.WebsocketProvider(WEB3_URL));
        else
          App.web3 = new Web3(new Web3.providers.HttpProvider(WEB3_URL));
    }
    return await App.init();
  },

  init: async () => {
    const petsRow = $("#petsRow");
    const petTemplate = $("#petTemplate");
    try {
      const pets = await getJsonPromisify('assets/data/pets.json');
      pets.map((pet) => {
        petTemplate.find(".card-title").text(pet.name);
        petTemplate.find("img").attr("src", "./assets/" + pet.picture);
        petTemplate.find(".pet-breed").text(pet.breed);
        petTemplate.find(".pet-age").text(pet.age);
        petTemplate.find(".pet-location").text(pet.location);
        petTemplate.find(".btn-buy").attr("data-id", pet.id);
        petsRow.append(petTemplate.html());
      });
      App.lastBlock = -1;
      return await App.start();
    } catch (err) {
      console.log(err);
    }
  },

  start: async () => {
    try {
      const petshopContract = await getJsonPromisify("Petshop.json");
      const Petshop = TruffleContract(petshopContract);
      Petshop.setProvider(App.web3.currentProvider);
      App.petshop = await Petshop.deployed();
      const totalPets = await App.petshop.getTotalPets.call();
      const petIdArray = Array(totalPets.toNumber()).fill().map((_, i) => i);
      App.petPrices = await Promise.all(petIdArray.map(async id => await App.petshop.getPrice(id)));
      const petIdElements = $('.pet-price');
      App.petPrices.forEach((price, i) =>
        $(petIdElements[i]).text(App.web3.utils.fromWei(price, 'ether')));
      const owner = await App.petshop.shopOwner.call();
      App.owner = owner
      $('#shop-owner').text(owner);
      // update balance info
      await App.updateBalanceInfo()
      // watch for events
      // bind event
    } catch (err) {
      console.log(err);
    }

  },

  updateBalanceInfo: async () => {
    const _balance = await App.petshop.getBalance.call({from:App.owner});
    const balance = parseFloat(App.web3.utils.fromWei(_balance,'ether'));
    if(balance > 0)
      $('#withdraw').addClass('btn-success').removeClass('btn-outline-secondary').removeAttr('disabled');
    else
      $('#withdraw').removeClass('btn-success').addClass('btn-outline-secondary').attr('disabled', true);
    $('#balance').text(balance.toFixed(2))
  },

  bindEvents: () => {
    $(".btn-buy").on('click', App.handleBuy);
    $("#withdraw").on('click', App.handleWithdraw);
  },

  updatePetStatus: async e => {
    try {
      const petCount = await App.petshop.petCount.call();
      const petIdArray = [];
      for (let i = 0; i < petCount.toNumber(); i++)
        petIdArray.push(i);
      const infos = await Promise.all(petIdArray.map(async petId => await App.petshop.getPetInfo(petId)));
      const buyers = await Promise.all(petIdArray.map(async petId => await App.petshop.getBuyer(petId)));
      buyers.forEach((buyer, i) => {
        if (buyer.indexOf("0x0000") < 0) {
            $(".card-pet")
              .eq(i)
              .find("button")
              .text("Sold")
              .attr("disabled", true)
              .removeClass("btn-danger btn-primary")
              .addClass("btn-outline-secondary");
        }
      });
      if(typeof e != 'undefined')
        App.lastBlock = e.blockNumber;
    } catch (err) {
      console.log(err);
    }
  },

  handleWithdraw: async e => {
      // handle withdraw here
  },

  handleEvent: async e => {
    if (!e || !e.event) return;
    switch (e.event) {
      // handle various cases here
      default:
        console.log("Unhandled event", e);
        break;
    }
  },

  handleBuy: async e => {
    e.preventDefault();
    $(e.target)
      .removeClass("btn-primary")
      .addClass("btn-danger")
      .text("Processing....");
    const petId = parseInt($(e.target).data("id"));
    let result;
    try {
      // call buy function
    } catch (err) {
      console.log(err);
      $(e.target)
              .removeClass("btn-danger")
              .addClass("btn-primary")
              .text("Buy");
    }
    return result;
  },
};
window.addEventListener("load", async () => await App.initWeb3());

