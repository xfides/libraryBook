import {AbstractComponent} from "../AbstractComponent";
import {createSearchQueryTemplate, Selectors, NameInSelector} from "./template";
import {eventBus} from "../../eventBus";
import {EventNames} from "../../eventBus/eventNames";
import {KeyCodes} from "../../utils/constants";

class SearchQuery extends AbstractComponent {

  constructor() {
    super();

    this._bindThisToMethods();
    this._setupEventBusHandlers();
  }

  render() {
    const template = this._getTemplate();
    this._dom = this._getDomFromTemplate(template);

    this._setUserActionHandlers();

    return this._dom;
  }

  _getTemplate() {
    return createSearchQueryTemplate();
  }

  _bindThisToMethods() {
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleResetSearchState = this._handleResetSearchState.bind(this);
    this._handleUserInputRequest = this._handleUserInputRequest.bind(this);
    this._handleStartSearchRequest = this._handleStartSearchRequest.bind(this);
    this._handleErrorSearchRequest = this._handleErrorSearchRequest.bind(this);
    this._handleSuccessSearchRequest =
      this._handleSuccessSearchRequest.bind(this);
  }

  _setupEventBusHandlers() {
    eventBus.on(
      EventNames.START_SEARCH_REQUEST,
      this._handleStartSearchRequest
    );
    eventBus.on(
      EventNames.ERROR_SEARCH_REQUEST,
      this._handleErrorSearchRequest
    );
    eventBus.on(
      EventNames.SUCCESS_SEARCH_REQUEST,
      this._handleSuccessSearchRequest
    );
    eventBus.on(
      EventNames.RESET_SEARCH_STATE,
      this._handleResetSearchState
    );
  }

  _setUserActionHandlers() {
    this._dom.querySelector(Selectors.SEARCH_QUERY__BTN).addEventListener(
      "click",
      this._handleUserInputRequest
    )

    this._dom.addEventListener("keyup", this._handleKeyPress);
  }

  _handleUserInputRequest() {
    const inputValue = this._dom.querySelector(Selectors.SEARCH_QUERY__INPUT)
      .value.trim();

    if (inputValue !== "") {
      eventBus.trigger(EventNames.ENTERED_SEARCH_REQUEST, inputValue);
    }
  }

  _handleKeyPress(evt) {
    if (evt.code === KeyCodes.ENTER) {
      this._handleUserInputRequest();
    }
  }

  _handleResetSearchState() {
    this._dom.querySelector(Selectors.SEARCH_QUERY__INPUT).value = "";
    this._setDefaultStyles();
  }

  _handleStartSearchRequest() {
    this._dom.classList.add(NameInSelector.SEARCH_QUERY_LOADING);
    this._dom.querySelector(Selectors.SEARCH_QUERY__BTN).disabled = true;
  }

  _handleErrorSearchRequest() {
    const timeToShowErrorInMS = 1000;

    this._dom.classList.remove(NameInSelector.SEARCH_QUERY_LOADING);
    this._dom.classList.add(NameInSelector.SEARCH_QUERY_ERROR);
    setTimeout(() => {
      this._setDefaultStyles()
    }, timeToShowErrorInMS)
  }

  _handleSuccessSearchRequest() {
    this._setDefaultStyles();
  }

  _setDefaultStyles() {
    this._dom.classList.remove(
      NameInSelector.SEARCH_QUERY_LOADING,
      NameInSelector.SEARCH_QUERY_ERROR
    );
    this._dom.querySelector(Selectors.SEARCH_QUERY__BTN).disabled = false;
  }

}

export {SearchQuery}
