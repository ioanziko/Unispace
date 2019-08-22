<?php
require_once('../auth.php');
header("Content-type: application/json; charset=utf-8");

       $json = array(); 
	   $json["ids"] = array();
	   $json["name"] = array();
	   $json["aem"] = array();
	   $json["semester"] = array();
	   $json["year"] = array();
	   $json["in_name"] = array();

	   $counter = 0;
	   if ($level == 3){
		   	   $stmt = $conn->prepare(" SELECT users.id, users.first_name, users.last_name,  users.aem, users.current_semester, users.date_of_registration, enrollment.name AS enrollment FROM users INNER JOIN enrollment ON enrollment.id = users.enrollment WHERE users.access_level = 1 AND users.depart_id = (SELECT users.depart_id FROM users WHERE users.id = ?)");
               $stmt->bind_param("i", $id);
			   $stmt->execute();
			$stmt->store_result();

			$stmt->bind_result($user_id, $first_name, $last_name, $aem, $semester , $year, $in_name);
			while ($stmt->fetch()) {
				
					   $json["ids"][$counter] = $user_id;
						$json["name"][$counter] = $last_name.' '.$first_name;
						$json["aem"][$counter] = $aem;
						$json["semester"][$counter] = $semester;
				        $json["year"][$counter] = $year;
	                    $json["in_name"][$counter]  = $in_name;
				
				$counter = $counter + 1;
			}
		   $stmt->free_result();
			$stmt->close();
		   
		   echo json_encode($json);
	   }
	   else {
		   die("");
	   }
	   
	   
?>
