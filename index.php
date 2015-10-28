<?php
require 'vendor/autoload.php';
require 'funcs.php';

use Gum\Route as R;

R::get('/', function() {
  echo render_file('index.html');
});

R::post('/fetch', function() {
  header('Content-Type: application/json');
  
  $data = json_decode(file_get_contents('php://input'), true);
  $url_array = parse_url($data['url']);

  if ($url_array) {
    $url = $url_array['scheme'].'://'.$url_array['host'].$url_array['path'];

    if (isset($url_array['query'])) {
      $url = $url.'?'.$url_array['query'];
    }

    $s = file_get_contents($url);
    $s2 = implode('', array_map('filter_html_tokens', token_get_all($s)));

    echo json_encode(array('source'=>$s2));
  } else {
    echo json_encode(array('source'=>'error'));
  }
});
