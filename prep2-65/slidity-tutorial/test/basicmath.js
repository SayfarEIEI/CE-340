const puppeteer = require('puppeteer');
const BasicMath = artifacts.require("BasicMath");
const SKIP = true;
let browser,page;
const delay = async milisec => new Promise(r => setTimeout(r,milisec));
contract('BasicMath', (accounts) => {
  before(async () => {
    browser = await puppeteer.launch({
      headless : SKIP,
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
   beforeEach(async () =>{
    const result = await page.waitForSelector("#result");
    await result.evaluate(el => el.textContent = '');
   });
  it('test add function', async () => {
    const x =15,y=13;
    const expected = x + y;
    await inputData(x,y,'#btn1');
    const result = await page.waitForSelector('#result');
    const value = await result.evaluate(e1 => e1.textContent)
    assert.equal(expected,value,'The add Function is incorrect')
  });
});

const inputData = async(x,y,btnId) =>{

  const param1 = await page.waitForSelector('#param1');
  const kbDelay = SKIP ?{}:{delay:100};
  await param1.focus();
  await page.keyboard.type(String(x),kbDelay);
  if(!SKIP)
    await delay(550);
  const param2 = await page.waitForSelector('#param2');
  await param2.focus();
  await page.keyboard.type(String(y),kbDelay);
  if(!SKIP)
    await delay(550);
  const btn1 = await page.waitForSelector(btnId);
  await btn1.click();
  await delay(200)
}
