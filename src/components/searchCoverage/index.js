import {AbstractComponent} from "../AbstractComponent";
import {
  createSearchCoverageTemplate,
  Selectors,
  NameInSelector
} from "./template";
import {eventBus} from '../../eventBus';
import {EventNames} from '../../eventBus/eventNames';
import {model} from "../../model";

class SearchCoverage extends AbstractComponent {

  constructor() {
    super();

    this.render = this.render.bind(this);
    this._handleStartSearchRequest = this._handleStartSearchRequest.bind(this);

    eventBus.on(EventNames.SUCCESS_SEARCH_REQUEST, this.render);
    eventBus.on(EventNames.ERROR_SEARCH_REQUEST, this.render);
    eventBus.on(EventNames.RESET_SEARCH_STATE, this.render);
    eventBus.on(
      EventNames.START_SEARCH_REQUEST,
      this._handleStartSearchRequest
    );

  }

  render() {
    const template = this._getTemplate();
    this._dom = this._getDomFromTemplate(template);

    if (!this._isRendered()) {
      this._setBtnHandlers();
    }

    model.searchStatistics.numberOfAllFoundBooks === 0
      ? this._hideSearchCoverageContent()
      : this._updateSearchCoverage() && this._showSearchCoverageContent();

    return this._dom;
  }

  _getTemplate(dataStatistics) {
    return createSearchCoverageTemplate(dataStatistics);
  }

  _setBtnHandlers() {
    const btnCleaAllSearchDom = this._dom.querySelector(
      Selectors.SEARCH_COVERAGE__BTN_CLEAR
    );
    const btnNextSearchResultsDom = this._dom.querySelector(
      Selectors.SEARCH_COVERAGE__BTN_NEXT
    );
    const btnPrevSearchResultsDom = this._dom.querySelector(
      Selectors.SEARCH_COVERAGE__BTN_PREV
    );

    btnCleaAllSearchDom.addEventListener("click", () => {
      eventBus.trigger(EventNames.CLEAR_ALL_SEARCH);
    })
    btnNextSearchResultsDom.addEventListener("click", () => {
      eventBus.trigger(EventNames.NEXT_SEARCH_RESULTS);
    })
    btnPrevSearchResultsDom.addEventListener("click", () => {
      eventBus.trigger(EventNames.PREV_SEARCH_RESULTS);
    })
  }

  _handleStartSearchRequest() {
    this._dom.querySelectorAll(Selectors.SEARCH_COVERAGE__BTN).forEach(
      searchCoverageBtn => searchCoverageBtn.disabled = true
    );
  }

  _updateSearchCoverage() {
    this._updateSearchCoverageInfo();
    this._updateSearchCoverageControl();

    return true;
  }

  _updateSearchCoverageInfo() {
    this._dom.querySelector(Selectors.SEARCH_COVERAGE__VALUE_FOUND).innerHTML =
      model.searchStatistics.numberOfAllFoundBooks;
    this._dom.querySelector(Selectors.SEARCH_COVERAGE__VALUE_SIZE).innerHTML =
      model.searchStatistics.numberBooksPerPage;
    this._dom.querySelector(Selectors.SEARCH_COVERAGE__VALUE_START).innerHTML =
      model.searchStatistics.indexFirstBookOnPage;
  }

  _updateSearchCoverageControl() {
    const numberOfAllFoundBooks = model.searchStatistics.numberOfAllFoundBooks;
    const numberBooksPerPage = model.searchStatistics.numberBooksPerPage;
    const indexFirstBookOnPage = model.searchStatistics.indexFirstBookOnPage;

    this._dom.querySelector(Selectors.SEARCH_COVERAGE__BTN_CLEAR).disabled =
      false;
    this._dom.querySelector(Selectors.SEARCH_COVERAGE__BTN_PREV).disabled =
      model.search.isError || indexFirstBookOnPage === 0;

    this._dom.querySelector(Selectors.SEARCH_COVERAGE__BTN_NEXT).disabled =
      model.search.isError
      || (indexFirstBookOnPage + numberBooksPerPage) >= numberOfAllFoundBooks;
  }

  _showSearchCoverageContent() {
    this._dom.querySelector(
      Selectors.SEARCH_COVERAGE__CONTENT
    ).classList.remove(
      NameInSelector.SEARCH_COVERAGE__CONTENT_HIDDEN
    );
  }

  _hideSearchCoverageContent() {
    this._dom.querySelector(
      Selectors.SEARCH_COVERAGE__CONTENT
    ).classList.add(
      NameInSelector.SEARCH_COVERAGE__CONTENT_HIDDEN
    );
  }

}

export {SearchCoverage}
