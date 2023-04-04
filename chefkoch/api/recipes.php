<?php
  require_once "get_recipe.php";
  require_once "post_recipe.php";

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = trim(file_get_contents("php://input"));
    postRecipe($data);
  }
  if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $data = getRecipe($_GET["uid"]);
  }
  if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    return;
  }

  echo $data;
?>