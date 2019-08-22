<?php
require_once('../auth.php');

  
  header("Content-type: application/json; charset=utf-8");

   
	   
	   $json = array(); 
	   $json["ids"] = array();
	   $json["email"] = array();
	   $json["name"] = array();
	   $json["status"] = array();

	   $counter = 0;
	   
	   
		   
  			$stmt = $conn->prepare("SELECT `id`, `email`, `first_name`, `last_name`, `status` FROM `users` WHERE `depart_id`=(SELECT `depart_id` FROM `users` WHERE `id`=?) AND access_level=2");
			$stmt->bind_param("i", $id);
			$stmt->execute();
			$stmt->store_result();

			$stmt->bind_result($user_id, $email, $first_name, $last_name, $status);
			while ($stmt->fetch()) {
				
					   $json["ids"][$counter] = $user_id;
						$json["email"][$counter] = $email;
						$json["name"][$counter] = $last_name.' '.$first_name;
						$json["status"][$counter] = $status;
				
				
				$counter = $counter + 1;
			}
	
			$stmt->free_result();
			$stmt->close();
		   
		   echo json_encode($json);
		   

	   
   

?>