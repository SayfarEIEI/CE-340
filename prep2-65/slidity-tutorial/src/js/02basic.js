const ba_contract_api = 'BasicMath.json'
let basicMath;
const deployContract = async () =>{
    // laod Contract abi via AJAX
    $.getJSON(ba_contract_api, async contract_APIs=>{
        console.log(contract_APIs);
        try{
            const constract = TruffleContract(contract_APIs);
            constract.setProvider(web3.currentProvider);
            basicMath = await constract.deployed();
            console.log(basicMath)
        }catch(err){
            console.log(err)
        }   
    });
};

$(async()=>{
    try{
        await initWeb3();
        await deployContract();
    }catch(err){
        console.log(err)
    }
    $('#btn1').on('click',e=>{
    const p1 = parseFloat($('#param1').val())
    const p2 = parseFloat($('#param2').val())
    if(Number.isNaN(p1,p2)){
        alert("value is not number")
    }
    const result = p1+p2
    console.log(result)
    $('#result').text("result is : "+result)

    $('#param1').val('')
    $('#param2').val('')
    })
 
})