<?php
require_once('../auth.php');

  
  header("Content-type: application/json; charset=utf-8");

   
   if (isset($_POST['t_id'])) {
	   
	   $json = array(); 
	   

	   
	   $t_id = mysqli_real_escape_string($conn, $_POST['t_id']);
	   
	   if (is_numeric($t_id) && round($t_id)==$t_id && $t_id>0) {
		   
  			$stmt = $conn->prepare("SELECT `id`, `email`, `first_name`, `last_name`, `father_name`, `phone`, `phone2`, `address`, `post_code`, `status`, `gender` FROM `users` WHERE `id`=? AND `depart_id`=(SELECT `depart_id` FROM `users` WHERE `id`=?) AND access_level=2");
			$stmt->bind_param("ii", $t_id, $id);
			$stmt->execute();
			$stmt->store_result();

			$stmt->bind_result($user_id, $email, $first_name, $last_name, $father_name, $phone, $phone2, $address, $post_code, $status, $gender);
			$stmt->fetch();
				
					   $json["id"] = $user_id;
						$json["email"] = $email;
						$json["first_name"] = $first_name;
						$json["last_name"] = $last_name;
						$json["father_name"] = $father_name;
						$json["phone"] = $phone;
						$json["phone2"] = $phone2;
						$json["address"] = $address;
						$json["post_code"] = $post_code;
						$json["status"] = $status;
						if ($gender == 0)
						$json["gender"] = 'Γυναίκα';
						else
						$json["gender"] = 'Άνδρας';
				
			
	
			$stmt->free_result();
			$stmt->close();
		   
		   
		    $stmt2 = $conn->prepare("SELECT `description`, `contact_hours`, `site`, `staff_sector` FROM `staff_info`  WHERE `user_id`=? AND `depart_id`=(SELECT `depart_id` FROM `users` WHERE `id`=?)");
			$stmt2->bind_param("ii", $t_id, $id);
			$stmt2->execute();
			$stmt2->store_result();

			$stmt2->bind_result($description, $contact_hours, $site, $staff_sector);
			$stmt2->fetch();

			$stmt2->free_result();
			$stmt2->close();

						$json["description"] = $description;
						$json["contact_hours"] = $contact_hours;
						$json["site"] = $site;
						$json["staff_sector"] = $staff_sector;

		   echo json_encode($json);
			
		   }
	   else {
	 
	 die("");
	 
	   }
	   
   }
   else {
	   
	   die("");
	   
   }  
   

?>