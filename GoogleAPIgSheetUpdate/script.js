window.onload = function () {

    function handleSignInClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

    function handleSignOutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }


    var script_api = document.getElementById("script_api");
    if (script_api != null) {
        document.body.parentNode.removeChild(script_api);
    }

    var script = document.createElement('script');
    script.setAttribute('id', 'script_api');
    script.defer = true;
    script.async = true;
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = 'this.onload=function(){};handleClientLoad()';
    script.onreadystatechange = "if (this.readyState === 'complete') this.onload()";
    script.type = 'text/javascript';
    document.body.parentNode.appendChild(script);
}

function makeApiCall() {
    var params = {
        spreadsheetId: '1qTPHPgzB5TDLFvSEfmnnvLrcv922hYM6wSaZYSpAqJI',
        range: 'A1',
        valueInputOption: 'USER_ENTERED'
    };

    var g_timestamp = localStorage.getItem('g_timestamp');
    var valueRangeBody = { 'values': [[g_timestamp]] };

    var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    request.then(function (response) {
        console.log(response.result);
    }, function (reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

function initClient() {
    var API_KEY = 'AIzaSyC2jTpHgcvgebgHB4w6setJ07LDsgIVt5E';

    var CLIENT_ID = '763599269709-miluak53tat6jb14rmoc2rhgohrqpr5t.apps.googleusercontent.com';

    var SCOPE = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCall();
    }
}




var signInButton = document.getElementById('singInButton');
signInButton.onclick = function () {
    handleSignInClick();
}
