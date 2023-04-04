<?php
  $dir = "charts/";
  
  $content = scandir($dir);
  $content = array_filter($content, static function ($el) {
    return ($el !== ".") && ($el !== "..");
  });

  foreach ($content as $key => $value) {
    $content[$key] = [$value, date("d.m.Y H:i", filemtime($dir.$value))];
  }
  
  echo json_encode($content);
?>