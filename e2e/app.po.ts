import { browser, by, element, $, $$, ElementFinder } from 'protractor';
import * as protractor from 'protractor';

const until = protractor.ExpectedConditions;


function sendValue(element: ElementFinder, text: string) {
  text.split('').forEach((c) => element.sendKeys(c))
}
export class RefDataAppPage {

  navigateTo() {
    return browser.get('/refdata/#/ref-data');
  }

  windowMaxSize() {
    return browser.driver.manage().window().maximize();
  }

  getTitle() {
    return browser.getTitle();
  }

  loginToRefData(user) {
    let usernameInput = $('input[name="username"]');
    browser.wait(until.presenceOf(usernameInput), 5000);
    sendValue(usernameInput, user.name);
    sendValue(element(by.name('password')), user.password);
    element(by.buttonText('Login')).click();
    let el = $('.rules-navigation');
    browser.wait(until.presenceOf(el), 5000);
    return el.isPresent();
  }

  logoutFromRefData() {
    let user = $('.mcf-header-user-details');
    browser.wait(until.presenceOf(user), 5000);
    user.click();
    let logoutBtn = element(by.cssContainingText('.mcf-dropdown-list-link', 'Log out'));
    browser.wait(until.elementToBeClickable(logoutBtn), 5000);
    logoutBtn.click();
    let loginModal = $('.mcf-modal-container');
    browser.wait(until.presenceOf(loginModal), 5000);
    return loginModal.isPresent();
  }

  clickSwitchCountryButton(){
    let geographyMaster = element(by.cssContainingText('.rules-navigation', 'Geography Master'));
    browser.wait(until.presenceOf(geographyMaster), 5000);
    geographyMaster.click();
    let btn = element.all(by.buttonText('Switch')).first();
    browser.wait(until.visibilityOf(btn), 5000);
    browser.sleep(1000);
    btn.click();
  }

  getListWithCountries(){
    let ul = element(by.css('.mcfSearch__card__items'));
    browser.wait(until.presenceOf(ul), 5000);
    return ul.isPresent();
  }

  addNewCountry(contry) {
    let geographyMaster = element(by.cssContainingText('.rules-navigation', 'Geography Master'));
    browser.wait(until.presenceOf(geographyMaster), 5000);
    geographyMaster.click();
    let el = element(by.cssContainingText('.mcf__card__header__links', 'Countries')).element(by.buttonText('Add New'));
    browser.sleep(1000);
    el.click();
    let countryInput = element(by.name('countryCode'));
    browser.wait(until.presenceOf(countryInput), 5000);
    sendValue(countryInput, contry.code);
    sendValue(element(by.name('countryName')), contry.name);
    sendValue(element(by.name('description')), 'Some description here.');
    element(by.buttonText('Save')).click();
    let successMsg = element(by.cssContainingText('.mcf-action-result','New Country Added'));
    browser.wait(until.presenceOf(successMsg), 5000);
    return successMsg.isPresent();
  }

  getCountry(countryName:string){
      browser.get('/refdata/#/geography/country/add');
      let newCountry = element(by.cssContainingText('.-card-link', countryName));
      browser.wait(until.presenceOf(newCountry), 5000);
      return newCountry.isPresent();
  }

  addNewCity(city) {
    browser.get('/refdata/#/geography/city/add/' + city.countryCode);
    let cityInput = element(by.name('cityCode'));
    browser.wait(until.presenceOf(cityInput), 5000);
    sendValue(cityInput, city.code);
    sendValue(element(by.name('cityName')), city.name);
    element(by.buttonText('Save')).click();
    let successMsg = element(by.cssContainingText('.mcf-action-result','New City Added'));
    browser.wait(until.presenceOf(successMsg), 5000);
    return successMsg.isPresent();
  }

  getCity(city){
    browser.get('/refdata/#/geography/city/add/' + city.countryCode);
    let newCity = element(by.cssContainingText('.-card-link', city.name));
    browser.wait(until.presenceOf(newCity), 5000);
    return newCity.isPresent();
  }

  addNewAirport(airport) {
    browser.get('/refdata/#/geography/airport/add/' + airport.cityCode);
    let airportInput = element(by.name('airportCode'));
    browser.wait(until.presenceOf(airportInput), 5000);
    sendValue(airportInput, airport.code);
    sendValue(element(by.name('airportName')), airport.name);
    element(by.buttonText('Save')).click();
    let successMsg = element(by.cssContainingText('.mcf-action-result','New Airport Added'));
    browser.wait(until.presenceOf(successMsg), 5000);
    return successMsg.isPresent();
  }

  getAirport(airport){
    browser.get('/refdata/#/geography/airport/add/' + airport.cityCode);
    let newAirport = element(by.cssContainingText('.-card-link', airport.name));
    browser.wait(until.presenceOf(newAirport), 5000);
    return newAirport.isPresent();
  }

  addNewRegAuthority(authority) {
    let regulatoryBroker = element(by.cssContainingText('.rules-navigation', 'Regulatory Broker'));
    browser.wait(until.presenceOf(regulatoryBroker), 5000);
    regulatoryBroker.click();
    let el = element(by.cssContainingText('.mcf__card__header__links', 'Regulatory Authorities')).element(by.buttonText('Add New'));
    browser.sleep(1000);
    el.click();
    let regulatoryInput = element(by.name('regAuthorityCode'));
    browser.wait(until.presenceOf(regulatoryInput), 5000);
    sendValue(regulatoryInput, authority.code);
    sendValue(element(by.name('regAuthorityName')), authority.name);
    sendValue(element(by.name('countryCode')), authority.countryCode);
    element(by.buttonText('Save')).click();
    let successMsg = element(by.cssContainingText('.mcf-action-result','New Regulatory Authority Added'));
    browser.wait(until.presenceOf(successMsg), 5000);
    return successMsg.isPresent();
  }
  
  getRegAuthority(authority){
    browser.get('/refdata/#/regulatory-broker/regulatory-authority/add');
    let newRegAuthority = element(by.cssContainingText('.-card-link', authority.name));
    browser.wait(until.presenceOf(newRegAuthority), 5000);
    return newRegAuthority.isPresent();
  }
 }
