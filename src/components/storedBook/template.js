import "./storedBook.scss";
import {IDENTIFYING_BOOK_SELECTOR,} from "../../utils/constants";
import {utils} from "../../utils";

const NameInSelector = {
  STORED_BOOK: "storedBook",
  STORED_BOOK_MARKED: "storedBook--marked",
  STORED_BOOK__TITLE: "storedBook__title",
  STORED_BOOK__SUB_TITLE: "storedBook__subTitle",
  STORED_BOOK__AUTHOR: "storedBook__author",
  STORED_BOOK__LANGUAGE: "storedBook__language",
  STORED_BOOK__BTN: "storedBook__btn",
  STORED_BOOK__BTN_MARK: "storedBook__btn--mark",
  STORED_BOOK__BTN_UNMARK: "storedBook__btn--unMark",
  STORED_BOOK__BTN_REMOVE: "storedBook__btn--remove"
}

const Selectors = {
  STORED_BOOK: `.${NameInSelector.STORED_BOOK}`,
  STORED_BOOK_MARKED: `.${NameInSelector.STORED_BOOK_MARKED}`,
  STORED_BOOK__TITLE: `.${NameInSelector.STORED_BOOK__TITLE}`,
  STORED_BOOK__SUB_TITLE: `.${NameInSelector.STORED_BOOK__SUB_TITLE}`,
  STORED_BOOK__AUTHOR: `.${NameInSelector.STORED_BOOK__AUTHOR}`,
  STORED_BOOK__LANGUAGE: `.${NameInSelector.STORED_BOOK__LANGUAGE}`,
  STORED_BOOK__BTN: `.${NameInSelector.STORED_BOOK__BTN}`,
  STORED_BOOK__BTN_MARK: `.${NameInSelector.STORED_BOOK__BTN_MARK}`,
  STORED_BOOK__BTN_UNMARK: `.${NameInSelector.STORED_BOOK__BTN_UNMARK}`,
  STORED_BOOK__BTN_REMOVE: `.${NameInSelector.STORED_BOOK__BTN_REMOVE}`
}

function getLanguagesTemplate(book) {
  if (!book.languages) {
    return ""
  }

  return `
    <span class="${NameInSelector.STORED_BOOK__LANGUAGE}">
      (${utils.getStrFromTopArrItems({arr: book.languages})})
    </span>
  `
}

function getSubTitleTemplate(book) {
  if (!book.subTitle) {
    return "";
  }

  return `
     <h6 class="${NameInSelector.STORED_BOOK__SUB_TITLE}">
        ${book.subTitle}
     </h6>
  `;
}

function getAuthorTemplate(book) {
  if (!book.authorName) {
    return "";
  }

  return `
      <p class="${NameInSelector.STORED_BOOK__AUTHOR}">
        ${utils.getStrFromTopArrItems({arr: book.authorName})}
      </p>
  `;
}

function getBtnMarkTemplate(book) {
  if (book.marked) {
    return "";
  }

  return `
    <button class="${NameInSelector.STORED_BOOK__BTN} 
                   ${NameInSelector.STORED_BOOK__BTN_MARK}
    ">
      Mark as read
    </button>
  `;
}

function getBtnUnMarkTemplate(book) {
  if (!book.marked) {
    return "";
  }

  return `
    <button class="${NameInSelector.STORED_BOOK__BTN} 
                   ${NameInSelector.STORED_BOOK__BTN_UNMARK}
    ">
      Unmark as read
    </button>
  `;
}

function getMarkedNameInSelector(book) {
  return book.marked ? NameInSelector.STORED_BOOK_MARKED : "";
}


function createStoredBookTemplate(book) {
  return `
    <li class="${NameInSelector.STORED_BOOK} ${getMarkedNameInSelector(book)}"
        ${IDENTIFYING_BOOK_SELECTOR}="${book.id}"
    >

      <h5 class="storedBook__title">
        ${book.title}
        ${getLanguagesTemplate(book)}
      </h5>

      ${getSubTitleTemplate(book)}
      
      ${getAuthorTemplate(book)}

      <div class="storedBook__control">
        
        ${getBtnMarkTemplate(book)}
        ${getBtnUnMarkTemplate(book)}

        <button class="storedBook__btn storedBook__btn--remove">
          Remove from list
        </button>

      </div>

    </li>
  `
}

export {createStoredBookTemplate, Selectors, NameInSelector}
