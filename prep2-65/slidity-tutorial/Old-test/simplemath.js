const puppeteer = require('puppeteer');
const SimpleMath = artifacts.require("SimpleMath");
const SKIP = true;
let browser,page;
const delay = async milisec => new Promise(r => setTimeout(r,milisec));
contract('SimpleMath', (accounts) => {
    it('should return sum funtion result correcty', async () => {
        const simpleMath = await SimpleMath.deployed();
        const datas = [1, 2, 3];
        const expected = 1 + 2 + 3;
        // const result = await simpleMath.add.call(x,y)
        assert.equal(await simpleMath.sum.call(datas), expected, "the sum function retrun incorrect result");
    });
    it('should return min funtion result correcty', async () => {
        const simpleMath = await SimpleMath.deployed();
        const datas = [3140, 140, 30, 302, 305];
        const expected = 30;
        // const result = await simpleMath.add.call(x,y)
        assert.equal(await simpleMath.min.call(datas), expected, "the min function retrun incorrect result");
    });
    it('should return max funtion result correcty', async () => {
        const simpleMath = await SimpleMath.deployed();
        const datas = [3140, 140, 30, 302, 305];
        const expected = 3140;
        // const result = await simpleMath.add.call(x,y)
        assert.equal(await simpleMath.max.call(datas), expected, "the max function retrun incorrect result");
    });
    it('should return mean funtion result correcty', async () => {
        const simpleMath = await SimpleMath.deployed();
        const datas = [3140, 140, 30, 302, 305];
        const expected =Math.floor((3140+140+30+302+305)/datas.length);
        // const result = await simpleMath.add.call(x,y)
        assert.equal(await simpleMath.mean.call(datas), expected, "the mean function retrun incorrect result");
    });

});
contract('SimpleMath by Puppeteer', (accounts) => {
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
        const result = await page.waitForSelector("#result2");
        await result.evaluate(el => el.textContent = '');
       });
       it('test sum function by puppeteer', async () => {
        const x ="1,2,3,4,5" ;
        const expected = 1+2+3+4+5;
        await inputData(x,'#btn5');
        const result = await page.waitForSelector('#result2');
        const value = await result.evaluate(el => el.textContent)
        assert.equal(expected,value,'The sum Function is incorrect')
      });
       it('test min function by puppeteer', async () => {
        const x ="1,2,3,4,5" ;
        const expected = 1;
        await inputData(x,'#btn6');
        const result = await page.waitForSelector('#result2');
        const value = await result.evaluate(el => el.textContent)
        assert.equal(expected,value,'The min Function is incorrect')
      });
       it('test max function by puppeteer', async () => {
        const x ="1 2 3 4 5" ;
        const expected = 5;
        await inputData(x,'#btn7');
        const result = await page.waitForSelector('#result2');
        const value = await result.evaluate(el => el.textContent)
        assert.equal(expected,value,'The max Function is incorrect')
      });
       it('test mean function by puppeteer', async () => {
        const x ="1 2 3 4 5" ;
        const expected = (1+2+3+4+5)/5;
        await inputData(x,'#btn8');
        const result = await page.waitForSelector('#result2');
        const value = await result.evaluate(el => el.textContent)
        assert.equal(expected,value,'The mean Function is incorrect')
      });
       
})
const inputData = async(x,btnId) =>{

    const param3 = await page.waitForSelector('#param3');
    const kbDelay = SKIP ?{}:{delay:100};
    await param3.focus();
    await page.keyboard.type(String(x),kbDelay);
    if(!SKIP)
      await delay(550);
    const btn = await page.waitForSelector(btnId);
    await btn.click();
    await delay(200)
  }
