const EventLifeCycleNames = {
  ATTACH: "attached",
  TRIGGER: "triggered"
}

class EventBus {

  constructor() {
    this._events = {};
    this._mapHandlersAndData = new WeakMap();
    this._queueOfHandlers = new Set();
    this._isScheduledProcessOfHandlers = false;
    this._processQueueOfHandlers = this._processQueueOfHandlers.bind(this);
  }

  on(name, handler, data) {
    this._ensureSetOfHandlersExistForEvent(name);

    const handlers = this._events[name];
    handlers.add(handler);

    this._setDataForHandler(handler, data, EventLifeCycleNames.ATTACH);
  }

  off(name, handler) {
    if (!name || !this._events[name]) {
      return;
    }

    if (name && !handler) {
      delete this._events[name];
    }

    const handlers = this._events[name];
    handlers.delete(handler);
  }

  trigger(name, data) {
    if (!name || !this._events[name]) {
      return;
    }

    const handlers = this._events[name];
    handlers.forEach((handler) => {
      this._ensureDataEventExistForHandler(handler);
      this._setDataForHandler(handler, data, EventLifeCycleNames.TRIGGER);
      this._queueOfHandlers.add(handler);
    });

    if (this._isScheduledProcessOfHandlers) {
      return;
    }

    this._isScheduledProcessOfHandlers = true;
    setTimeout(this._processQueueOfHandlers, 0);
  }

  _ensureSetOfHandlersExistForEvent(name) {
    if (this._events[name]) {
      return;
    }

    this._events[name] = new Set();
  }

  _setDataForHandler(
    handler,
    data,
    lifeCyclePhase = EventLifeCycleNames.TRIGGER
  ) {
    this._ensureDataEventExistForHandler(handler);

    const dataEvent = this._mapHandlersAndData.get(handler);
    dataEvent[lifeCyclePhase] = data;

    this._mapHandlersAndData.set(handler, dataEvent);
  }

  _ensureDataEventExistForHandler(handler) {
    let dataEvent = this._mapHandlersAndData.get(handler);

    if (dataEvent) {
      return;
    }

    dataEvent = {
      [EventLifeCycleNames.ATTACH]: null,
      [EventLifeCycleNames.TRIGGER]: null
    }

    this._mapHandlersAndData.set(handler, dataEvent);
  }

  _processQueueOfHandlers() {
    this._isScheduledProcessOfHandlers = false;

    this._queueOfHandlers.forEach((handler) => {
      const dataForHandler = this._mapHandlersAndData.get(handler);
      handler(dataForHandler);
    });

    this._queueOfHandlers.clear();
  }
}

const eventBus = new EventBus();
export {eventBus}
