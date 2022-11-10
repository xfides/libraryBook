import {AbstractComponent} from "../AbstractComponent";
import {createStoredTemplate, Selectors, NameInSelector} from "./template";
import {StoredBook} from "../storedBook";
import {eventBus} from '../../eventBus';
import {EventNames} from '../../eventBus/eventNames';
import {model} from '../../model';
import {IDENTIFYING_BOOK_SELECTOR} from "../../utils/constants";

class Stored extends AbstractComponent {

  constructor() {
    super();
    this._components = {
      storedBook: new StoredBook()
    }

    this.render = this.render.bind(this);
    this._handleActionsWithBooks = this._handleActionsWithBooks.bind(this);

    this._setEventBusHandlers();
  }

  render() {
    const template = this._getTemplate();
    this._dom = this._getDomFromTemplate(template);
    this._dom.addEventListener("click", this._handleActionsWithBooks)
    this._dom.querySelector(Selectors.STORED_LIST).innerHTML = "";

    if (!model.storedRawBooks.length) {
      this._renderStoredStatistics({numberAllBooks: 0, numberMarkedBooks: 0});
      return this._dom;
    }

    const kindsOfBooks = this._getKindsOfStoredBooks();
    this._renderStoredStatistics({
      numberAllBooks: kindsOfBooks.allStoredBooks.length,
      numberMarkedBooks: kindsOfBooks.markedStoredBooks.length,
    });

    const storedBooksDom = this._components.storedBook.render(
      kindsOfBooks.allStoredBooks
    );
    this._dom.querySelector(Selectors.STORED_LIST).append(storedBooksDom);

    return this._dom;
  }

  _getTemplate() {
    return createStoredTemplate();
  }

  _renderStoredStatistics({numberAllBooks, numberMarkedBooks}) {
    this._dom.querySelector(Selectors.STORED_NUMBER_ALL_BOOKS).innerHTML =
      numberAllBooks;
    this._dom.querySelector(Selectors.STORED_NUMBER_MARKED_BOOKS).innerHTML =
      numberMarkedBooks;
    this._dom.querySelector(Selectors.STORED_BTN_CLEAR_LIST).disabled =
      numberAllBooks === 0;
  }

  _getKindsOfStoredBooks() {
    const allStoredBooks = model.getNormalizedBooksFromStore()
      .sort((normalizedBook, _) => {
        return normalizedBook.marked ? 1 : -1
      });
    const markedStoredBooks = allStoredBooks.filter(
      storedBook => storedBook.marked
    )

    return {
      allStoredBooks,
      markedStoredBooks
    }
  }

  _setEventBusHandlers() {
    eventBus.on(EventNames.BOOK_IS_STORED, this.render);
    eventBus.on(EventNames.CHANGED_MARK_STORED_BOOK, this.render);
    eventBus.on(EventNames.STORED_BOOK_REMOVED, this.render);
    eventBus.on(EventNames.STORED_BOOKS_DELETED, this.render);
  }

  _handleActionsWithBooks(evt) {
    if (evt.target.closest(Selectors.STORED_BTN_CLEAR_LIST)) {
      eventBus.trigger(EventNames.CLEAR_STORED_BOOKS);
      return;
    }

    if (!evt.target.closest(Selectors.STORED_BOOK__BTN)) {
      return;
    }

    this._handleActionWithStoredBook(evt);
  }

  _handleActionWithStoredBook(evt) {
    const btnDom = evt.target.closest(Selectors.STORED_BOOK__BTN);
    const storedBookDom = evt.target.closest(`[${IDENTIFYING_BOOK_SELECTOR}]`);
    const storedBookId = storedBookDom.getAttribute(IDENTIFYING_BOOK_SELECTOR);

    if (btnDom.classList.contains(NameInSelector.STORED_BOOK__BTN_MARK)) {
      eventBus.trigger(EventNames.MARK_STORED_BOOK, storedBookId);
      return;
    }

    if (btnDom.classList.contains(NameInSelector.STORED_BOOK__BTN_UNMARK)) {
      eventBus.trigger(EventNames.UNMARK_STORED_BOOK, storedBookId);
      return;
    }

    if (btnDom.classList.contains(NameInSelector.STORED_BOOK__BTN_REMOVE)) {
      eventBus.trigger(EventNames.REMOVE_STORED_BOOK, storedBookId);
    }
  }

}

export {Stored}
