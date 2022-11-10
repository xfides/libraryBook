import "./searchResults.scss";
import {
  NameInSelector as ItemNameInSelector,
  Selectors as ItemSelectors
} from "../searchResultsItem/template";

const NameInSelector = {
  SEARCH_RESULTS: "searchResults",
  SEARCH_RESULTS_ITEM: ItemNameInSelector.SEARCH_RESULTS_ITEM,
  SEARCH_RESULTS_ITEM_ACTIVE: ItemNameInSelector.SEARCH_RESULTS_ITEM_ACTIVE
}

const Selectors = {
  SEARCH_RESULTS: `.${NameInSelector.SEARCH_RESULTS}`,
  SEARCH_RESULTS_ITEM: ItemSelectors.SEARCH_RESULTS_ITEM,
  SEARCH_RESULTS_ITEM_ACTIVE: ItemSelectors.SEARCH_RESULTS_ITEM_ACTIVE
}

function createSearchResultsTemplate() {
  return `
    <ul class="${NameInSelector.SEARCH_RESULTS}">
      <!--li.searchResults__item-->
    </ul>
  `
}

export {createSearchResultsTemplate, Selectors, NameInSelector}
