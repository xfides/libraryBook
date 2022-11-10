import {AbstractComponent} from "../AbstractComponent";
import {createSearchResultsItemTemplate} from "./template";

class SearchResultsItem extends AbstractComponent {

  render(items) {
    const templates = items.map((item) => {
      return this._getTemplate(item)
    });

    return this._getDomFromTemplate(templates.join(""));
  }

  _getTemplate(item) {
    return createSearchResultsItemTemplate(item);
  }

  _getDomFromTemplate(template) {
    const templateTag = document.createElement(`template`);
    templateTag.innerHTML = template;

    return templateTag.content;
  }

}

export {SearchResultsItem}
