<?php
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0 "); // Proxies.

header('X-XSS-Protection: 1; mode=block');
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header("Content-Security-Policy: default-src 'self'; script-src 'self';"); 
header("X-Content-Security-Policy: default-src 'self'; script-src 'self';"); 

if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
    header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
session_start();	


if (isset($_COOKIE['token']) && isset($_SESSION["id"])) {
		   					 header('Location: ./index.php');
die();
	
}
else if (isset($_POST['username']) && isset($_POST['password'])) {

$username = $_POST['username'];
$password = $_POST['password'];


$conn = new mysqli("localhost", "uniadmin", "UNI@dm!n!", "Testing");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
   mysqli_set_charset($conn,"utf8");

   
   if (preg_match("/^[a-zA-Z0-9_.]+$/", $username) == 1 && strlen($username)>=3 && strlen($username)<=16) {
   
	     $username = mysqli_real_escape_string($conn, $username);
   
		$stmt = $conn->prepare("SELECT id, password, access_level FROM users WHERE username = ?");
		$stmt->bind_param( "s", $username); 

		$stmt->execute();
		$stmt->store_result();


		$num_of_rows = $stmt->num_rows;
		$stmt->bind_result($id_db, $password_db, $access_level_db);
  
  
  		$ip = mysqli_real_escape_string($conn, inet_pton($_SERVER['REMOTE_ADDR']));
		$time = time();

   if ($num_of_rows == 1) {
	   
	   	ini_set('session.cookie_httponly', 1);
		ini_set('session.use_only_cookies', 1);
		ini_set('session.cookie_secure', 1);

	      $stmt->fetch();

		  
		
				$stmt2 = $conn->prepare("SELECT attempt, last_attempt FROM login_log WHERE user_id = ? AND ip = ?");
		$stmt2->bind_param( "is", $id_db, $ip); 

		$stmt2->execute();
		$stmt2->store_result();
		$num_of_rows2 = $stmt2->num_rows;
		$stmt2->bind_result($attempt, $last_attempt);

		      $stmt2->fetch();
			  
			  if ($num_of_rows2 == 0) {
				  
				  
				  
				  
				
			      if (password_verify($password, $password_db)) {
				  
					session_regenerate_id(true);

					// $token = bin2hex(openssl_random_pseudo_bytes(32));
	   
						$token = bin2hex(random_bytes(32));
					
					$currentCookieParams = session_get_cookie_params();  
					setcookie(  
						'token',//name  
						$token,//value  
						0,//expires at end of session  
						$currentCookieParams['path'],//path  
						$currentCookieParams['domain'],//domain  
						true, //secure			CHANGE TO true
						true  //http-only
					);  


						$valid = $time + 86400;
						$stmt4 = $conn->prepare("INSERT INTO `token`(`user_id`, `token`, `valid`, `last_visit`, `remember`) VALUES (?,?,?,?,0)");
						$stmt4->bind_param("isii", $id_db, $token, $valid, $time);

						$stmt4->execute();
						$stmt4->close();	

					
					$_SESSION["id"] = $id_db;
					$_SESSION["level"] = $access_level_db;

				  
		   					 header('Location: ./index.php');
							 die();				  
				  
				  
				  
				  
				  
				  
				  
				  }
				  else {
						$stmt3 = $conn->prepare("INSERT INTO `login_log`(`user_id`, `ip`, `attempt`, `last_attempt`) VALUES (?,?,1,?)");
						$stmt3->bind_param("isi", $id_db, $ip, $time);

						$stmt3->execute();
						$stmt3->close();	
				  
				  
login_html();
die("");				  
				  
				  }				
				
				  
				  
				  
			  }
			  else {
				  
				  if ((($time - 300) > $last_attempt) || $attempt < 10) {
					  
					  			      if (password_verify($password, $password_db)) {
										  
						$stmt3 = $conn->prepare("DELETE FROM `login_log` WHERE user_id = ? AND ip = ?");
						$stmt3->bind_param("is", $id_db, $ip);

						$stmt3->execute();
						$stmt3->close();	

				  
					session_regenerate_id(true);

					// $token = bin2hex(openssl_random_pseudo_bytes(32));
	   
						$token = bin2hex(random_bytes(32));
					
					$currentCookieParams = session_get_cookie_params();  
					setcookie(  
						'token',//name  
						$token,//value  
						0,//expires at end of session  
						$currentCookieParams['path'],//path  
						$currentCookieParams['domain'],//domain  
						true, //secure			CHANGE TO true
						true  //http-only
					);  

						$valid = $time + 86400;
						$stmt4 = $conn->prepare("INSERT INTO `token`(`user_id`, `token`, `valid`, `last_visit`, `remember`) VALUES (?,?,?,?,0)");
						$stmt4->bind_param("isii", $id_db, $token, $valid, $time);

						$stmt4->execute();
						$stmt4->close();	

					
					$_SESSION["id"] = $id_db;
					$_SESSION["level"] = $access_level_db;

				  
				  
		   					 header('Location: ./index.php');
							die();
				  
				  
				  
				  
				  
				  
				  
				  
				  }
				  else {
					  $attempt = $attempt + 1;
					  
						$stmt3 = $conn->prepare("UPDATE `login_log` SET `attempt`=?,`last_attempt`=? WHERE user_id = ? AND ip = ?");
						$stmt3->bind_param("iiis", $attempt, $time, $id_db, $ip);

						$stmt3->execute();
						$stmt3->close();	
				  
login_html();
die("");			  
				  
				  }	
					  
				  }
				  else {
					  
login_html();
die("");
					  
					  
				  }
				  
				  
				  
				  
			  }

		
							$stmt2->free_result();

					$stmt2->close(); 

		


		
   
 
					$stmt->free_result();

					$stmt->close(); 
   
   
   }
   else {
   
   
login_html();
die("");
   
   
   }   
   
   
   }
   else {
   
   
login_html();
die("");
   
   
   }

}
else {

login_html();
die("");
}


}
 else {
	session_regenerate_id(true);
    header('Location: https://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'], true, 301);

    login_html();
	die("");
}



function login_html() {
	?>	
	<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="./css/font-awesome.min.css">
		<link rel="stylesheet" href="./css/login.css">

	<title>Log In</title>
	<script src="./js/jquery-3.3.1.min.js"></script>

</head>
<body>
	
	<div class="form-area">
	<img src="./final.png" class="avatar">
		<h2>Είσοδος Φοιτητή</h2><br>
  		<form action="./login.php" class="needs-validation" method="POST" novalidate>
		<p>Όνομα χρήστη</p>
		<div class="input-container">
		<i class="fa fa-user icon"></i>
		<input type="text" name="username" id="username" placeholder="Εισαγωγή Ονόματος Χρήστη" required autofocus>
		</div>
		<br>
		<p>Κωδικός Πρόσβασης</p>
		<div class="input-container">
		<i class="fa fa-key icon"></i>
		<input type="password" name="password" id="password" placeholder="Εισαγωγή Κωδικού Πρόσβασης" required>	
		</div>
		<br>
	    <input type="submit" value="Είσοδος"></input>
	  	</form>
	</div>
<script>
// Disable form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Get the forms we want to add validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
</script>
</body>
</html>

	
	<?php
	
}	   
	   ?>