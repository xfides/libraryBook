import "./stored.scss";
import {
  NameInSelector as ItemBookNameInSelector,
  Selectors as ItemBookSelectors
} from "../storedBook/template";

const NameInSelector = {
  STORED_NUMBER_ALL_BOOKS: "stored__numberAllBooks",
  STORED_NUMBER_MARKED_BOOKS: "stored__numberMarkedBooks",
  STORED_LIST: "stored__list",
  STORED_BTN: "stored__btn",
  STORED_BTN_CLEAR_LIST: "stored__btn--clearList",
  STORED_BOOK_MARKED: ItemBookNameInSelector.STORED_BOOK_MARKED,
  STORED_BOOK__BTN: ItemBookNameInSelector.STORED_BOOK__BTN,
  STORED_BOOK__BTN_MARK: ItemBookNameInSelector.STORED_BOOK__BTN_MARK,
  STORED_BOOK__BTN_UNMARK: ItemBookNameInSelector.STORED_BOOK__BTN_UNMARK,
  STORED_BOOK__BTN_REMOVE: ItemBookNameInSelector.STORED_BOOK__BTN_REMOVE,
}

const Selectors = {
  STORED_NUMBER_ALL_BOOKS: `.${NameInSelector.STORED_NUMBER_ALL_BOOKS}`,
  STORED_NUMBER_MARKED_BOOKS: `.${NameInSelector.STORED_NUMBER_MARKED_BOOKS}`,
  STORED_LIST: `.${NameInSelector.STORED_LIST}`,
  STORED_BTN: `.${NameInSelector.STORED_BTN}`,
  STORED_BTN_CLEAR_LIST: `.${NameInSelector.STORED_BTN_CLEAR_LIST}`,
  STORED_BOOK_MARKED: ItemBookSelectors.STORED_BOOK_MARKED,
  STORED_BOOK__BTN: ItemBookSelectors.STORED_BOOK__BTN,
  STORED_BOOK__BTN_MARK: ItemBookSelectors.STORED_BOOK__BTN_MARK,
  STORED_BOOK__BTN_UNMARK: ItemBookSelectors.STORED_BOOK__BTN_UNMARK,
  STORED_BOOK__BTN_REMOVE: ItemBookSelectors.STORED_BOOK__BTN_REMOVE,
}

function createStoredTemplate() {
  return `
    <div class="stored">

      <header class="stored__header">

        <h1 class="stored__title">To read list...</h1>

        <p class="stored__statistics">
        
          <span class="${NameInSelector.STORED_NUMBER_ALL_BOOKS}">3</span>
          books, 
          <span class="${NameInSelector.STORED_NUMBER_MARKED_BOOKS}">1</span>
          read
          
          <button class="stored__btn stored__btn--clearList">
            Clear Read List
          </button>
          
        </p>

      </header>

      <ul class="${NameInSelector.STORED_LIST}">
        <!--{{STORED__BOOK}}-->
      </ul>

    </div>
  `
}

export {createStoredTemplate, Selectors, NameInSelector}
