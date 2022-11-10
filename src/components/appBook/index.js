import {AbstractComponent} from "../AbstractComponent";
import {createAppBookTemplate, NameInSelector, Selectors} from "./template";
import {eventBus} from '../../eventBus';
import {EventNames} from '../../eventBus/eventNames';
import {model} from '../../model';
import {IDENTIFYING_BOOK_SELECTOR} from "../../utils/constants"
import {utils} from "../../utils"

class AppBook extends AbstractComponent {

  constructor() {
    super();
    this.render = this.render.bind(this);

    this._setEventBusHandlers();
  }

  render() {
    const template = this._getTemplate();
    this._dom = this._getDomFromTemplate(template);
    if (!this._isRendered()) {
      this._setBtnHandler()
    }
    this._renderBookInfo();

    return this._dom;
  }

  _getTemplate() {
    return createAppBookTemplate();
  }

  _renderBookInfo() {
    const activeBook = model.activeNormalizedBookInfo;

    this._dom.setAttribute(
      IDENTIFYING_BOOK_SELECTOR,
      activeBook.id ? activeBook.id : ""
    );

    this._dom.querySelector(Selectors.APP_BOOK__TITLE).innerHTML =
      activeBook.title ? activeBook.title : "No Book Title";

    this._renderBookSubtitle(activeBook);
    this._renderBookAuthor(activeBook);
    this._renderBookLanguage(activeBook);
    this._renderBookYears(activeBook);
    this._renderBookFirstYear(activeBook);
    this._renderBookIsFullText(activeBook);
    this._renderBookISBN(activeBook);
    this._renderBookControl(activeBook);
    this._renderBookBtnAdd(activeBook);
  }

  _renderBookSubtitle(activeBook) {
    if (activeBook.subTitle) {
      this._dom.querySelector(`${Selectors.APP_BOOK__SUB_TITLE}`)
        .innerHTML = activeBook.subTitle;
      this._makeAppBlockVisible(Selectors.APP_BOOK__SUB_TITLE);
    } else {
      this._makeAppBlockHidden(Selectors.APP_BOOK__SUB_TITLE);
    }
  }

  _renderBookAuthor(activeBook) {
    if (activeBook.authorName) {
      this._dom.querySelector(
        `${Selectors.APP_BOOK__BLOCK_AUTHOR} ${Selectors.APP_BOOK__BLOCK_VALUE}`
      ).innerHTML = utils.getStrFromTopArrItems({arr: activeBook.authorName});
      this._makeAppBlockVisible(Selectors.APP_BOOK__BLOCK_AUTHOR)
    } else {
      this._makeAppBlockHidden(Selectors.APP_BOOK__BLOCK_AUTHOR);
    }
  }

  _renderBookLanguage(activeBook) {
    if (activeBook.languages) {
      this._dom.querySelector(
        `${Selectors.APP_BOOK__BLOCK_LANGUAGE} ${Selectors.APP_BOOK__BLOCK_VALUE}`
      ).innerHTML = utils.getStrFromTopArrItems({arr: activeBook.languages});
      this._makeAppBlockVisible(Selectors.APP_BOOK__BLOCK_LANGUAGE)
    } else {
      this._makeAppBlockHidden(Selectors.APP_BOOK__BLOCK_LANGUAGE);
    }
  }

  _renderBookYears(activeBook) {
    if (activeBook.publishedYears) {
      this._dom.querySelector(
        `${Selectors.APP_BOOK__BLOCK_YEARS} ${Selectors.APP_BOOK__BLOCK_VALUE}`
      ).innerHTML =
        utils.getStrFromTopArrItems({arr: activeBook.publishedYears});
      this._makeAppBlockVisible(Selectors.APP_BOOK__BLOCK_YEARS)
    } else {
      this._makeAppBlockHidden(Selectors.APP_BOOK__BLOCK_YEARS);
    }
  }

  _renderBookFirstYear(activeBook) {
    if (activeBook.firstPublishedYear) {
      this._dom.querySelector(
        `${Selectors.APP_BOOK__BLOCK_FIRST_YEAR} ${Selectors.APP_BOOK__BLOCK_VALUE}`
      ).innerHTML = activeBook.firstPublishedYear;
      this._makeAppBlockVisible(Selectors.APP_BOOK__BLOCK_FIRST_YEAR);
    } else {
      this._makeAppBlockHidden(Selectors.APP_BOOK__BLOCK_FIRST_YEAR);
    }
  }

  _renderBookIsFullText(activeBook) {
    if (activeBook.isAvailableFullText) {
      this._dom.querySelector(
        `${Selectors.APP_BOOK__BLOCK_FULL_TEXT} ${Selectors.APP_BOOK__BLOCK_VALUE}`
      ).innerHTML =
        utils.transformBoolToHumanString(activeBook.isAvailableFullText);
      this._makeAppBlockVisible(Selectors.APP_BOOK__BLOCK_FULL_TEXT);
    } else {
      this._makeAppBlockHidden(Selectors.APP_BOOK__BLOCK_FULL_TEXT);
    }
  }

  _renderBookISBN(activeBook) {
    if (activeBook.isbn) {
      this._dom.querySelector(
        `${Selectors.APP_BOOK__BLOCK_ISBN} ${Selectors.APP_BOOK__BLOCK_VALUE}`
      ).innerHTML = utils.getStrFromTopArrItems({arr: activeBook.isbn});
      this._makeAppBlockVisible(Selectors.APP_BOOK__BLOCK_ISBN)
    } else {
      this._makeAppBlockHidden(Selectors.APP_BOOK__BLOCK_ISBN);
    }
  }

  _renderBookControl(activeBook) {
    if (activeBook.id) {
      this._dom.querySelector(Selectors.APP_BOOK__CONTROL)
        .classList
        .remove(NameInSelector.APP_BOOK__BLOCK_HIDDEN)
    } else {
      this._dom.querySelector(Selectors.APP_BOOK__CONTROL)
        .classList
        .add(NameInSelector.APP_BOOK__BLOCK_HIDDEN)
    }
  }

  _renderBookBtnAdd() {
    this._dom.querySelector(Selectors.APP_BOOK__BTN_ADD).disabled =
      this._checkIsActiveBookStored();
  }

  _setEventBusHandlers() {
    eventBus.on(EventNames.SETUP_ACTIVE_BOOK, this.render);
    eventBus.on(EventNames.BOOK_IS_STORED, this.render);
    eventBus.on(EventNames.STORED_BOOK_REMOVED, this.render);
    eventBus.on(EventNames.STORED_BOOKS_DELETED, this.render);
    eventBus.on(EventNames.CLEAR_ALL_SEARCH, this.render);
  }

  _setBtnHandler() {
    this._dom.querySelector(Selectors.APP_BOOK__BTN_ADD).addEventListener(
      "click",
      () => {
        if (!this._checkIsActiveBookStored()) {
          eventBus.trigger(
            EventNames.ADD_BOOK_TO_STORE,
            model.activeNormalizedBookInfo.id
          );
        }
      }
    );
  }

  _makeAppBlockHidden(blockSelector) {
    this._dom.querySelector(blockSelector).classList.add(
      NameInSelector.APP_BOOK__BLOCK_HIDDEN
    );
  }

  _makeAppBlockVisible(blockSelector) {
    this._dom.querySelector(blockSelector).classList.remove(
      NameInSelector.APP_BOOK__BLOCK_HIDDEN
    );
  }

  _checkIsActiveBookStored() {
    return model.storedRawBooks.some(
      rawBook => utils.getBookId(rawBook) === model.activeNormalizedBookInfo.id
    );
  }
}

export {AppBook}
