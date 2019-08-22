<?php
require_once('../auth.php');
header("Content-type: application/json; charset=utf-8");

if ($level == 3){
		
	    $json = array(); 
	    $json["curriculum_ids"] = array();
	    $json["curriculum_name"] = array();
	    $json["enrollment_ids"] = array();
	    $json["enrollment_name"] = array();
	    $counter = 0;
		
		
		
					
			
			$stmt = $conn->prepare("SELECT id, curriculum_name FROM curriculum WHERE `depart_id`=(SELECT `depart_id` FROM `users` WHERE `id`=?)");
			$stmt->bind_param("i", $id);
			$stmt->execute();
			$stmt->store_result();
			$stmt->bind_result($curriculum_ids, $curriculum_name);
			
			while ($stmt->fetch()) {
				
					    $json["curriculum_ids"][$counter] = $curriculum_ids;
						$json["curriculum_name"][$counter] = $curriculum_name;
				        
				$counter = $counter + 1;
			}
			$stmt->free_result();
			$stmt->close();
			
		    $stmt2 = $conn->prepare("SELECT id, name FROM enrollment WHERE uni_id = (SELECT uni_id FROM department WHERE id = (SELECT depart_id FROM users WHERE id = ?))");
			$stmt2->bind_param("i", $id);
			$stmt2->execute();
			$stmt2->store_result();

			$stmt2->bind_result($enrollment_ids, $enrollment_name);
			$counter = 0;
			while ($stmt2->fetch()) {
				
					    $json["enrollment_ids"][$counter] = $enrollment_ids;
						$json["enrollment_name"][$counter] = $enrollment_name;
				        
				$counter = $counter + 1;
			}
			$stmt2->free_result();
			$stmt2->close();
			
		   
		   echo json_encode($json);

	
	

	
	
	
}

else {
	die("");
}


?>