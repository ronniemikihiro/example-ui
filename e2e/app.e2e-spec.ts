import { ExampleUiPage } from './app.po';

describe('example-ui App', () => {
  let page: ExampleUiPage;

  beforeEach(() => {
    page = new ExampleUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
