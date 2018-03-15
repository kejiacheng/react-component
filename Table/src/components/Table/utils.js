
let scrollbarSize;

const scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px',
  overflow: 'scroll',
};

export function measureScrollbar(direction = 'vertical') {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0;
  }
  if (scrollbarSize) {
    return scrollbarSize;
  }
  const scrollDiv = document.createElement('div');
  for (const scrollProp in scrollbarMeasure) {
    if (scrollbarMeasure.hasOwnProperty(scrollProp)) {
      scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
    }
  }
  document.body.appendChild(scrollDiv);
  let size = 0;
  if (direction === 'vertical') {
    size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  } else if (direction === 'horizontal') {
    size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
  }

  document.body.removeChild(scrollDiv);
  scrollbarSize = size;
  return scrollbarSize;
}

export function siblings(obj) {
    let _nodes = []
    let elem = obj
    let _elem = obj
    while ((_elem = _elem.previousSibling)){
        if(_elem.nodeType === 1){
            _nodes.push(_elem);
        }
    }
    while ((elem = elem.nextSibling)){
        if(elem.nodeType === 1){
            _nodes.push(elem);

        }
    }

    return _nodes;
}

export function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}

export function addClass(obj, cls) {
    const me = this
  
    if (!hasClass(obj,cls)) obj.className += " " + cls;  
}

export function removeClass(obj, cls) {
    const me = this

    if (hasClass(obj, cls)) {  
	    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	    obj.className = obj.className.replace(reg, ' ');  
	}  
}

export function typeInspect(variable) {
  return Object.prototype.toString.call(variable)
}