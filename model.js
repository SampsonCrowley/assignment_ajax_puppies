'use strict';

var PUPPIES = PUPPIES || {};

PUPPIES.Model = (function($) {

  var puppies = [];

  var init = function() {
    _requestPuppies();
  };

  var _requestPuppies = function() {
    return $.ajax('https://ajax-puppies.herokuapp.com/puppies.json', {
      dataType: 'JSON'
    });
  };

  var getPuppies = function() {
    return puppies || _requestPuppies();
  };

  var createPuppy = function(name, breedId) {
    $.ajax('https://ajax-puppies.herokuapp.com/puppies.json', {
      method: 'POST',

      success: function(response, status, xhrobj) {
        puppies.push(JSON.parse(response));
      },

      data: {
        name: name,
        breed_id: breedId
      }
    });
  };

  var deletePuppy = function(puppyId) {
    $.ajax('https://ajax-puppies.herokuapp.com/puppies/' + puppyId + '.json', {
      method: 'DELETE',

      success: function(response, status, xhrobj) {
        var index = puppies.indexOf(JSON.parse(response));
        puppies.splice(index, 1);
      }

    });
  };

  return {
    init: init,
    getPuppies: getPuppies,
    createPuppy: createPuppy,
    deletePuppy: deletePuppy
  };

})($);
