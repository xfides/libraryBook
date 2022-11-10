const KEY_FOR_DATA_IN_LS = 'storedRawBooks';

const proxyConfig = {
  get(storedRawBooks, nameProp, receiver) {

    if (storedRawBooks.length !== 0) {
      return Reflect.get(storedRawBooks, nameProp, receiver);
    }

    let storedRawBooksFromLS;

    try {
      storedRawBooksFromLS =
        JSON.parse(localStorage.getItem(KEY_FOR_DATA_IN_LS) || []);
    } catch (err) {
      storedRawBooksFromLS = [];
    }

    if (storedRawBooksFromLS.length !== 0) {
      storedRawBooks.splice(0, 0, ...storedRawBooksFromLS);
      return Reflect.get(storedRawBooks, nameProp, receiver);
    }

    return Reflect.get(storedRawBooks, nameProp, receiver);
  },

  set(storedRawBooks, nameProp, newValue) {

    if (nameProp === "length" && newValue === 0) {
      localStorage.clear();
    }

    storedRawBooks[nameProp] = newValue;

    localStorage.setItem(
      KEY_FOR_DATA_IN_LS,
      JSON.stringify(storedRawBooks)
    )

    return true;
  },
}

function wrapInProxy(storedRawBooks) {
  return new Proxy(storedRawBooks, proxyConfig);
}

export {wrapInProxy};
