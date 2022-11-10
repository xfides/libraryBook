import {AbstractComponent} from "../AbstractComponent";
import {createAppTemplate, Selectors} from "./template";
import {Search} from "../search";
import {AppBook} from "../appBook";
import {Stored} from "../stored";

class App extends AbstractComponent {

  constructor() {
    super();
    this._components = {
      search: new Search(),
      appBook: new AppBook(),
      stored: new Stored()
    }
  }

  render() {
    const template = this._getTemplate();
    this._dom = this._getDomFromTemplate(template);

    const searchDom = this._components.search.render();
    const appBookDom = this._components.appBook.render();
    const storedDom = this._components.stored.render();

    this._dom.querySelector(Selectors.APP__SEARCH).append(searchDom);
    this._dom.querySelector(Selectors.APP__BOOK).append(appBookDom);
    this._dom.querySelector(Selectors.APP__STORED).append(storedDom);

    return this._dom;
  }

  _getTemplate() {
    return createAppTemplate();
  }

}

export {App}
