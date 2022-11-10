import "./searchCoverage.scss";

const NameInSelector = {
  SEARCH_COVERAGE__CONTENT: "searchCoverage__content",
  SEARCH_COVERAGE__CONTENT_HIDDEN: "hidden",
  SEARCH_COVERAGE__VALUE_FOUND: "searchCoverage__value--found",
  SEARCH_COVERAGE__VALUE_START: "searchCoverage__value--start",
  SEARCH_COVERAGE__VALUE_SIZE: "searchCoverage__value--size",
  SEARCH_COVERAGE__BTN: "searchCoverage__btn",
  SEARCH_COVERAGE__BTN_PREV: "searchCoverage__btn--prev",
  SEARCH_COVERAGE__BTN_NEXT: "searchCoverage__btn--next",
  SEARCH_COVERAGE__BTN_CLEAR: "searchCoverage__btn--clear",
}

const Selectors = {
  SEARCH_COVERAGE__CONTENT: `.${NameInSelector.SEARCH_COVERAGE__CONTENT}`,
  SEARCH_COVERAGE__CONTENT_HIDDEN: `
    .${NameInSelector.SEARCH_COVERAGE__CONTENT_HIDDEN}
  `,
  SEARCH_COVERAGE__VALUE_FOUND: `.${NameInSelector.SEARCH_COVERAGE__VALUE_FOUND}`,
  SEARCH_COVERAGE__VALUE_START: `.${NameInSelector.SEARCH_COVERAGE__VALUE_START}`,
  SEARCH_COVERAGE__VALUE_SIZE: `.${NameInSelector.SEARCH_COVERAGE__VALUE_SIZE}`,
  SEARCH_COVERAGE__BTN: `.${NameInSelector.SEARCH_COVERAGE__BTN}`,
  SEARCH_COVERAGE__BTN_PREV: `.${NameInSelector.SEARCH_COVERAGE__BTN_PREV}`,
  SEARCH_COVERAGE__BTN_NEXT: `.${NameInSelector.SEARCH_COVERAGE__BTN_NEXT}`,
  SEARCH_COVERAGE__BTN_CLEAR: `.${NameInSelector.SEARCH_COVERAGE__BTN_CLEAR}`,

}

function createSearchCoverageTemplate() {
  return `
    <div class="searchCoverage">

      <div class="${NameInSelector.SEARCH_COVERAGE__CONTENT}">
      
        <p class="searchCoverage__blockInfo">
  
          <span class="searchCoverage__key">
            Found:
          </span>
          <span class="
            searchCoverage__value 
            ${NameInSelector.SEARCH_COVERAGE__VALUE_FOUND}
          ">
            168
          </span>
  
        </p>
  
        <p class="searchCoverage__blockInfo">
  
          <span class="searchCoverage__key">
            Start:
          </span>
          <span class="
            searchCoverage__value 
            ${NameInSelector.SEARCH_COVERAGE__VALUE_START}
          ">
            100
          </span>
  
        </p>
  
        <p class="searchCoverage__blockInfo">
  
          <span class="searchCoverage__key">
            Page size:
          </span>
          <span class="
            searchCoverage__value 
            ${NameInSelector.SEARCH_COVERAGE__VALUE_SIZE}
          ">
            100
          </span>
  
        </p>
  
        <div class="searchCoverage__blockControl">
  
          <button class="
            ${NameInSelector.SEARCH_COVERAGE__BTN} 
            ${NameInSelector.SEARCH_COVERAGE__BTN_PREV}
          ">
            Prev Results
           </button>
  
          <button class="
            ${NameInSelector.SEARCH_COVERAGE__BTN} 
            ${NameInSelector.SEARCH_COVERAGE__BTN_NEXT}
          ">
            Next Results
          </button>
          
          <button class="
            ${NameInSelector.SEARCH_COVERAGE__BTN} 
            ${NameInSelector.SEARCH_COVERAGE__BTN_CLEAR}
          ">
            Clear All Search
          </button>
  
        </div>

      </div>
      
    </div>
  `
}

export {createSearchCoverageTemplate, Selectors, NameInSelector}
