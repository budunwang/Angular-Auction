import { AngularAuctionPage } from './app.po';

describe('angular-auction App', () => {
  let page: AngularAuctionPage;

  beforeEach(() => {
    page = new AngularAuctionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
