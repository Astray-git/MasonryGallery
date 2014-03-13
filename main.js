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
  
  var picRearrange = function(col) {
    var wrappers = document.getElementsByClassName('pic-wrapper'),
      absoluteLeft = ['0', '250px', '500px', '750px', '1000px', '1250px', '1500px'],
      totalHeight = null;

    var arrayMax = function( array ){
      return Math.max.apply( Math, array );
    };
    var prepareArray = function(value, len) {
      var array = [];
      while(len--) {
        array[len] = value;
      }
      return array;
    };

    totalHeight = prepareArray(0, col);

    Array.prototype.forEach.call(wrappers, function(element, index, array) {
      var oWidth = pics.photo[index].width_m,
        oHeight = pics.photo[index].height_m,
        cWidth = 236,
        cHeight = Math.round(oHeight * cWidth / oWidth);

      var rIndex = (index + 1) % col;
      if (rIndex > 0) {
        element.style.left = absoluteLeft[rIndex - 1];
        if(index > rIndex) {
          element.style.top = totalHeight[rIndex - 1].toString() + 'px';
        }
        totalHeight[rIndex - 1] += cHeight + 34;
      } else {
        element.style.left = absoluteLeft[col - 1];
        if(index > rIndex) {
          element.style.top = totalHeight[col - 1].toString() + 'px';
        }
        totalHeight[col - 1] += cHeight + 34;
      }

      if(index == array.length - 1) {
        var container = document.getElementsByClassName('container')[0];
        container.style.height = (arrayMax(totalHeight) + 30).toString() + 'px';
      }
    });
  };

  imgs.onload = picRearrange(7);

  enquire
  .register("screen and (max-width:1750px)", {
      match : function() {
        picRearrange(6);
      },
      unmatch: function() {
        picRearrange(7);
      }
  })
  .register("screen and (max-width:1500px)", {
      match : function() {
        picRearrange(5);
      },
      unmatch: function() {
        picRearrange(6);
      }
  })
  .register("screen and (max-width:1250px)", {
      match : function() {
        picRearrange(4);
      },
      unmatch: function() {
        picRearrange(5);
      }
  })
  .register("screen and (max-width:1000px)", {
      match : function() {
        picRearrange(3);
      },
      unmatch: function() {
        picRearrange(4);
      }
  });
};

document.addEventListener('DOMContentLoaded', getPics);