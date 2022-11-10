import {utils} from "../utils";
import {wrapInProxy} from "../services/proxyToLocalStorage"

const NO_TITLE_FOR_BOOK = "There is no title for this book";

class Model {
  constructor() {
    this.search = {
      value: "",
      isLoading: false,
      isError: false,
    };
    this.searchStatistics = {
      numberOfAllFoundBooks: 0,
      numberBooksPerPage: 100,
      indexFirstBookOnPage: 0
    };
    this.rawBooks = [];
    this.storedRawBooks = wrapInProxy([]);
    this.activeNormalizedBookInfo = {};
  }

  getNormalizedBooks() {
    const bottomIndex = this.searchStatistics.indexFirstBookOnPage;
    const topIndex = bottomIndex + this.searchStatistics.numberBooksPerPage;

    const rawBooksInCurrentPage = this.rawBooks.filter((_, indexRawBook) => {
      return indexRawBook >= bottomIndex && indexRawBook < topIndex;
    });

    return rawBooksInCurrentPage.map(this.getNormalizedBook);
  }

  getNormalizedBooksFromStore() {
    return this.storedRawBooks.map(this.getNormalizedBook);
  }

  getNormalizedBook(book) {
    return {
      id: utils.getBookId(book["key"]), //string
      title: book["title"] ? book["title"] : NO_TITLE_FOR_BOOK, //string
      subTitle: book["subtitle"], //string
      authorName: book["author_name"], //array
      languages: book["language"], //array
      publishedYears: book["publish_year"], //array
      firstPublishedYear: book["first_publish_year"], //number
      isAvailableFullText: book["has_fulltext"], //bool
      isbn: book["isbn"], //array
      marked: book.marked
    };
  }

  findRawBookByDataIdAttr(dataBookId) {
    return this.rawBooks.find(
      rawBook => utils.getBookId(rawBook["key"]) === dataBookId
    );
  }

}

const model = new Model();

export {model}
