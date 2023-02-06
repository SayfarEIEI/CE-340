const BasicMath = artifacts.require("BasicMath");

contract('BasicMath', (accounts) => {
  it('should return add funtion result correcty', async () => {
    const ba = await BasicMath.deployed();  
    const x =7;
    const y = 5;
    const expected = x+y;
    // const result = await ba.add.call(x,y)
    assert.equal(await ba.add.call(x,y), expected, "the add function retrun incorrect result");
  });
  it('should return divide funtion result correcty', async () => {
    const ba = await BasicMath.deployed();  
    const x =7;
    const y = 5;
    const expected = x / y;
    // const result = await ba.add.call(x,y)
    assert.equal(await ba.divide.call(x,y), expected, "the divide function retrun incorrect result");
  });
  it('should return subtract funtion result correcty', async () => {
    const ba = await BasicMath.deployed();  
    const x =7;
    const y = 5;
    const expected = x-y;
    // const result = await ba.add.call(x,y)
    assert.equal(await ba.subtract.call(x,y), expected, "the subtract function retrun incorrect result");
  });
  it('should return multiply funtion result correcty', async () => {
    const ba = await BasicMath.deployed();  
    const x =7;
    const y = 5;
    const expected = x*y;
    // const result = await ba.add.call(x,y)
    assert.equal(await ba.multiply.call(x,y), expected, "the multiply function retrun incorrect result");
  });
  
});
