<?php

if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {

session_start();	

if (isset($_COOKIE['token']) && isset($_SESSION["id"])) {

$id = $_SESSION["id"];
$level = $_SESSION["level"];
if (strlen($id)>0 && $id>0 && strlen($level)>0 && $level>0) {

$conn = new mysqli("localhost", "uniadmin", "UNI@dm!n!", "Testing");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
   mysqli_set_charset($conn,"utf8");

   $time = time();

   $cookie = $_COOKIE['token'];

   if ((preg_match("/^[a-zA-Z0-9]+$/", $cookie) == 1) && strlen($cookie) == 64) {
   
      $cookie = mysqli_real_escape_string($conn, $cookie);

   	$stmt = $conn->prepare("SELECT `last_visit` FROM (SELECT `token`, `last_visit` FROM `token` WHERE `user_id`=?) AS `tokens` WHERE `token`=?");
$stmt->bind_param( "is", $id, $cookie); 

$stmt->execute();
   $stmt->store_result();

   $num_of_rows = $stmt->num_rows;
   $stmt->bind_result($last_visit);
if ($num_of_rows == 1) {
	   $stmt->fetch();

	   if (($time - 900) < $last_visit) {
		   
			$stmt3 = $conn->prepare("UPDATE `token` SET `last_visit`=? WHERE `user_id` = ? AND `token`=?");
			$stmt3->bind_param("iis", $time, $id, $cookie);
			$stmt3->execute();
			$stmt3->close();	   
		   
		   
		    
		   
	   }
	   else {
		header('Location: ./logout.php');
die();	
	
	   }
}
else {
	
		header('Location: ./logout.php');
die();	
	
	
}   
   }
   else {
	   	   
		header('Location: ./logout.php');
die();	   
	   
   }
}
else {
	
		header('Location: ./logout.php');
die();	
	
}
}
else {
		header('Location: ./logout.php');
die();
	
}

}
else {

 header('Location: https://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['REQUEST_URI']).'/logout.php', true, 301);

    die("");
}

?>