import {NUMBER_ARR_ITEMS_TO_RENDER, DELIMITER_STRING_ITEMS} from "./constants";

const UrlSign = {
  PARAMS_CONNECTOR: "&",
  PARAMS_ASSIGNMENT: "=",
  PARAMS_ADDING: "?",
  PATH_DELIMITER: "/"
}

class Utils {

  makeUrl(host = "", path = "", params = {}) {
    host = this._clearUrlHost(host);
    const stringParams = this._processUrlParamsToString(params);

    return (
      host
      + UrlSign.PATH_DELIMITER
      + path
      + UrlSign.PARAMS_ADDING
      + stringParams
    );
  }

  _processUrlParamsToString(paramsObj) {
    const resultParamsString = "";

    return Object.entries(paramsObj).reduce((resStr, paramArr, index) => {
      const paramConnector = index !== 0 ? UrlSign.PARAMS_CONNECTOR : "";
      resStr += paramConnector + paramArr.join(UrlSign.PARAMS_ASSIGNMENT);

      return resStr;
    }, resultParamsString);
  }

  _clearUrlHost(urlHost) {
    const lastSymbolInUrlHost = urlHost[urlHost.length - 1];
    if (lastSymbolInUrlHost === UrlSign.PATH_DELIMITER) {
      return urlHost.slice(0, urlHost.length - 1);
    }

    return urlHost;
  }

  getBookId(rawBookOrRawBookKey) {
    const apiBookKey = typeof rawBookOrRawBookKey === 'string'
      ? rawBookOrRawBookKey
      : rawBookOrRawBookKey["key"];

    const DELIMITER = "/";
    const NOT_FOUND = -1;
    const indexLastDelimiter = apiBookKey.lastIndexOf(DELIMITER);

    if (indexLastDelimiter === NOT_FOUND) {
      return Math.random().toString(36).substr(2, 10);
    }

    return apiBookKey.slice(indexLastDelimiter + DELIMITER.length);
  }

  getNumberOfPage({
    indexFirstBookOnPage,
    numberBooksPerPage
  }) {
    const API_PAGE_NUMBER_OFFSET = 1;
    return (
      (indexFirstBookOnPage / numberBooksPerPage | 0) + API_PAGE_NUMBER_OFFSET
    );
  }

  getStrFromTopArrItems({
      arr,
      strDelimiter = DELIMITER_STRING_ITEMS,
      numLimiter = NUMBER_ARR_ITEMS_TO_RENDER
    }
  ) {
    return arr
      .filter((_, indexOfItem) => {
        return indexOfItem < numLimiter
      })
      .join(strDelimiter);
  }

  transformBoolToHumanString(bool) {
    return bool ? "yes" : "no";
  }

}

const utils = new Utils();

export {utils}
