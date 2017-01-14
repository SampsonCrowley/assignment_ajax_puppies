'use strict';

var PUPPIES = PUPPIES || {};

PUPPIES.Model = (function($) {

  var puppies = [], breeds = [];

  var init = function() {
    _requestPuppies();
  };

  var _requestPuppies = function() {
    return $.ajax('https://ajax-puppies.herokuapp.com/puppies.json', {
      dataType: 'JSON'
    });
  };

  var _requestBreeds = function() {
    return $.ajax('https://ajax-puppies.herokuapp.com/breeds.json', {
      dataType: 'JSON'
    });
  };

  var getBreeds = function(cb) {
    (breeds.length > 0 ? cb(puppies, breeds) : _requestBreeds().then(function(newBreeds){
      // for(var i = 0; i < newBreeds.length; i++){
      //   breeds[newBreeds[i].id] = newBreeds[i]
      // }
      breeds = newBreeds
      cb(puppies, breeds)
    }))
  };

  var getPuppies = function(cb) {
    (puppies.length > 0 ? getBreeds(cb) : _requestPuppies().then(function(newPuppies){
      puppies = newPuppies
      getBreeds(cb);
    }))
  };

  var createPuppy = function(data, cb) {
    return $.ajax('https://ajax-puppies.herokuapp.com/puppies.json', {
      method: 'POST',
      dataType: 'json',
      data: data,
      headers: {
        "Content-type": "application/json"
      },
      success: function(puppy){
        puppies.push(puppy);
      }
    });
  };

  var deletePuppy = function(puppyId) {
    return $.ajax('https://ajax-puppies.herokuapp.com/puppies/' + puppyId + '.json', {
      method: 'DELETE',
      success: function(response, status, xhrobj) {
        var index = puppies.indexOf(response);
        puppies.splice(index, 1);
      }

    });
  };

  return {
    init: init,
    puppies: getPuppies,
    register: createPuppy,
    adopt: deletePuppy,
  };

})($);
