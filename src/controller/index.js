import {App} from "../components/app"
import {model} from "../model"
import {eventBus} from '../eventBus';
import {EventNames} from '../eventBus/eventNames';
import {api, Url, ResponseKey} from "../services/api";
import {utils} from "../utils";

class Controller {

  constructor() {
    this._bindThisToMethods()
    this._previousSearchValue = "";
  }

  run() {
    this._setInitialDataToModel();
    this._setEventBusHandlers();
    const app = new App();

    document.body.innerHTML = "";
    document.body.append(app.render());
  }

  _handleNextSearchResults() {
    const numberBooksPerPage = model.searchStatistics.numberBooksPerPage;
    const indexFirstBookOnPage = model.searchStatistics.indexFirstBookOnPage;
    const numberOfAllFoundBooks = model.searchStatistics.numberOfAllFoundBooks;

    const newIndexFirstBookOnPage = indexFirstBookOnPage + numberBooksPerPage;
    if (newIndexFirstBookOnPage >= numberOfAllFoundBooks) {
      return;
    }

    model.searchStatistics.indexFirstBookOnPage = newIndexFirstBookOnPage;

    if (
      newIndexFirstBookOnPage + numberBooksPerPage <= model.rawBooks.length
      || model.rawBooks.length === numberOfAllFoundBooks
    ) {
      eventBus.trigger(EventNames.SUCCESS_SEARCH_REQUEST);
      return;
    }

    this._startAsyncSearchRequest();
  }

  _handlePrevSearchResults() {
    const numberBooksPerPage = model.searchStatistics.numberBooksPerPage;
    const indexFirstBookOnPage = model.searchStatistics.indexFirstBookOnPage;

    let newIndexFirstBookOnPage = indexFirstBookOnPage - numberBooksPerPage;
    if (newIndexFirstBookOnPage < 0) {
      return;
    }

    model.searchStatistics.indexFirstBookOnPage = newIndexFirstBookOnPage;
    eventBus.trigger(EventNames.SUCCESS_SEARCH_REQUEST);
  }

  _setInitialDataToModel() {
    //TODO load data to model from LocalStorage
  }

  _setEventBusHandlers() {
    eventBus.on(
      EventNames.ENTERED_SEARCH_REQUEST,
      this._handleEnteredSearchRequest
    );
    eventBus.on(EventNames.CLEAR_ALL_SEARCH, this._handleClearAllSearch);
    eventBus.on(EventNames.USER_BOOK_SELECTION, this._setupActiveBook);
    eventBus.on(EventNames.NEXT_SEARCH_RESULTS, this._handleNextSearchResults);
    eventBus.on(EventNames.PREV_SEARCH_RESULTS, this._handlePrevSearchResults);
    eventBus.on(EventNames.ADD_BOOK_TO_STORE, this._handleAddBookToStore);
    eventBus.on(EventNames.MARK_STORED_BOOK, this._handleMarkStoredBook);
    eventBus.on(EventNames.UNMARK_STORED_BOOK, this._handleUnMarkStoredBook);
    eventBus.on(EventNames.REMOVE_STORED_BOOK, this._handleRemoveStoredBook);
    eventBus.on(EventNames.CLEAR_STORED_BOOKS, this._handleClearStoredBooks);
  }

  _handleClearStoredBooks() {
    model.storedRawBooks.length = 0;
    eventBus.trigger(EventNames.STORED_BOOKS_DELETED);
  }

  _handleMarkStoredBook({triggered: bookId}) {
    this._changeMarkOfStoredBook({bookId, markedState: true});
  }

  _handleUnMarkStoredBook({triggered: bookId}) {
    this._changeMarkOfStoredBook({bookId, markedState: false});
  }

  _changeMarkOfStoredBook({bookId, markedState}) {
    const NOT_FOUND = -1;

    const storedRawBookIndex = model.storedRawBooks.findIndex(
      storedRawBook => utils.getBookId(storedRawBook) === bookId
    )

    if (storedRawBookIndex !== NOT_FOUND) {
      const storedRawBook = model.storedRawBooks[storedRawBookIndex];
      storedRawBook.marked = markedState;

      // proxy watches only for model.storedRawBooks, NOT for it's items
      // so to update LocalStorage correctly need to REPLACE storedRawBook
      model.storedRawBooks.splice(storedRawBookIndex, 1, {...storedRawBook});
      eventBus.trigger(EventNames.CHANGED_MARK_STORED_BOOK);
    }
  }

  _handleRemoveStoredBook({triggered: bookId}) {
    const COUNT_BOOKS_TO_DELETE = 1;
    const NOT_FOUND = -1;

    const storedRawBookIndex = model.storedRawBooks.findIndex(
      storedRawBook => utils.getBookId(storedRawBook) === bookId
    );

    if (storedRawBookIndex !== NOT_FOUND) {
      model.storedRawBooks.splice(storedRawBookIndex, COUNT_BOOKS_TO_DELETE);
      eventBus.trigger(EventNames.STORED_BOOK_REMOVED);
    }
  }

