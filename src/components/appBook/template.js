import "./appBook.scss";

const NameInSelector = {
  APP_BOOK: "appBook",
  APP_BOOK__TITLE: "appBook__title",
  APP_BOOK__SUB_TITLE: "appBook__subTitle",
  APP_BOOK__CONTROL: "appBook__control",
  APP_BOOK__BTN_ADD: "appBook__btn--add",
  APP_BOOK__BLOCK_LANGUAGE: "appBook__block--language",
  APP_BOOK__BLOCK_FULL_TEXT: "appBook__block--fullText",
  APP_BOOK__BLOCK_FIRST_YEAR: "appBook__block--firstYear",
  APP_BOOK__BLOCK_YEARS: "appBook__block--years",
  APP_BOOK__BLOCK_AUTHOR: "appBook__block--author",
  APP_BOOK__BLOCK_ISBN: "appBook__block--isbn",
  APP_BOOK__BLOCK_HIDDEN: "hidden",
  APP_BOOK__BLOCK_VALUE: "appBook__blockValue",
}

const Selectors = {
  APP_BOOK: `.${NameInSelector.APP_BOOK}`,
  APP_BOOK__TITLE: `.${NameInSelector.APP_BOOK__TITLE}`,
  APP_BOOK__SUB_TITLE: `.${NameInSelector.APP_BOOK__SUB_TITLE}`,
  APP_BOOK__CONTROL: `.${NameInSelector.APP_BOOK__CONTROL}`,
  APP_BOOK__BTN_ADD: `.${NameInSelector.APP_BOOK__BTN_ADD}`,
  APP_BOOK__BLOCK_LANGUAGE: `.${NameInSelector.APP_BOOK__BLOCK_LANGUAGE}`,
  APP_BOOK__BLOCK_FULL_TEXT: `.${NameInSelector.APP_BOOK__BLOCK_FULL_TEXT}`,
  APP_BOOK__BLOCK_FIRST_YEAR: `.${NameInSelector.APP_BOOK__BLOCK_FIRST_YEAR}`,
  APP_BOOK__BLOCK_YEARS: `.${NameInSelector.APP_BOOK__BLOCK_YEARS}`,
  APP_BOOK__BLOCK_AUTHOR: `.${NameInSelector.APP_BOOK__BLOCK_AUTHOR}`,
  APP_BOOK__BLOCK_ISBN: `.${NameInSelector.APP_BOOK__BLOCK_ISBN}`,
  APP_BOOK__BLOCK_HIDDEN: `.${NameInSelector.APP_BOOK__BLOCK_HIDDEN}`,
  APP_BOOK__BLOCK_VALUE: `.${NameInSelector.APP_BOOK__BLOCK_VALUE}`
}

function createAppBookTemplate() {
  return `
    <section class="appBook">

      <h2 class="${NameInSelector.APP_BOOK__TITLE}">
        The Lord of the Rings
      </h2>

      <h4 class="${NameInSelector.APP_BOOK__SUB_TITLE}">
        Official Game Secrets
      </h4>
      
      <p class="appBook__block ${NameInSelector.APP_BOOK__BLOCK_AUTHOR}">
        <span class="appBook__blockKey">
          author: 
        </span>
        <span class="${NameInSelector.APP_BOOK__BLOCK_VALUE}">
          Lorem ipsum dolor.
        </span>
      </p>

      <p class="appBook__block ${NameInSelector.APP_BOOK__BLOCK_LANGUAGE}">
        <span class="appBook__blockKey">
          languages available:
        </span>
        <span class="${NameInSelector.APP_BOOK__BLOCK_VALUE}">
          ger, rus, eng
        </span>
      </p>

      <p class="appBook__block ${NameInSelector.APP_BOOK__BLOCK_YEARS}">
        <span class="appBook__blockKey">
          years published:
        </span>
        <span class="${NameInSelector.APP_BOOK__BLOCK_VALUE}">
          1983, 1997, 1981, 1975, 1967, 1989, 1954, 1969
        </span>
      </p>
      
      <p class="appBook__block ${NameInSelector.APP_BOOK__BLOCK_FIRST_YEAR}">
        <span class="appBook__blockKey">
          first publish year:
        </span>
        <span class="${NameInSelector.APP_BOOK__BLOCK_VALUE}">
          1930
        </span>
      </p>      

      <p class="appBook__block ${NameInSelector.APP_BOOK__BLOCK_FULL_TEXT}">
        <span class="appBook__blockKey">
          full text available:
        </span>
        <span class="${NameInSelector.APP_BOOK__BLOCK_VALUE}">
          yes
        </span>
      </p>

      <p class="appBook__block ${NameInSelector.APP_BOOK__BLOCK_ISBN}">
        <span class="appBook__blockKey">
          ISBN
        </span>
        <span class="${NameInSelector.APP_BOOK__BLOCK_VALUE}">
          9788377582558
        </span>
      </p>

      <div class="${NameInSelector.APP_BOOK__CONTROL}">

        <button class="appBook__btn ${NameInSelector.APP_BOOK__BTN_ADD}">
          Add book to Read List
        </button>

      </div>

    </section>
  `
}

export {createAppBookTemplate, Selectors, NameInSelector};
