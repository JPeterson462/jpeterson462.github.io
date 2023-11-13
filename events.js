import { getObjectType, getObjectAttributes, stringifyFullObject } from './objects.js';

function logEvent(eventType, event) {
  var eventStringified = stringifyFullObject(event, true);

  var element = document.getElementById("events");
  element.innerHTML = element.innerHTML + "<br /><span style='font-weight: bold; color: red'>" + eventType + ":</span> " + eventStringified;
}

function bindToAllEvents(callback) {
  //var events = 'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' ');
  var events = 'click dblclick mousedown mouseup touchstart touchend touchcancel'.split(' ');
  for (var i = 0; i < events.length; i++) {
    (function (eventType) {
      window.addEventListener(eventType, (e) => callback(eventType, e));
    })(events[i]);
  }
}

function waitForPageToLoad(callback) {
  window.addEventListener('DOMContentLoaded', (event) => callback());
}

function clearLog() {
  var element = document.getElementById("events");
  element.innerHTML = "";
}

window.eventTracker = {
  logEvent: logEvent,
  bindToAllEvents: bindToAllEvents,
  waitForPageToLoad: waitForPageToLoad,
  clearLog: clearLog
}

if (window.onEventTrackerLoaded) {
  window.onEventTrackerLoaded(window.eventTracker);
}