  _handleAddBookToStore({triggered: bookId}) {
    const unStoredRawBook = model.rawBooks.find(
      rawBook => utils.getBookId(rawBook) === bookId
    );

    unStoredRawBook.marked = false;
    model.storedRawBooks.unshift(unStoredRawBook);
    eventBus.trigger(EventNames.BOOK_IS_STORED);
  }

  _setupActiveBook({triggered: bookId}) {
    if (model.activeNormalizedBookInfo.id !== bookId) {
      const rawBook = model.findRawBookByDataIdAttr(bookId);
      model.activeNormalizedBookInfo = model.getNormalizedBook(rawBook);
      eventBus.trigger(EventNames.SETUP_ACTIVE_BOOK);
    }
  }

  _handleClearAllSearch() {
    this._resetSearchState();
    eventBus.trigger(EventNames.RESET_SEARCH_STATE);
  }

  _resetSearchState() {
    model.search = {
      value: "",
      isLoading: false,
      isError: false,
    };

    model.searchStatistics = {
      numberOfAllFoundBooks: 0,
      numberBooksPerPage: 100,
      indexFirstBookOnPage: 0
    };

    model.rawBooks = [];
    model.activeNormalizedBookInfo = {};
  }

  _handleEnteredSearchRequest({triggered: userSearchValue}) {
    if (model.search.value !== userSearchValue) {
      model.search.value = userSearchValue;
      model.searchStatistics.indexFirstBookOnPage = 0;
      this._startAsyncSearchRequest();
    }
  }

  _createObjWithUrlParams() {
    const numberOfPage = utils.getNumberOfPage({
      indexFirstBookOnPage: model.searchStatistics.indexFirstBookOnPage,
      numberBooksPerPage: model.searchStatistics.numberBooksPerPage
    })

    return {
      [Url.NAME_OF_PARAM.SEARCH_STRING]: model.search.value,
      [Url.NAME_OF_PARAM.NUMBER_OF_PAGE]: numberOfPage
    }
  }

  _handleSuccessResponse(searchingData) {
    const foundBooks = searchingData[ResponseKey.BOOKS];

    if (!foundBooks || !Array.isArray(foundBooks) || foundBooks.length === 0) {
      this._handleErrorResponse({message: "no found books"})
      return;
    }

    const needReplaceSearchResults =
      model.search.value !== this._previousSearchValue;
    this._setupModelWithSuccessResponseData(
      searchingData,
      needReplaceSearchResults
    );
    this._previousSearchValue = model.search.value;

    eventBus.trigger(EventNames.SUCCESS_SEARCH_REQUEST);
  }

  _handleErrorResponse(error) {
    model.search.isLoading = false;
    model.search.isError = true;
    eventBus.trigger(EventNames.ERROR_SEARCH_REQUEST, error.message);
  }

  _setupModelWithSuccessResponseData(searchingData, needReplaceSearchResults) {
    model.search.isLoading = false;
    model.search.isError = false;
    model.searchStatistics.numberOfAllFoundBooks =
      searchingData[ResponseKey.NUMBER_FOUND_BOOKS];
    model.activeNormalizedBookInfo = {};
    eventBus.trigger(EventNames.SETUP_ACTIVE_BOOK);

    if (needReplaceSearchResults) {
      model.rawBooks = searchingData[ResponseKey.BOOKS];
      model.searchStatistics.indexFirstBookOnPage = 0;
    } else {
      model.rawBooks.push(...searchingData[ResponseKey.BOOKS]);
    }
  }

  _bindThisToMethods() {
    this._setupActiveBook = this._setupActiveBook.bind(this);
    this._handleClearAllSearch = this._handleClearAllSearch.bind(this);
    this._handleNextSearchResults = this._handleNextSearchResults.bind(this);
    this._handlePrevSearchResults = this._handlePrevSearchResults.bind(this);
    this._handleSuccessResponse = this._handleSuccessResponse.bind(this);
    this._handleErrorResponse = this._handleErrorResponse.bind(this);
    this._handleEnteredSearchRequest =
      this._handleEnteredSearchRequest.bind(this);
    this._handleAddBookToStore = this._handleAddBookToStore.bind(this);

    this._handleMarkStoredBook = this._handleMarkStoredBook.bind(this);
    this._handleUnMarkStoredBook = this._handleUnMarkStoredBook.bind(this);
    this._handleRemoveStoredBook = this._handleRemoveStoredBook.bind(this);
  }

  _startAsyncSearchRequest() {
    model.search.isLoading = true;
    model.search.isError = false;
    eventBus.trigger(EventNames.START_SEARCH_REQUEST, model.search.value);
    api.makeSearchRequest(this._createObjWithUrlParams())
      .then(this._handleSuccessResponse, this._handleErrorResponse);
  }
}

export {Controller}
