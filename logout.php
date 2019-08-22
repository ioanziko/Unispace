<?php
session_start();	

if (isset($_COOKIE['token'])  && isset($_SESSION["id"])) {
	
	$id = $_SESSION["id"];
	
$conn = new mysqli("localhost", "uniadmin", "UNI@dm!n!", "Testing");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
   mysqli_set_charset($conn,"utf8");

   
	if (strlen($id)>0 && $id>0) {

	
	   $cookie = $_COOKIE['token'];

   if ((preg_match("/^[a-zA-Z0-9]+$/", $cookie) == 1) && strlen($cookie) == 64) {

         $cookie = mysqli_real_escape_string($conn, $cookie);

   
   			$stmt3 = $conn->prepare("DELETE FROM `token` WHERE `user_id` = ? AND `token` = ?");
			$stmt3->bind_param("is", $id, $cookie);
			$stmt3->execute();
			$stmt3->close();	   

						$currentCookieParams = session_get_cookie_params();  
					setcookie(  
						'token',//name  
						'',//value  
						time()-3600,//expires at end of session  
						$currentCookieParams['path'],//path  
						$currentCookieParams['domain'],//domain  
						false, //secure			CHANGE TO true
						true  //http-only
					);  
					session_destroy();
		 header('Location: ./login.php');



die();

   
   
   }
else {   
						$currentCookieParams = session_get_cookie_params();  
					setcookie(  
						'token',//name  
						'',//value  
						time()-3600,//expires at end of session  
						$currentCookieParams['path'],//path  
						$currentCookieParams['domain'],//domain  
						false, //secure			CHANGE TO true
						true  //http-only
					);  	
					session_destroy();
		 header('Location: ./login.php');



die();
}


	}
else {
	
	
	   $cookie = $_COOKIE['token'];

   if ((preg_match("/^[a-zA-Z0-9]+$/", $cookie) == 1) && strlen($cookie) == 64) {

         $cookie = mysqli_real_escape_string($conn, $cookie);

   
   			$stmt3 = $conn->prepare("DELETE FROM `token` WHERE `token` = ?");
			$stmt3->bind_param("s", $cookie);
			$stmt3->execute();
			$stmt3->close();	   

						$currentCookieParams = session_get_cookie_params();  
					setcookie(  
						'token',//name  
						'',//value  
						time()-3600,//expires at end of session  
						$currentCookieParams['path'],//path  
						$currentCookieParams['domain'],//domain  
						false, //secure			CHANGE TO true
						true  //http-only
					);  	
					session_destroy();
		 header('Location: ./login.php');



die();
   
   
   }
else {   
						$currentCookieParams = session_get_cookie_params();  
					setcookie(  
						'token',//name  
						'',//value  
						time()-3600,//expires at end of session  
						$currentCookieParams['path'],//path  
						$currentCookieParams['domain'],//domain  
						false, //secure			CHANGE TO true
						true  //http-only
					);  	
					session_destroy();
		 header('Location: ./login.php');



die();
}
	
}
}
else if (isset($_COOKIE['token'])) {
$conn = new mysqli("localhost", "uniadmin", "UNI@dm!n!", "Testing");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
   mysqli_set_charset($conn,"utf8");

   
		   $cookie = $_COOKIE['token'];

   if ((preg_match("/^[a-zA-Z0-9]+$/", $cookie) == 1) && strlen($cookie) == 64) {

         $cookie = mysqli_real_escape_string($conn, $cookie);

   
   			$stmt3 = $conn->prepare("DELETE FROM `token` WHERE `token` = ?");
			$stmt3->bind_param("s", $cookie);
			$stmt3->execute();
			$stmt3->close();	   

						$currentCookieParams = session_get_cookie_params();  
					setcookie(  
						'token',//name  
						'',//value  
						time()-3600,//expires at end of session  
						$currentCookieParams['path'],//path  
						$currentCookieParams['domain'],//domain  
						false, //secure			CHANGE TO true
						true  //http-only
					);  	
					session_destroy();
		 header('Location: ./login.php');



die();
   
   
   }
else {   
						$currentCookieParams = session_get_cookie_params();  
					setcookie(  
						'token',//name  
						'',//value  
						time()-3600,//expires at end of session  
						$currentCookieParams['path'],//path  
						$currentCookieParams['domain'],//domain  
						false, //secure			CHANGE TO true
						true  //http-only
					);  	
					session_destroy();
		 header('Location: ./login.php');



die();
}
	
}
else {
						$currentCookieParams = session_get_cookie_params();  
					setcookie(  
						'token',//name  
						'',//value  
						time()-3600,//expires at end of session  
						$currentCookieParams['path'],//path  
						$currentCookieParams['domain'],//domain  
						false, //secure			CHANGE TO true
						true  //http-only
					);  

	
	session_destroy();
		 header('Location: ./login.php');



die();

}




?>