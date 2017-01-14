'use strict';

var PUPPIES = PUPPIES || {};

PUPPIES.View = (function() {

  var puppyList, breedList, newPuppy;

  var init = function(cb) {
    puppyList = document.getElementById('puppy-list');
    breedList = $("#breed-list");
    newPuppy = $("#new-puppy");
    listeners(cb);
  };

  var listeners = function listeners(cb){
    if(cb.adopt){
      puppyList.addEventListener("click", function(e){
        if(e.target.tagName === "A") {
          console.log(e.target)
          cb.adopt(e.target.getAttribute('data-id')).then(function(){
            var line = document.getElementById("puppy-"+e.target.getAttribute('data-id'));
            line.parentNode.removeChild(line);
          })
        }
      })
    }

    if(cb.register){
      newPuppy.submit(function(e){
        e.preventDefault();
        var formData = {};
        $.each(newPuppy.serializeArray(), function(_, kv){
          formData[kv.name] = kv.value;
        })
        if(formData.name && formData.breed){
          cb.register(JSON.stringify(formData)).then(function(puppy){
            renderPuppy(puppy);
          })
        }
      })
    }
  }
  var render = function render(puppies, breeds){
    renderPuppies(puppies);
    renderBreeds(breeds);
  }

  var renderPuppies = function(puppies) {
    puppyList.innerHTML = '';

    for (var i = 0; i < puppies.length; i++) {
      renderPuppy(puppies[i])
    }
  };
  var renderPuppy = function renderPuppy(puppy){
    var newPuppy = document.createElement('LI');
    newPuppy.setAttribute("id", "puppy-" + puppy.id )
    newPuppy.innerHTML = "<p><strong>" + puppy.name + "</strong> (" +
                                         puppy.breed.name + ") " +
                                         puppy.created_at +
                                         " -- <a href='#" + puppy.id + "' data-id='" + puppy.id + "'>Adopt</a>" ;
    puppyList.appendChild(newPuppy);
  }
  var renderBreeds = function renderBreeds(breeds){
    for(var i = 0; i < breeds.length; i++){
      var option = $("<option>")
                   .val(breeds[i].id)
                   .text(breeds[i].name);
      breedList.append(option);
    }
  }

  return {
    init: init,
    render: render
  };

})();
