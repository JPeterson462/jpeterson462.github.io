function getObjectType(object) {
  var funcNameRegex = /function (.{1,})\(/;
  var results = (funcNameRegex).exec((object).constructor.toString());
  return (results && results.length > 1) ? results[1] : "object";
}

function getObjectAttributes(object) {
  var proto = Object.getPrototypeOf(object);
  if (proto) {
    return Object.keys(proto);
  }
  else {
    return Object.keys(object);
  }
}

function stringifyFullObject(object, prependType) {
  if (object == null) {
    return null;
  }
  if (typeof object != 'object') {
    return JSON.stringify(object);
  }
  var eventAttributes = getObjectAttributes(event);
  var eventObjectType = getObjectType(event);
  var result = (prependType ? (eventObjectType + " ") : "") + "{ ";
  for (var i = 0; i < eventAttributes.length; i++) {
    if (i > 0) {
      result += ",";
    }
    result += " \"" + eventAttributes[i] + "\": " + stringifyFullObject(object[eventAttributes[i]], false);
  }
  result += " }";
  return result;
}

function logEvent(eventType, event) {
  var eventStringified = stringifyFullObject(event, true);

  var element = document.getElementById("events");
  element.innerHTML = element.innerHTML + "<br />" + eventType + ": " + eventStringified;
}

function bindToAllEvents(callback) {
  //var events = 'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' ');
  var events = 'click dblclick mousedown mouseup touchdown touchup'.split(' ');
  for (var i = 0; i < events.length; i++) {
    (function (eventType) {
      window.addEventListener(eventType, (e) => callback(eventType, e));
    })(events[i]);
  }
}
