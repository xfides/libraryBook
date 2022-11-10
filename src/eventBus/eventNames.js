const EventNames = {
  ENTERED_SEARCH_REQUEST: "enteredSearchRequest",
  START_SEARCH_REQUEST: "startSearchRequest",
  ERROR_SEARCH_REQUEST: "errorSearchRequest",
  SUCCESS_SEARCH_REQUEST: "successSearchRequest",
  //   ---   ---   ---
  CLEAR_ALL_SEARCH: "clearAllSearch",
  NEXT_SEARCH_RESULTS: "nextSearchResults",
  PREV_SEARCH_RESULTS: "prevSearchResults",
  RESET_SEARCH_STATE: "resetSearchState",
  //   ---   ---   ---
  USER_BOOK_SELECTION: "userBookSelection",
  SETUP_ACTIVE_BOOK: "setupActiveBook",
  ADD_BOOK_TO_STORE: "addBookToStore",
  BOOK_IS_STORED: "bookIsStored",
  STORED_BOOK_REMOVED: "storedBookRemoved",
  CLEAR_STORED_BOOKS: "clearStoredBooks",
  STORED_BOOKS_DELETED: "storedBooksDeleted",
  //   ---   ---   ---
  MARK_STORED_BOOK: "markStoredBook",
  UNMARK_STORED_BOOK: "unMarkStoredBook",
  REMOVE_STORED_BOOK: "removeStoredBook",
  CHANGED_MARK_STORED_BOOK: "changedMarkOfStoredBook",
}

export {EventNames}
