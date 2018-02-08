import { RefDataAppPage } from './app.po';
import { browser } from 'protractor';
import { Client } from 'pg';
import { } from 'jasmine';

import { USER, COUNTRY, CITY, AIRPORT, AUTHORITY } from './userAndEntities';

describe('ref-data-app App', () => {
  let page: RefDataAppPage;
  beforeEach(() => {
    page = new RefDataAppPage();
    page.navigateTo();
    page.windowMaxSize();
    browser.waitForAngular();
    
    
  });

  it('Should open Reference Data app', () => {
    expect(page.getTitle()).toEqual('Reference Data');
  });

  it('Should login to Ref Data', () => {
    expect(page.loginToRefData(USER)).toBeTruthy();
  });

  it('Should logout from Ref Data', () => {
    expect(page.logoutFromRefData()).toBeTruthy();
  });

  describe('After Login', () => {
    let page: RefDataAppPage;

    beforeEach(() => {
      page = new RefDataAppPage();
      page.navigateTo();
      browser.waitForAngular();
      page.loginToRefData(USER);
    });
    afterEach(() => {
      page.navigateTo();
      browser.waitForAngular();
      page.logoutFromRefData();
    });

    it('Switch country button should work', () => {
      page.clickSwitchCountryButton();
      expect(page.getListWithCountries()).toBeTruthy();
    });

    it('Should add new country', () => {
      expect(page.addNewCountry(COUNTRY)).toBeTruthy();
      expect(page.getCountry(COUNTRY.name)).toBeTruthy();
    });

    it('Should add new city', () => {
      expect(page.addNewCity(CITY)).toBeTruthy();
      expect(page.getCity(CITY)).toBeTruthy();
    });

    it('Should add new airport', () => {
      expect(page.addNewAirport(AIRPORT)).toBeTruthy();
      expect(page.getAirport(AIRPORT)).toBeTruthy();
    });

    it('Should add new regulatory authority', () => {
      expect(page.addNewRegAuthority(AUTHORITY)).toBeTruthy();
      expect(page.getRegAuthority(AUTHORITY)).toBeTruthy();
    });

  });
});
