//This down here is not meant to be seen. Don't even try. ;S
function _0x7038(_0x30b85b,_0x138c1d){const _0x48d55b=_0x48d5();return _0x7038=function(_0x7038cf,_0x54f539){_0x7038cf=_0x7038cf-0x177;let _0x4d88d4=_0x48d55b[_0x7038cf];return _0x4d88d4;},_0x7038(_0x30b85b,_0x138c1d);}const _0x13a38e=_0x7038;(function(_0x5039d9,_0x506ded){const _0x241f9c=_0x7038,_0x4eae0a=_0x5039d9();while(!![]){try{const _0x39020f=parseInt(_0x241f9c(0x179))/0x1+parseInt(_0x241f9c(0x17e))/0x2*(-parseInt(_0x241f9c(0x17f))/0x3)+-parseInt(_0x241f9c(0x177))/0x4*(parseInt(_0x241f9c(0x178))/0x5)+-parseInt(_0x241f9c(0x17a))/0x6*(parseInt(_0x241f9c(0x17b))/0x7)+-parseInt(_0x241f9c(0x17c))/0x8+parseInt(_0x241f9c(0x17d))/0x9+parseInt(_0x241f9c(0x180))/0xa*(parseInt(_0x241f9c(0x183))/0xb);if(_0x39020f===_0x506ded)break;else _0x4eae0a['push'](_0x4eae0a['shift']());}catch(_0x1daaf3){_0x4eae0a['push'](_0x4eae0a['shift']());}}}(_0x48d5,0x7318b));function _0x48d5(){const _0x474798=['1672724oRZxha','3vzKQmi','40BatBdT','https://api.rebrandly.com/v1/links','ce434dd0a9b8447f8c1c22031a2575d9','7257118SbeWFp','4548OJrIno','10MJAodM','143450mpsEwM','5357118wnlhTy','7muALUi','5101048oBwpZt','523377HfBilt'];_0x48d5=function(){return _0x474798;};return _0x48d5();}const apiKey=_0x13a38e(0x182),url=_0x13a38e(0x181);

// Some page elements
const inputField = document.querySelector('#input');
const shortenButton = document.querySelector('#shorten');
const responseField = document.querySelector('#responseField');

// Asynchronous functions
const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});
  
	fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'apikey': apiKey
    },
    body: data
  })
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
    throw new Error('Request failed!')
  }, (networkError) => {
    console.log(networkError.message)
  })
  .then((jsonResponse) => {
    renderResponse(jsonResponse);
  })
}

// Clear page and call Asynchronous functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
}

shortenButton.addEventListener('click', displayShortUrl);

// Manipulates responseField to render a formatted and appropriate message
const renderResponse = (res) => {
    // Displays either message depending on results
    if(res.errors){
      responseField.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
    } else {  
      responseField.innerHTML = `<p>Your shortened url is: </p><p> ${res.shortUrl} </p>`;
    }
  }
  
  // Manipulates responseField to render an unformatted response
  const renderRawResponse = (res) => {
    // Displays either message depending on results
    if(res.errors){  
      responseField.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
    } else {
      // Adds line breaks for JSON
      let structuredRes = JSON.stringify(res).replace(/,/g, ", \n");
      structuredRes = `<pre>${structuredRes}</pre>`;
      responseField.innerHTML = `${structuredRes}`;
    }
  }
  
  // Renders the JSON that was returned when the Promise from fetch resolves.
  const renderJsonResponse = (response) => {
    // Creates an empty object to store the JSON in key-value pairs
    let rawJson = {}
    for(let key in response){
      rawJson[key] = response[key]
    }
    // Converts JSON into a string and adding line breaks to make it easier to read
    rawJson = JSON.stringify(rawJson).replace(/,/g, ", \n")
    // Manipulates responseField to show the returned JSON.
    responseField.innerHTML = `<pre>${rawJson}</pre>`
  }