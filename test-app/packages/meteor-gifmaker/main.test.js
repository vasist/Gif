/**
 * Mocha unit testing for meteor-gifmaker package
 */

// A global to mock Meteor environment
global.Meteor = {};

const assert = require('chai').assert;

// HTML5 API's to mock browser environment
global.File = require('file-api').File;
global.FileReader = require('filereader');

// libs
global.gifshot = require('gifshot')

const path = require('path');

// Run Meteor Package modules to decorate mocked Meteor global
require('./client/make_gif');
require('./client/save_file');
require('./client/state');

describe('save file', function() {
  var adventureFile;
  before(function() {
    Meteor.init(5);
    adventureFile = new File(path.join(__dirname, './images/adventure.jpeg'), {
      jsdom: true
    });
  })

  it('should create a data:URL for image file in a frame', function() {
    /**
     * TODO: Rework this test. This code is same as unit being tested and works:
     * 
     * var reader = new FileReader()
     * reader.onload = function(ev) {
     *  console.log(ev.target.result)
     * }
     * reader.readAsDataURL(adventureFile);
     * 
     */
    
    Meteor.saveFile(adventureFile, 2, function() {
      console.log('um')
    })
    var state = Meteor.getState()
    assert.isString(state.frames['2'])
  })
})

describe('state', function() {
  describe('#init()', function() {
    it('initiates state', function() {
      const numberOfFrames = 10;
      Meteor.init(numberOfFrames);
      const frameStateLength = Object.keys(Meteor.state.frames).length;
      assert.equal(frameStateLength, numberOfFrames)
    })
  })
  describe('#setState()', function() {
    it('should create new state object', function() {
      var oldState = Meteor.getState();
      var newSate;
      var updateState = {
        some: 'data'
      }
      Meteor.setState(updateState);
      newState = Meteor.getState();
      assert.notStrictEqual(oldState, newState);
    })
  })
})

describe('make gif', function() {
  before(function() {
    Meteor.init(3)
  })
  it('should create a data:URL for gif made of valid sequence of image URL\'s', function() {
    /**
     * WIP: Investigate gifshot library
     */
    var frames = {
      0: path.join(__dirname, './images/adventure.jpeg'), 
      1: path.join(__dirname, './images/finn.jpeg'),
      2: path.join(__dirname, './images/party.jpeg')
    }
    Meteor.setState({ frames: frames })
    Meteor.makeGif(function(url) {
      assert.isString(url)
    })
  })

})

