<?php
  if (isset($_POST)) {
    $content = trim(file_get_contents("php://input"));
    $request = json_decode($content, true);

    if (file_put_contents($request['NAME'].'.png', file_get_contents($request['URL']))) {
      rename($request['NAME'].'.png', "charts/".$request['NAME'].'.png');
      $data = [200 => "Download successfull!"];
    } else
      $data = [404 => "URL not found!"];
  } else
    $data = [409 => "No Post request detected!"];
  echo json_encode($data);
?>