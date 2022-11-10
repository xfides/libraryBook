import {AbstractComponent} from "../AbstractComponent";
import {createStoredBookTemplate} from "./template";

class StoredBook extends AbstractComponent {

  render(items) {
    const templates = items.map((item) => {
      return this._getTemplate(item)
    });

    return this._getDomFromTemplate(templates.join(""));
  }

  _getTemplate(item) {
    return createStoredBookTemplate(item);
  }

  _getDomFromTemplate(template) {
    const templateTag = document.createElement(`template`);
    templateTag.innerHTML = template;

    return templateTag.content;
  }

}

export {StoredBook}
