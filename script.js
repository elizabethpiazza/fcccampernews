// Figure out height of page and rows
var windowHeight = window.innerHeight;
var divWidth = document.getElementsByClassName("container-fluid")[0].offsetWidth;
var thumbnailWidth = divWidth >= 750 ? 3 : 2;
var rows = Math.floor(windowHeight / 330) + 1;
// Load JSON
newsRequest = new XMLHttpRequest;

newsRequest.onreadystatechange = loadNews;
newsRequest.open('GET', 'http://www.freecodecamp.com/stories/hotStories');
newsRequest.send();

var newsData;
var itemPlace = 0;

function loadNews() {
  if (newsRequest.readyState === 4) {
    if (newsRequest.status === 200) {
      newsData = JSON.parse(newsRequest.responseText);
      for (itemPlace; itemPlace < rows * thumbnailWidth; itemPlace++) {
        var thumb = renderThumb(newsData[itemPlace]);
        document.getElementById('thumbRow').appendChild(thumb);
      }
    } else {
      console.log("error");
    }
  }

}

// Function to render a thumb div
function renderThumb(thumbData) {
  // Get data from JSON
  var headline = thumbData.headline;
  var link = thumbData.link;
  var author = thumbData.author;
  var authorPic = author.picture;
  var authorName = author.username;
  var comments = thumbData.storyLink.replace(' ', '-');
  var image = (thumbData.image != "") ? thumbData.image : "https://s3.amazonaws.com/freecodecamp/landingIcons_learn.svg.gz";
  var upvotes = thumbData.upVotes.length;

  // Create DOM nodes
  var thumbParent = document.createElement('div');
  thumbParent.setAttribute('class', 'col col-xs-6 col-sm-4');
  var thumbInner = document.createElement('div');
  thumbInner.setAttribute('class', 'thumbnail');
  var img = document.createElement('img');
  img.setAttribute('src', image);
  img.setAttribute('class', 'contImg');
  var captionDiv = document.createElement('div');
  captionDiv.setAttribute('class', 'caption');
  var heading = document.createElement('h4');
  heading.innerHTML = '<a href="' + link + '">' + headline + '</a>';
  var userDiv = document.createElement('div');
  userDiv.setAttribute('class', 'col-sm-8 col-xs-12 userDiv');
  userDiv.innerHTML = '<img class="userImg" src="' + authorPic + '">' + authorName;
  var upvotesDiv = document.createElement('div');
  upvotesDiv.setAttribute('class', 'col-sm-2 col-xs-6');
  upvotesDiv.innerHTML = '<span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">' + upvotes + '</span>';
  var commentsDiv = document.createElement('div');
  commentsDiv.setAttribute('class', 'col-sm-2 col-xs-6');
  commentsDiv.innerHTML = '<a href="http://www.freecodecamp.com/news/' + comments + '"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></a>';

  // Append nodes to parent
  captionDiv.appendChild(heading);
  captionDiv.appendChild(userDiv);
  captionDiv.appendChild(upvotesDiv);
  captionDiv.appendChild(commentsDiv);
  thumbInner.appendChild(img);
  thumbInner.appendChild(captionDiv);
  thumbParent.appendChild(thumbInner);

  return thumbParent;
};

// Listen for scrollheight events and repeat render divs/construct and append rows
var scrolled = document.body.scrollTop;
console.log(scrolled);

window.onscroll = function() {
  var divHeight = document.getElementsByClassName("container-fluid")[0].offsetHeight;
  scrolled = document.body.scrollTop;
  if ((windowHeight + scrolled - divHeight) >= -75) {
    var limit = itemPlace + 3;
    for (itemPlace; itemPlace < limit; itemPlace++) {
        var thumb = renderThumb(newsData[itemPlace]);
        document.getElementById('thumbRow').appendChild(thumb);
      }
  }
};
