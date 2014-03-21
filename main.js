var photos = [];
// jsonp callback function
function jsonFlickrApi(obj) {
  photos = photos.concat(obj.photos.photo);
  insPics();
}

var getPics = function(url, init) {
  var script = document.createElement('script');
  script.type="text/javascript";
  script.src = url;
  if(init){
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    document.body.appendChild(script);
  }
};

var button = document.getElementsByTagName('button')[0];
var pageNum = 2;
button.addEventListener('click', function() {
  var url='https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=2202999fc9c18d1e5168b73f8cc440de&user_id=14738778%40N03&extras=url_m&per_page=20&page='+ pageNum +'&format=json'
  getPics(url, false);
  pageNum++;
});

var picRearrange = function(col) {
  var wrappers = document.getElementsByClassName('pic-wrapper'),
    absoluteLeft = ['0', '250px', '500px', '750px', '1000px', '1250px', '1500px'],
    totalHeight = [0,0,0,0,0,0,0];

  var arrayMax = function( array ){
    return Math.max.apply( Math, array );
  };

  Array.prototype.forEach.call(wrappers, function(element, index, array) {
    var oWidth = photos[index].width_m,
      oHeight = photos[index].height_m,
      cWidth = 236,
      cHeight = Math.round(oHeight * cWidth / oWidth),
      title = document.getElementsByClassName('title'),
      tHeight = title[index].clientHeight;

    // initial layout
    element.style.left = 0;
    element.style.top = 0;

    var rIndex = (index + 1) % col;
    if (rIndex > 0) {
      element.style.left = absoluteLeft[rIndex - 1];
      if(index > rIndex) {
        element.style.top = totalHeight[rIndex - 1].toString() + 'px';
      }
      totalHeight[rIndex - 1] += cHeight + tHeight + 20;
    } else {
      element.style.left = absoluteLeft[col - 1];
      if(index > rIndex) {
        element.style.top = totalHeight[col - 1].toString() + 'px';
      }
      totalHeight[col - 1] += cHeight + tHeight + 20;
    }

    if(index == array.length - 1) {
      var container = document.getElementsByClassName('container')[0];
      container.style.height = (arrayMax(totalHeight) + 30).toString() + 'px';
    }
  });
};

var insPics = function() {
  var templateScript = document.getElementById('pics-template').innerHTML;
  var template = Handlebars.compile(templateScript);
  var container = document.getElementsByClassName('container')[0];
  container.innerHTML = template(photos);
  var imgs = document.getElementsByTagName('img');

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

  imgs.onload = addMQListener();
};

var initUrl = 'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=2202999fc9c18d1e5168b73f8cc440de&user_id=14738778%40N03&extras=url_m&per_page=20&format=json';
document.addEventListener('DOMContentLoaded', getPics(initUrl, true));