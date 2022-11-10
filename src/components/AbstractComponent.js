const Error = {
  NO_INSTANTIATE: "Please use CONCRETE component methods. NOT ABSTRACT"
}

class AbstractComponent {

  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(Error.NO_INSTANTIATE);
    }

    this._dom = null;
  }

  render(data) {
    throw new Error(Error.NO_INSTANTIATE);
  }

  _getTemplate() {
    throw new Error(Error.NO_INSTANTIATE);
  }

  _getDomFromTemplate(template) {
    if (this._dom) {
      return this._dom;
    }

    const templateTag = document.createElement(`template`);
    templateTag.innerHTML = template;

    return templateTag.content.firstElementChild;
  }

  _isRendered() {
    if (!this._dom || !this._dom.parentNode) {
      return false;
    }

    return !(this._dom.parentNode instanceof DocumentFragment);
  }

}

export {AbstractComponent}
