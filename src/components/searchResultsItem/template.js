import "./searchResultsItem.scss";
import {IDENTIFYING_BOOK_SELECTOR} from "../../utils/constants";
import {utils} from "../../utils";

const NameInSelector = {
  SEARCH_RESULTS_ITEM: "searchResultsItem",
  SEARCH_RESULTS_ITEM_ACTIVE: "searchResultsItem--active",
  SEARCH_RESULTS_ITEM__TITLE: "searchResultsItem__title",
  SEARCH_RESULTS_ITEM__SUB_TITLE: "searchResultsItem__subTitle",
  SEARCH_RESULTS_ITEM__LANGUAGE: "searchResultsItem__language",
}

const Selectors = {
  SEARCH_RESULTS_ITEM: `.${NameInSelector.SEARCH_RESULTS_ITEM}`,
  SEARCH_RESULTS_ITEM_ACTIVE: `.${NameInSelector.SEARCH_RESULTS_ITEM_ACTIVE}`,
  SEARCH_RESULTS_ITEM__TITLE: `.${NameInSelector.SEARCH_RESULTS_ITEM__TITLE}`,
  SEARCH_RESULTS_ITEM__SUB_TITLE: `.${NameInSelector.SEARCH_RESULTS_ITEM__SUB_TITLE}`,
  SEARCH_RESULTS_ITEM__LANGUAGE: `.${NameInSelector.SEARCH_RESULTS_ITEM__LANGUAGE}`,
}

function getLanguagesTemplate(book) {
  if (!book.languages) {
    return ""
  }

  return `
    <span class="${NameInSelector.SEARCH_RESULTS_ITEM__LANGUAGE}">
       (${utils.getStrFromTopArrItems({arr: book.languages})})
    </span>
  `
}

function getSubTitleTemplate(book) {
  if (!book.subTitle) {
    return "";
  }

  return `
    <h6 class="${NameInSelector.SEARCH_RESULTS_ITEM__SUB_TITLE}">
      ${book.subTitle}
    </h6>
  `;
}

function createSearchResultsItemTemplate(book) {
  return `
    <li class="${NameInSelector.SEARCH_RESULTS_ITEM}"
        ${IDENTIFYING_BOOK_SELECTOR}="${book.id}"
    >
    
      <h5 class="${NameInSelector.SEARCH_RESULTS_ITEM__TITLE}">
        ${book.title}
        ${getLanguagesTemplate(book)}
      </h5>
    
      ${getSubTitleTemplate(book)}
    
    </li>    
  `;
}

export {createSearchResultsItemTemplate, Selectors, NameInSelector}
