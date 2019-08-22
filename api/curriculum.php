<?php
require_once('../auth.php');

   
   header("Content-type: application/json; charset=utf-8");

   
   if ($level == 3) {
   
   $json = array();
      $json["ids"] = array();
      $json["name"] = array();
		$counter = 0;
   			$stmt = $conn->prepare("SELECT `id`,`last_name`,`first_name` FROM `users` WHERE `access_level`=2 AND `depart_id`=(SELECT `depart_id` FROM `users` WHERE `id`=?)");
			$stmt->bind_param("i", $id);
			$stmt->execute();
			$stmt->store_result();

			$stmt->bind_result($user_id, $last_name, $first_name);
			while ($stmt->fetch()) {
				
				
				
				$json["ids"][$counter] = $user_id;
				$json["name"][$counter] = $last_name.' '.$first_name;
				
				$counter = $counter + 1; 
			}
	
			$stmt->free_result();
			$stmt->close();

			echo json_encode($json);

   }
   else {
	   die("3");
	   
   }
?>