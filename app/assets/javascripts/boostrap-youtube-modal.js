(function ($) {
  // encapsulate variables that need only be defined once
  var pl = /\+/g,  // Regex for replacing addition symbol with a space
    searchStrict = /([^&=]+)=+([^&]*)/g,
    searchTolerant = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    };
  
  // parses a query string. by default, will only match good k/v pairs.
  // if the tolerant option is truthy, then it will also set keys without values to ''
  $.parseQuery = function(query, options) {
    var match,
      o = {},
      opts = options || {},
      search = opts.tolerant ? searchTolerant : searchStrict;
    
    if ('?' === query.substring(0, 1)) {
      query  = query.substring(1);
    }
    
    // each match is a query parameter, add them to the object
    while (match = search.exec(query)) {
      o[decode(match[1])] = decode(match[2]);
    }
    
    return o;
  }
  
  // parse this URLs query string
  $.getQuery = function(options) {
    return $.parseQuery(window.location.search, options);
  }

    $.fn.parseQuery = function (options) {
        return $.parseQuery($(this).serialize(), options);
    };
}(jQuery));

// these 3 all produce the same object
console.log('1a: ' + JSON.stringify($.parseQuery('?&foo=bar')));
console.log('1b: ' + JSON.stringify($.parseQuery('?foo=bar')));
console.log('1c: ' + JSON.stringify($.parseQuery('foo=bar')));

// default (non-tolerant) doesn't include keys without values, while tolerant sets them to empty string
console.log('2a: ' + JSON.stringify($.parseQuery('foo=bar&baz')));
console.log('2b: ' + JSON.stringify($.parseQuery('foo=bar&baz', {'tolerant': 1})));

// current query string
console.log('3: ' + JSON.stringify($.getQuery()));
// REQUIRED: Include "jQuery Query Parser" plugin here or before this point: 
//       https://github.com/mattsnider/jquery-plugin-query-parser
 
$(document).ready(function(){
  
// BOOTSTRAP 3.0 - Open YouTube Video Dynamicaly in Modal Window
// Modal Window for dynamically opening videos
$('a[href^="http://www.youtube.com"]').on('click', function(e){
  // Store the query string variables and values
  // Uses "jQuery Query Parser" plugin, to allow for various URL formats (could have extra parameters)
  var queryString = $(this).attr('href').slice( $(this).attr('href').indexOf('?') + 1);
  var queryVars = $.parseQuery( queryString );
 
  // if GET variable "v" exists. This is the Youtube Video ID
  if ( 'v' in queryVars )
  {
    // Prevent opening of external page
    e.preventDefault();
 
    // Variables for iFrame code. Width and height from data attributes, else use default.
    var vidWidth = 560; // default
    var vidHeight = 315; // default
    if ( $(this).attr('data-width') ) { vidWidth = parseInt($(this).attr('data-width')); }
    if ( $(this).attr('data-height') ) { vidHeight =  parseInt($(this).attr('data-height')); }
    var iFrameCode = '<iframe width="' + vidWidth + '" height="'+ vidHeight +'" scrolling="no" allowtransparency="true" allowfullscreen="true" src="http://www.youtube.com/embed/'+  queryVars['v'] +'?rel=0&wmode=transparent&showinfo=0" frameborder="0"></iframe>';
 
    // Replace Modal HTML with iFrame Embed
    $('#mediaModal .modal-body').html(iFrameCode);
    // Set new width of modal window, based on dynamic video content
    $('#mediaModal').on('show.bs.modal', function () {
      // Add video width to left and right padding, to get new width of modal window
      var modalBody = $(this).find('.modal-body');
      var modalDialog = $(this).find('.modal-dialog');
      var newModalWidth = vidWidth + parseInt(modalBody.css("padding-left")) + parseInt(modalBody.css("padding-right"));
      newModalWidth += parseInt(modalDialog.css("padding-left")) + parseInt(modalDialog.css("padding-right"));
      newModalWidth += 'px';
      // Set width of modal (Bootstrap 3.0)
        $(this).find('.modal-dialog').css('width', newModalWidth);
    });
 
    // Open Modal
    $('#mediaModal').modal();
  }
});
 
// Clear modal contents on close. 
// There was mention of videos that kept playing in the background.
$('#mediaModal').on('hidden.bs.modal', function () {
  $('#mediaModal .modal-body').html('');
});
 
});