'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureScrollbar = measureScrollbar;
exports.siblings = siblings;
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.typeInspect = typeInspect;

var scrollbarSize = void 0;

var scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px',
  overflow: 'scroll'
};

function measureScrollbar() {
  var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'vertical';

  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0;
  }
  if (scrollbarSize) {
    return scrollbarSize;
  }
  var scrollDiv = document.createElement('div');
  for (var scrollProp in scrollbarMeasure) {
    if (scrollbarMeasure.hasOwnProperty(scrollProp)) {
      scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
    }
  }
  document.body.appendChild(scrollDiv);
  var size = 0;
  if (direction === 'vertical') {
    size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  } else if (direction === 'horizontal') {
    size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
  }

  document.body.removeChild(scrollDiv);
  scrollbarSize = size;
  return scrollbarSize;
}

function siblings(obj) {
  var _nodes = [];
  var elem = obj;
  var _elem = obj;
  while (_elem = _elem.previousSibling) {
    if (_elem.nodeType === 1) {
      _nodes.push(_elem);
    }
  }
  while (elem = elem.nextSibling) {
    if (elem.nodeType === 1) {
      _nodes.push(elem);
    }
  }

  return _nodes;
}

function hasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
  var me = this;

  if (!hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
  var me = this;

  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
}

function typeInspect(variable) {
  return Object.prototype.toString.call(variable);
}