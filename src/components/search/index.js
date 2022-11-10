import {AbstractComponent} from "../AbstractComponent";
import {createSearchTemplate, Selectors} from "./template";
import {SearchQuery} from '../searchQuery';
import {SearchResults} from '../searchResults';
import {SearchCoverage} from '../searchCoverage';

class Search extends AbstractComponent {

  constructor() {
    super();
    this._components = {
      searchQuery: new SearchQuery(),
      searchResults: new SearchResults(),
      searchCoverage: new SearchCoverage()
    }
  }

  render() {
    const template = this._getTemplate();
    this._dom = this._getDomFromTemplate(template);

    const searchQueryDom = this._components.searchQuery.render();
    const searchResultsDom = this._components.searchResults.render();
    const searchCoverageDom = this._components.searchCoverage.render();

    this._dom.querySelector(Selectors.SEARCH__QUERY).append(searchQueryDom);
    this._dom.querySelector(Selectors.SEARCH__RESULTS).append(searchResultsDom);
    this._dom.querySelector(Selectors.SEARCH__COVERAGE)
      .append(searchCoverageDom);

    return this._dom;
  }

  _getTemplate() {
    return createSearchTemplate();
  }

}

export {Search}
