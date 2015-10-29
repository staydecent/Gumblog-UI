jQuery(document).ready(function($) {

  var link_post = false;

  $('#title')
  
  .live('focus', function(e) {
    $(this).keyup(function(e) {
      link_post = is_URL(this.value);

      if (this.value.length > 4) {
        $('#actions').animate({bottom:'0px'}, 150);
      } else {
        $('#actions').animate({bottom:'-100px'}, 50);
      }

      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 13 && this.value.length > 4) {
        $('#link').val(slugify(this.value)).animate({opacity:1}, 250);
        $('#body').animate({opacity:1}, 250).focus();
      }
    });
  })
  
  .live('blur', function() {
    if (!link_post && this.value.length > 4) {
      $('#link').val(slugify(this.value)).animate({opacity:1}, 250);
      $('#body').animate({opacity:1}, 250).focus();
    }
  })
  
  .live('paste', function(e) {
    var el = $(this);

    setTimeout(function() {
      link_post = is_URL(el.val());
      console.log('paste', el.val());

      if (link_post) {
        var url = el.val();

        $.ajax('/fetch', {
          data: JSON.stringify({url:url}),
          contentType: 'application/json',
          type: 'POST',
          success: function(data) {
            var result = /<title>(.*?)<\/title>/m.exec(data.source);
            if (result != null) {
              $('#title').val(result[1]).animate({opacity:1}, 250);
              $('#link').val(url).animate({opacity:1}, 250);
              $('#body').animate({opacity:1}, 250).focus();
            } else {
              console.log(data);
            } 
          }
        })
      }
    }, 200);
  });

  var post = JSON.parse(localStorage.getItem('gum_post'));
  if (post !== null) {
    $('#title').val(post.title);
    $('#link').val(post.link).animate({opacity:1}, 250);
    $('#body').val(post.body).animate({opacity:1}, 250).focus();
    $('#actions').animate({bottom:'0px'}, 150);
  }

  $('#save').click(function(e) {
    e.preventDefault();

    var post = {};
    post.title = $('#title').val();
    post.link = $('#link').val();
    post.body = $('#body').val();

    localStorage.setItem('gum_post', JSON.stringify(post));
  });

});

var is_URL = function(input) {
  if (input === undefined) {
    return false;
  }

  var exp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; 

  if ((input.match(exp))) {
    var match = exp.exec(input);
    return true;    
  }

  return false;
};

var slugify = function(text) {
  text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
  text = text.replace(/-/gi, "_");
  text = text.replace(/\s/gi, "-");
  return '/'+text.toLowerCase();
};

var clearPost = function() {
  localStorage.removeItem('gum_post');
  console.log('Post data cleared. Thanks for testing this out ;)');
  return true;
}
