'use strict';

var PUPPIES = PUPPIES || {};

PUPPIES.View = (function() {

  var puppyList;

  var init = function() {
    puppyList = document.getElementById('puppy-list');
  };

  var renderPuppies = function(puppies) {
    puppyList.innerHTML = '';

    for (var i = 0; i < puppies.length; i++) {
      var newPuppy = document.createElement('LI');
      newPuppy.setAttribute('data-index', puppies[i].id);
      newPuppy.innerHTML = puppies[i].name;
      puppyList.appendChild(newPuppy);
    }
  };

  return {
    init: init,
    renderPuppies: renderPuppies
  };

})();
