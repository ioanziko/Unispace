<?php
require_once('../auth.php');
header("Content-type: application/json; charset=utf-8");

       $json = array(); 
	   $json["ids"] = array();
	   $json["name"] = array();
	   $json["credits"] = array();
	   $json["ects"] = array();
	   

	   $counter = 0;
	   if (is_numeric($level) && round($level)==$level && $level==2){
		   	   $stmt = $conn->prepare(" SELECT id,course_name,credits,ects FROM course WHERE teacher_id = ? ");
               $stmt->bind_param("i", $id);
			   $stmt->execute();
			$stmt->store_result();

			$stmt->bind_result($course_id, $name, $credits, $ects);
			while ($stmt->fetch()) {
				
					   $json["ids"][$counter] = $course_id;
						$json["name"][$counter] = $name;
						$json["credits"][$counter] = $credits;
						$json["ects"][$counter] = $ects;
				        
				
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
