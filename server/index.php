<?php
require '../vendor/autoload.php';
require 'funcs.php';

use Gum\Route as Gum;
use Gum\Response as Res;
use Gum\Request as Req;


Gum::get('/', function() {
  echo tpl('index');
});

Gum::post('/fetch', function() {
  $data = Req::json();
  $src = get_html_source($data['url']);
  
  if ($src !== null) {
    echo Res::json(array('source'=>$src));
  } else {
    echo Res::json(array('source'=>'error'));
  }
});

// handle 404
if (Gum::not_found()) {
  header('HTTP/1.0 404 Not Found');
  echo '404 Not Found';
  exit;
}
