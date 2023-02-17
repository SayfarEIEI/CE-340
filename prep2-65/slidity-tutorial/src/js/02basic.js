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
            console.log(basicMath);
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
    $('#btn1').on('click',async e=>{
    const p1 = parseFloat($('#param1').val())
    const p2 = parseFloat($('#param2').val())
    if(Number.isNaN(p1,p2)){
        alert("value is not number")
    }
    try {
        const result = await basicMath.add(p1,p2);
        $('#result').text(result)
    } catch (error) {
        console.log(error)
    }
    const result = p1+p2
    console.log(result)
    

    $('#param1').val('')
    $('#param2').val('')
    })
    $('#btn2').on('click',async e=>{
    const p1 = parseFloat($('#param1').val())
    const p2 = parseFloat($('#param2').val())
    if(Number.isNaN(p1,p2)){
        alert("value is not number")
    }
    try {
        const result = await basicMath.subtract(p1,p2);
        $('#result').text("result is : "+result)
    } catch (error) {
        console.log(error)
    }
    const result = p1+p2
    console.log(result)
    

    $('#param1').val('')
    $('#param2').val('')
    })
    $('#btn3').on('click',async e=>{
    const p1 = parseFloat($('#param1').val())
    const p2 = parseFloat($('#param2').val())
    if(Number.isNaN(p1,p2)){
        alert("value is not number")
    }
    try {
        const result = await basicMath.multiply(p1,p2);
        $('#result').text("result is : "+result)
    } catch (error) {
        console.log(error)
    }
    const result = p1+p2
    console.log(result)
    

    $('#param1').val('')
    $('#param2').val('')
    })
    $('#btn4').on('click',async e=>{
    const p1 = parseFloat($('#param1').val())
    const p2 = parseFloat($('#param2').val())
    if(Number.isNaN(p1,p2)){
        alert("value is not number")
    }
    try {
        const result = await basicMath.divide(p1,p2);
        $('#result').text("result is : "+result)
    } catch (error) {
        console.log(error)
    }
    const result = p1+p2
    console.log(result)
    

    $('#param1').val('')
    $('#param2').val('')
    })
 
})