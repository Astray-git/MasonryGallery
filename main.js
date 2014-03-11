// json
// var getPics = function() {
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function(){
//     if(this.readyState == 4) {
//       if ((this.status >= 200 && this.status < 300) || this.status == 304) {
//         var photoData = JSON.parse(this.response).photos;
//         insPics(photoData);
//       } else {
//         console.log('Request was unsuccessful: ' + this.status);
//       }
//     }
//   };
//   xhr.open('GET', 'test.json', true);
//   xhr.send(null);
//   xhr = null;
// };

// jsonp
function jsonFlickrApi(obj) {
  var photos = obj.photos;
  insPics(photos);
}

var getPics = function() {
  var script = document.createElement('script');
  script.type="text/javascript";
  script.src = 'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=2202999fc9c18d1e5168b73f8cc440de&user_id=14738778%40N03&extras=url_m&per_page=20&format=json&callback=processPhotos';
  document.getElementsByTagName('head')[0].appendChild(script);
};


var insPics = function(pics) {
  var templateScript = document.getElementById('pics-template').innerHTML;
  var template = Handlebars.compile(templateScript);
  var container = document.getElementsByClassName('container')[0];
  container.innerHTML = template(pics);
  var imgs = document.getElementsByTagName('img');
  imgs.onload = picRearrange(pics);
};

var picRearrange = function(pics) {
  var wrappers = document.getElementsByClassName('pic-wrapper'),
    imgs = document.getElementsByTagName('img'),
    totalHeight = [0, 0, 0, 0, 0];
  Array.prototype.forEach.call(wrappers, function(element, index, array) {
    var oWidth = pics.photo[index].width_m;
    var oHeight = pics.photo[index].height_m;
    var cWidth = 236;
    var cHeight = oHeight * cWidth / oWidth;

    var count = (index + 1) % 5;

    switch(count) {
      case 1 : 
        element.style.left = '0';
        if(index > 1) {
          element.style.top = totalHeight[0].toString() + 'px';
        }
        totalHeight[0] += cHeight + 30;
      break;
      case 2 : 
        element.style.left = '250px';
        if(index > 2) {
          element.style.top = totalHeight[1].toString() + 'px';
        }
        totalHeight[1] += cHeight + 30;
      break;
      case 3 : 
        element.style.left = '500px';
        if(index > 2) {
          element.style.top = totalHeight[2].toString() + 'px';
        }
        totalHeight[2] += cHeight + 30;
      break;
      case 4 : 
        element.style.left = '750px';
        if(index > 3) {
          element.style.top = totalHeight[3].toString() + 'px';
        }
        totalHeight[3] += cHeight + 30;
      break;
      case 0 : 
        element.style.left = '1000px';
        if(index > 4) {
          element.style.top = totalHeight[4].toString() + 'px';
        }
        totalHeight[4] += cHeight + 30;
      break;
    }
  });
}

document.addEventListener('DOMContentLoaded', getPics);