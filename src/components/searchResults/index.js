import {AbstractComponent} from "../AbstractComponent";
import {
  createSearchResultsTemplate,
  NameInSelector,
  Selectors
} from "./template";
import {eventBus} from '../../eventBus';
import {EventNames} from '../../eventBus/eventNames';
import {model} from "../../model";
import {SearchResultsItem} from "../searchResultsItem";
import {IDENTIFYING_BOOK_SELECTOR} from "../../utils/constants";

class SearchResults extends AbstractComponent {

  constructor() {
    super();
    this._components = {
      searchResultsItem: new SearchResultsItem(),
    }

    this.render = this.render.bind(this);
    this._handleUserSelectionBook = this._handleUserSelectionBook.bind(this);
    this._setHighlightActiveBook = this._setHighlightActiveBook.bind(this);

    eventBus.on(EventNames.SUCCESS_SEARCH_REQUEST, this.render);
    eventBus.on(EventNames.RESET_SEARCH_STATE, this.render);
    eventBus.on(EventNames.SETUP_ACTIVE_BOOK, this._setHighlightActiveBook);
  }

  render() {
    const template = this._getTemplate();
    this._dom = this._getDomFromTemplate(template);
    this._dom.addEventListener("click", this._handleUserSelectionBook)
    this._dom.innerHTML = "";

    if (!model.searchStatistics.numberOfAllFoundBooks) {
      return this._dom;
    }

    const normalizedBooks = model.getNormalizedBooks();
    const searchResultsItemsDom =
      this._components.searchResultsItem.render(normalizedBooks);
    this._dom.append(searchResultsItemsDom);

    return this._dom;
  }

  _getTemplate() {
    return createSearchResultsTemplate();
  }

  _setHighlightActiveBook() {
    if (!model.activeNormalizedBookInfo.id) {
      return;
    }

    const activeBookId = model.activeNormalizedBookInfo.id;
    const selectorActiveBook =
      `[${IDENTIFYING_BOOK_SELECTOR} = "${activeBookId}"]`;

    this._deleteHighlightActiveBook();
    this._dom.querySelector(selectorActiveBook)
      .classList.add(NameInSelector.SEARCH_RESULTS_ITEM_ACTIVE);
  }

  _deleteHighlightActiveBook() {
    this._dom.querySelectorAll(Selectors.SEARCH_RESULTS_ITEM_ACTIVE).forEach(
      (activeBookDom) => {
        activeBookDom.classList.remove(NameInSelector.SEARCH_RESULTS_ITEM_ACTIVE);
      }
    );
  }

  _handleUserSelectionBook(evt) {
    const selectedBookDom = evt.target.closest(
      `[${IDENTIFYING_BOOK_SELECTOR}]`
    );

    if (selectedBookDom) {
      const bookId = selectedBookDom.getAttribute(IDENTIFYING_BOOK_SELECTOR);
      eventBus.trigger(EventNames.USER_BOOK_SELECTION, bookId);
    }
  }

}

export {SearchResults}
