'use strict';

var PUPPIES = PUPPIES || {};

PUPPIES.Controller = (function(model, view) {

  var init = function() {
    model.init();
    view.init({
      adopt: model.adopt,
      register: model.register
    });
    model.puppies(function(puppies, breeds){
      view.render(puppies, breeds);
    })
  };

  return {
    init: init
  };

})(PUPPIES.Model, PUPPIES.View);
