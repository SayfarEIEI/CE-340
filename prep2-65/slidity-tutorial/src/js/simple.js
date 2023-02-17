const sp_contract_api = 'SimpleMath.json';
let simpleMath;
const deployContracts = async () => {
  // laod Contract abi via AJAX
  $.getJSON(sp_contract_api, async contract_APIs => {
    console.log(contract_APIs);
    try {
      const constract = TruffleContract(contract_APIs);
      constract.setProvider(web3.currentProvider);
      simpleMath = await constract.deployed();
      console.log(simpleMath);
    } catch (err) {
      console.log(err)
    }
  });
};
$(async () => {
  try {
    await initWeb3();
    await deployContracts();
  } catch (err) {
    console.log(err)
  }
  $('#btn5').on('click',async e => {
    const param3 = $('#param3').val();
    const datas = param3.split(/[\s ,]/);
    const numberArray = datas.map(Number);
    console.log(numberArray)
    try {
      const result = await simpleMath.sum(numberArray);
      $('#result2').text(result)
      $('#param3').val('')
  } catch (error) {
    console.log("----------------------------------------")
      console.log(error)
      console.log("----------------------------------------")
  }
  });
  $('#btn6').on('click',async e => {
    const param3 = $('#param3').val();
    const datas = param3.split(/[\s ,]/);
    const numberArray = datas.map(Number);
    console.log(numberArray)
    try {
      const result = await simpleMath.min(numberArray);
      $('#result2').text(result)
      $('#param3').val('')
  } catch (error) {
    console.log("----------------------------------------")
      console.log(error)
      console.log("----------------------------------------")
  }
  });
  $('#btn7').on('click',async e => {
    const param3 = $('#param3').val();
    const datas = param3.split(/[\s ,]/);
    const numberArray = datas.map(Number);
    console.log(numberArray)
    try {
      const result = await simpleMath.max(numberArray);
      $('#result2').text(result)
      $('#param3').val('')
  } catch (error) {
    console.log("----------------------------------------")
      console.log(error)
      console.log("----------------------------------------")
  }
  });
  $('#btn8').on('click',async e => {
    const param3 = $('#param3').val();
    const datas = param3.split(/[\s ,]/);
    const numberArray = datas.map(Number);
    console.log(numberArray)
    try {
      const result = await simpleMath.mean(numberArray);
      $('#result2').text(result)
      $('#param3').val('')
  } catch (error) {
    console.log("----------------------------------------")
      console.log(error)
      console.log("----------------------------------------")
  }
  });
});