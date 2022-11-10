import "./searchQuery.scss";

const NameInSelector = {
  SEARCH_QUERY: "searchQuery",
  SEARCH_QUERY_LOADING: 'searchQuery--loading',
  SEARCH_QUERY_ERROR: 'searchQuery--error',
  SEARCH_QUERY__INPUT: "searchQuery__input",
  SEARCH_QUERY__BTN: "searchQuery__btn"

}

const Selectors = {
  SEARCH_QUERY: `.${NameInSelector.SEARCH_QUERY}`,
  SEARCH_QUERY_LOADING: `.${NameInSelector.SEARCH_QUERY_LOADING}`,
  SEARCH_QUERY_ERROR: `.${NameInSelector.SEARCH_QUERY_ERROR}`,
  SEARCH_QUERY__INPUT: `.${NameInSelector.SEARCH_QUERY__INPUT}`,
  SEARCH_QUERY__BTN: `.${NameInSelector.SEARCH_QUERY__BTN}`
}


function createSearchQueryTemplate() {
  return `
    <div class="${NameInSelector.SEARCH_QUERY}">

      <input type="text" class="${NameInSelector.SEARCH_QUERY__INPUT}">

      <button class="${NameInSelector.SEARCH_QUERY__BTN}">Go!</button>

    </div>
  `
}

export {createSearchQueryTemplate, Selectors, NameInSelector}
