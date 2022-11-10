import {utils} from "../utils";

const Url = {
  HOST: "https://openlibrary.org",
  PATH_FOR_QUERY: "search.json",
  NAME_OF_PARAM: {
    SEARCH_STRING: "q",
    NUMBER_OF_PAGE: "page"
  }
}

const ResponseKey = {
  BOOKS: 'docs',
  NUMBER_FOUND_BOOKS: "numFound",
  INDEX_FIRST_BOOK_ON_PAGE: "start"
}

class Api {

  async makeSearchRequest(urlParams) {
    const url = utils.makeUrl(Url.HOST, Url.PATH_FOR_QUERY, urlParams)
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  }

}

const api = new Api();

export {api, Url, ResponseKey};
