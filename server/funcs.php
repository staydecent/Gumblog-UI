<?php
use Gum\Response as Resp;


function tpl($file_name, $vars = array()) {
  $file = 'templates/' . $file_name . '.html';
  return Resp::render($file, $vars);
}

function get_html_source($url) {
  $url_array = parse_url($url);

  if ($url_array) {
    $url = $url_array['scheme'].'://'.$url_array['host'].$url_array['path'];

    if (isset($url_array['query'])) {
      $url = $url.'?'.$url_array['query'];
    }

    $s = file_get_contents($url);
    return implode('', array_map('filter_html_tokens', token_get_all($s)));
  }

  return null;
}

function filter_html_tokens($a){
  return (is_array($a) && $a[0] == T_INLINE_HTML) ? $a[1] : '';
}
