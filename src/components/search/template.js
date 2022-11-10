import "./search.scss";

const NameInSelector = {
  SEARCH__QUERY: "search__query",
  SEARCH__RESULTS: "search__results",
  SEARCH__COVERAGE: "search__coverage",
}

const Selectors = {
  SEARCH__QUERY: `.${NameInSelector.SEARCH__QUERY}`,
  SEARCH__RESULTS: `.${NameInSelector.SEARCH__RESULTS}`,
  SEARCH__COVERAGE: `.${NameInSelector.SEARCH__COVERAGE}`
}

function createSearchTemplate() {
  return `
    <div class="search">

      <header class="${NameInSelector.SEARCH__QUERY}">
        <!--{{SEARCH_QUERY}}-->
      </header>

      <div class="${NameInSelector.SEARCH__RESULTS}">
        <!--{{SEARCH_RESULTS}}-->
      </div>

      <footer class="${NameInSelector.SEARCH__COVERAGE}">
        <!--{{SEARCH_COVERAGE}}-->
      </footer>

    </div>
  `
}

export {createSearchTemplate, Selectors}
