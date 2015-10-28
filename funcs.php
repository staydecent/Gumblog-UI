<?php

function render_file($file, $vars = array()) {
  extract($vars);
  ob_start();
  include $file;
  $out = ob_get_contents();
  ob_end_clean();
  return $out;
}

function filter_html_tokens($a){
  return (is_array($a) && $a[0] == T_INLINE_HTML) ? $a[1] : '';
}
