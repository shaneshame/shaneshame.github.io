const puppeteer = require('puppeteer');
const RoutineDesign = require('routine-design');
const routineDesign = new RoutineDesign();

const windowSize = 400;

const captureSpoonman = () => {
  const browser = puppeteer.launch().then(() => {
    const WebPage = routineDesign.createWebPage(
      browser,
      8080,
      'path',
      windowSize
    );

    return WebPage.screenshot();
  });
};

module.exports = captureSpoonman;
