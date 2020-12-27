import { By, until, WebDriver } from "selenium-webdriver";

//the page object is set up here with the following methods:
// * navigate
// * doSearch
// * getResults
export class SpecPage {
  driver: WebDriver;
  // using bing.com page that can search and is easy.
  url: string = "https://www.bing.com";

  searchBar: By = By.name("q");
  results: By = By.id("b_content");

  //copy/paste from another page object for some basic functionality
  //including the constructor and navigate functions. make the doSearch and getResults using those.
  constructor(driver: WebDriver) {
    this.driver = driver;
  }
  async navigate() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.searchBar));
    await this.driver.wait(
      until.elementIsVisible(await this.driver.findElement(this.searchBar))
    );
  }

  async sendKeys(elementBy: By, keys) {
    await this.driver.wait(until.elementLocated(elementBy));
    return this.driver.findElement(elementBy).sendKeys(keys);
  }

  async getText(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).getText();
  }

  async doSearch(text: string) {
    return this.sendKeys(this.searchBar, `${text}\n`);
  }

  async getResults() {
    return this.getText(this.results);
  }
}