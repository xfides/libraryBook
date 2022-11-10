import "./app.scss";

const NameInSelector = {
  APP__SEARCH: "app__search",
  APP__BOOK: "app__book",
  APP__STORED: "app__stored",
}

const Selectors = {
  APP__SEARCH: `.${NameInSelector.APP__SEARCH}`,
  APP__BOOK: `.${NameInSelector.APP__BOOK}`,
  APP__STORED: `.${NameInSelector.APP__STORED}`
}

function createAppTemplate() {
  return `
    <main class="app">
  
      <div class="${NameInSelector.APP__SEARCH}">
        <!--{{SEARCH}}-->
      </div>
  
      <div class="${NameInSelector.APP__BOOK}">
        <!--{{APP_BOOK}}-->
      </div>
  
      <div class="${NameInSelector.APP__STORED}">
        <!--{{STORED}}-->
      </div>
  
    </main>
  `
}

export {createAppTemplate, Selectors}

