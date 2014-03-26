var photos = [];
var pageNum = 1;
var container = document.getElementsByClassName('container')[0];
var placeholder = document.getElementsByClassName('placeholder')[0];
var bodyHeight;
var prevScrollPos = document.body.scrollTop;

// jsonp callback function
function jsonFlickrApi(obj) {
  photos = photos.concat(obj.photos.photo);
  insPics();
}

function getPics() {
  var script = document.createElement('script');
  var url='https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=2202999fc9c18d1e5168b73f8cc440de&user_id=14738778%40N03&extras=url_z&per_page=15&page='+ pageNum +'&format=json';
  script.type="text/javascript";
  script.src = url;
  if(pageNum == 1){
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    var indicator = document.getElementsByClassName('loader')[0],
      boxes = document.querySelectorAll('.loader div'), i, len;
    var startAnim = function(element) {
      element.style.opacity = 1;
      element.style.webkitAnimationPlayState = 'running';
      element.style.animationPlayState = 'running';
    };
    startAnim(indicator);
    for(i = 0, len = boxes.length; i < len; i++) {
      startAnim(boxes[i]);
    }

    document.body.appendChild(script);
  }

  pageNum++;
}

var picRearrange = function(col) {
  var wrapper = document.getElementsByClassName('pic-wrapper'),
    absoluteLeft = ['0', '250px', '500px', '750px', '1000px', '1250px', '1500px'],
    totalHeight = [0,0,0,0,0,0,0],
    index,len;

  var arrayMax = function(array){
    return Math.max.apply(Math, array);
  };

  for(index = 0, len = wrapper.length; index < len; index++){
    var oWidth = photos[index].width_z,
      oHeight = photos[index].height_z,
      eWidth = 236,
      eHeight = Math.round(oHeight * eWidth / oWidth),
      title = document.getElementsByClassName('title'),
      tHeight = title[index].offsetHeight;

    var element = wrapper[index];
    // initial layout
    element.style.left = 0;
    element.style.top = 0;

    var rIndex = (index + 1) % col;
    if (rIndex > 0) {
      element.style.left = absoluteLeft[rIndex - 1];
      if(index > rIndex) {
        element.style.top = totalHeight[rIndex - 1].toString() + 'px';
      }
      totalHeight[rIndex - 1] += eHeight + tHeight + 20;
    } else {
      element.style.left = absoluteLeft[col - 1];
      if(index > rIndex) {
        element.style.top = totalHeight[col - 1].toString() + 'px';
      }
      totalHeight[col - 1] += eHeight + tHeight + 20;
    }

    if(index == len - 1) {
      container.style.height = (arrayMax(totalHeight) + 30).toString() + 'px';
    }
  }
  
  var indicator = document.getElementsByClassName('loader')[0],
      boxes = document.querySelectorAll('.loader div'),
      i,boxlen;

  function stopAnim(element) {
    element.style.webkitAnimationPlayState = 'paused';
    element.style.animationPlayState = 'paused';
    element.style.opacity = 0;
  }

  stopAnim(indicator);
  for(i = 0, boxlen = boxes.length; i < boxlen; i++) {
    stopAnim(boxes[i]);
  }

  infiniteScroll(loadMore);
};

var insPics = function() {
  var template = Handlebars.templates.pics;
  container.innerHTML = template(photos);

  // MediaQuery
  var query1 = "screen and (min-width:1751px)",
      query2 = "screen and (min-width:1501px) and (max-width:1750px)",
      query3 = "screen and (min-width:1251px) and (max-width:1500px)",
      query4 = "screen and (min-width:1001px) and (max-width:1250px)",
      query5 = "screen and (max-width:1000px)",
      handler1 = {
        match : function() { picRearrange(7); }
      },
      handler2 = {
        match : function() { picRearrange(6); }
      },
      handler3 = {
        match : function() { picRearrange(5); }
      },
      handler4 = {
        match : function() { picRearrange(4); }
      },
      handler5 = {
        match : function() { picRearrange(3); }
      };

  var addMQListener = function() {
    enquire
      .register(query5, handler5)
      .register(query4, handler4)
      .register(query3, handler3)
      .register(query2, handler2)
      .register(query1, handler1);
  };

  var imgs = document.getElementsByTagName('img');
  var lightBoxLink = document.getElementsByClassName('pic'),i,len;

  EventUtil.addHandler(imgs, 'load', addMQListener());

  for(i = 0, len = lightBoxLink.length; i < len; i++){
      EventUtil.addHandler(lightBoxLink[i], 'click', lightBox);
  }
};

function lightBox(e){
  var event = EventUtil.getEvent(e);
  var target = EventUtil.getTarget(event);
  EventUtil.preventDefault(event);
  var index = parseInt(target.parentNode.id.slice(4));
  placeholder.parentNode.className = 'lightbox js-show';
  bodyHeight = document.body.style.height;
  document.body.style.height = window.innerHeight + 'px';
  document.body.style.overflow = 'hidden';
  if(parseInt(photos[index].height_z) > parseInt(photos[index].width_z)) {
    placeholder.style.height = Math.round(472 * photos[index].height_z / photos[index].width_z) + 'px';
  } else {
    placeholder.style.width = '640px';
    placeholder.style.height = Math.round(640 * photos[index].height_z / photos[index].width_z) + 'px';
  }
  placeholder.style.backgroundImage = 'url('+ photos[index].url_z + ')';
}

var infiniteScroll = function(handler) {
  var scroller = {
    handler: handler,
    updateInitiated: false
  };
  window.onscroll = function(event) {
      scrollHandler(scroller, event);
  };

  // Touch devices
  document.ontouchmove = function(event) {
    scrollHandler(scroller, event);
  };
};

function scrollHandler(scroller, event) {
  if(scroller.loadInitiated) {
    return;
  }

  /*var scrollPos = document.body.scrollTop;
    chrome ok
    Moz: document.body.scrollTop = 0
  */
  var scrollPos = window.pageYOffset;
  if(scrollPos == prevScrollPos) {
    return;
  }

  var pageHeight = document.documentElement.scrollHeight;
  var clientHeight = window.innerHeight;

  if(pageHeight - clientHeight - scrollPos < 50) {
    scroller.loadInitiated = true;
  
    scroller.handler(function() {
      scroller.loadInitiated = false;
    });
  }
  prevScrollPos = scrollPos;
}

var loadMore = function() {
  getPics();
};

var EventUtil = {
  addHandler: function(element, type, handler){
    if (element.addEventListener){
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent){
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  getEvent: function(event){
    return event ? event : window.event;
  },
  getTarget: function(event){
    return event.target || event.srcElement;
  },
  preventDefault: function(event){
    if (event.preventDefault){
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
};

EventUtil.addHandler(placeholder.parentNode, 'click', function(){
  placeholder.parentNode.className = 'lightbox js-hide';
  document.body.style.height = bodyHeight + 'px';
  document.body.style.overflow = 'auto';
});

document.addEventListener('DOMContentLoaded', getPics());