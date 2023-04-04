<?php
  function getRecipe($uid) {
    if ($uid == "all")
      return;
    
    $file = "../recipes/".$uid.".json";
    if (file_exists($file)) {
      return file_get_contents($file);
    } else {
      return '{"error":404}';
    }
  }
?>