<?php 

function filter_html_tokens($a)
{
    return (is_array($a) && $a[0] == T_INLINE_HTML) ? $a[1] : '';
}

// so safe
$q = $_SERVER['QUERY_STRING'];

// build `real` URL
$url_array = parse_url($q);

if ($url_array)
{
    $url = $url_array['scheme'].'://'.$url_array['host'].$url_array['path'];

    if (isset($url_array['query']))
    {
        $url = $url.'?'.$url_array['query'];
    }

    $s = file_get_contents($url);
    $s2 = implode('', array_map('filter_html_tokens', token_get_all($s)));
    echo $s2;
}
else
{
    echo 'Error';
}
