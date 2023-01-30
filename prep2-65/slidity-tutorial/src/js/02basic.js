$(()=>{
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