'use strict';

var PUPPIES = PUPPIES || {};

PUPPIES.Controller = (function(model, view) {

  var init = function() {
    model.init();
    view.init();
    // do {
      console.log("in while");
      view.renderPuppies(model.getPuppies());
    // } while (model.getPuppies().length === 0);
  };

  return {
    init: init
  };

})(PUPPIES.Model, PUPPIES.View);
