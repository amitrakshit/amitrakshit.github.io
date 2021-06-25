function makeApiCall() {
    var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1v18hhOD-rwErgikIfPqPperYUh8fv9uFVMhtQG_xXq0',  // TODO: Update placeholder value.

        // The A1 notation of the values to update.
        range: 'A2',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
    };

    var valueRangeBody = {
        // TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
        'values': [['new values']],
    };

    var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    request.then(function (response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
    }, function (reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

function initClient() {
    var API_KEY = 'AIzaSyCPeYrqyxXsk7LwCvMEBujymjwdFw0GRYE';  // TODO: Update placeholder with desired API key.

    var CLIENT_ID = '497862049389-v5b0ovv0ci4jn5311q121gjtkoujb5nr.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.

    // TODO: Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/spreadsheets'
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

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

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}