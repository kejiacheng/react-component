'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureScrollbar = measureScrollbar;

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