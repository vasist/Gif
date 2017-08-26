
Meteor.makeGifFromWebCam = function (state, cb) {
    gifshot.createGIF(state, function (gif) {
        if (gif.error) {
            console.log('Error', gif.error)
        } else {
            cb(gif.image);
        }
    });
}


Meteor.makeGifFromImages = function (result, cb) {
    gifshot.createGIF({ 'images': result.images, 'interval': result.interval }, function (gif) {
        if (gif.error) {
            console.log('Error ', gif.error)
        } else {
            cb(gif.image);
        }
    });
}

//If the current browser supports all of the gifshot animated GIF options
Meteor.isSupported = function (cb) {
    return gifshot.isSupported();
}


//If the current browser supports creating animated GIFs from a webcam video stream
Meteor.isWebCamGIFSupported = function (cb) {
    return gifshot.isWebCamGIFSupported();
}


//If the current browser supports creating animated GIFs from an existing HTML video (e.g. mp4, ogg, ogv, webm)
Meteor.isExistingVideoGIFSupported = function (cb) {
    return gifshot.isExistingVideoGIFSupported();
}

//If the current browser supports creating animated GIFs from existing images (e.g. jpeg, png, gif)
Meteor.isExistingImagesGIFSupported = function (cb) {
    return gifshot.isExistingImagesGIFSupported();
}

