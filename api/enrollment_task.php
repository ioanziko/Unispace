<?php
require_once('../auth.php');

if ($level == 3) {
	
	if (isset($_POST['name']) && isset($_POST['id'])) {
		
		
		$name = mysqli_real_escape_string($conn, $_POST['name']);
		$task_id = mysqli_real_escape_string($conn, $_POST['id']);

		if (is_numeric($task_id) && round($task_id)==$task_id && $task_id>=0) {
			 		$stmt = $conn->prepare("SELECT department.uni_id FROM `users` INNER JOIN `department` ON users.depart_id=department.id WHERE users.id=?");
					$stmt->bind_param("i", $id);

					$stmt->execute();
					$stmt->store_result();

					$stmt->bind_result($uni_id);

					$stmt->fetch();
	
					$stmt->free_result();
					$stmt->close();

			 if ($task_id == 0) {
					
					if (strlen($name) >= 2) {
				 			$stmt2 = $conn->prepare("INSERT INTO `enrollment`(`name`, `disable`, `user_id`, `uni_id`) VALUES (?,0,?,?)");
							$stmt2->bind_param("sii", $name, $id, $uni_id);

							$stmt2->execute();

							$stmt2->close();
							
							echo("1");
							die();
					}
					else {
						die("2");
					}
			 }
			 else {
				 
				 			$stmt2 = $conn->prepare("UPDATE `enrollment` SET `disable`=1 WHERE id=? AND uni_id=?");
							$stmt2->bind_param("ii", $task_id, $uni_id);

							$stmt2->execute();

							$stmt2->close();
				 
							echo("1");
							die();
				 
				 
				 
			 }			 
			 
		 }
		 else {
				
			die("2");
		
		 }
	}
	else {
	
	
	die("2");
	
	}
}
else {
	
	die("3");
	
	
}


?>
