var fs = Npm.require('fs');
var path = require('path');


//Todo(Dinesh) : Implement a way to upload and fetch the images to S3 bucket.
Meteor.startup(function () {
    Meteor.methods({

        //todo
        saveFileToS3: function (blob, name, path, encoding) {

        },

        //todo
        fetchFromS3: function(){

        }

    });


});
