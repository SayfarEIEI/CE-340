const puppeteer = require('puppeteer');
const BasicMath = artifacts.require("BasicMath");

let browser,page;
const delay = async milisec => new Promise(r => setTimeout(e,milisec));
contract('BasicMath', (accounts) => {
  before(async () => {
    browser = await puppeteer.launch({
      headless : false,
      defaultViewport:null,
      args:['--window-size=1200,800'],
    });
    page = await browser.newPage(); 
    await page.goto('http://localhost:3000/02basic.html');
   });

  after(async () => {
    await page.close();
    await browser.close();
   });
  it('test add function', async () => {
    const x =15,y=13;
    const expected = x + y;
    await inputData(x,y,'#btn1');
    const result = await page.waitForSelector('#result');
    const value = await result.ecalute(e1 => e1.textContent)
    assert.equal(expected,value,'The add Function is incorrect')
  });
});

const inputData = async(x,y,btnId) =>{
  const param1 = await page.waitForSelector('#param1');
  await param1.focus();
  await page.keyborad.type(String(x),{delay:100});
  await delay(2000);
  const param2 = await page.waitForSelector('#param2');
  await param2.focus();
  await page.keyborad.type(String(y),{delay:100});
  await delay(1000);
  
  const btn1 = await page.waitForSelector(btnId);
  await btn1.click();
}
