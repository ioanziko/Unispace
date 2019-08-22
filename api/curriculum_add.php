<?php
require_once('../auth.php');

   
   if ($level == 3) {
   
if (isset($_POST['data'])) {

$data = $_POST['data'];


$data_json = json_decode($data);

if (json_last_error() === 0) {
    
	
			$stmt = $conn->prepare("SELECT `depart_id` FROM `users` WHERE id=?");
			$stmt->bind_param("i", $id);
			$stmt->execute();
			$stmt->store_result();

			$stmt->bind_result($depart_id);
			$stmt->fetch();
	
			$stmt->free_result();
			$stmt->close();
	



	try {
mysqli_begin_transaction($conn, MYSQLI_TRANS_START_READ_WRITE);



			$stmt2 = $conn->prepare("INSERT INTO `curriculum` (`curriculum_name`, `depart_id`, `semester_number`, `max_course`, `user_id`) VALUES (?,?,?,?,?)");
			$stmt2->bind_param("siiii", ($data_json->curriculum_name), $depart_id, ($data_json->curriculum_semesters), ($data_json->curriculum_maxLessons), $id);

			$stmt2->execute();
			$curriculum_id = $conn->insert_id;
			$stmt2->close();

			
$insert_course = "INSERT INTO `course`(`curriculum_id`, `course_name`, `teacher_id`, `dscr`, `credits`, `ects`, `lab`, `session`, `weight`, `user_id`, `disable`) VALUES ";
for ($i=0; $i<count($data_json->curriculum_courses_name); $i++) {
	
	$insert_course .= "(".$curriculum_id.", '".mysqli_real_escape_string($conn, $data_json->curriculum_courses_name[$i])."', ".mysqli_real_escape_string($conn, $data_json->curriculum_courses_prof[$i]).", '".mysqli_real_escape_string($conn, $data_json->curriculum_courses_desc[$i])."', ".mysqli_real_escape_string($conn, $data_json->curriculum_courses_units[$i]).", ".mysqli_real_escape_string($conn, $data_json->curriculum_courses_ects[$i]).", ".mysqli_real_escape_string($conn, $data_json->curriculum_courses_lab[$i]).", ".mysqli_real_escape_string($conn, $data_json->curriculum_courses_seas[$i]).", ".intval($data_json->curriculum_courses_weight[$i] * 100).",".$id.",0),";

	
}
$insert_course = substr($insert_course, 0, -1);

			$stmt3 = $conn->prepare($insert_course);

			$stmt3->execute();
			$courses_id = $conn->insert_id;
			$stmt3->close();

			$courses_to_id = array();
			for ($i=0; $i<count($data_json->curriculum_courses_name); $i++) {
				$courses_to_id[$data_json->curriculum_courses_name[$i]] = $courses_id;
				$courses_id = $courses_id + 1;
			}
			
			$insert_sector = "INSERT INTO `sector`(`sector_name`, `curriculum_id`, `start_semester`, `last_sector_id`) VALUES ";

			for ($i=0; $i<count($data_json->curriculum_sector_name); $i++) {
	
				$insert_sector .= "('".mysqli_real_escape_string($conn, $data_json->curriculum_sector_name[$i])."', ".$curriculum_id.", ".mysqli_real_escape_string($conn, $data_json->curriculum_sector_start[$i]).", NULL),";
	
			}
			$insert_sector = substr($insert_sector, 0, -1);
			
			
			$stmt4 = $conn->prepare($insert_sector);

			$stmt4->execute();
			$sectors_id = $conn->insert_id;
			$stmt4->close();

			$sectors_to_id = array();
			for ($i=0; $i<count($data_json->curriculum_sector_name); $i++) {
				$sectors_to_id[$data_json->curriculum_sector_name[$i]] = $sectors_id;
				$sectors_id = $sectors_id + 1;
			}

			
			$search_course = 'course';
			$number = 1;
			$search_course_number = $search_course.$number;
			
			while (isset( $data_json->courses->$search_course_number )) {
			
			$current_course = $data_json->courses->$search_course_number;


						$stmt5 = $conn->prepare("INSERT INTO `semester`(`sector_id`, `semester`, `min_pass`) VALUES (".$sectors_to_id[$current_course->curriculum_semester_sector].", ".$current_course->curriculum_semester_number.", ".$current_course->curriculum_semester_minpass.")");

			$stmt5->execute();
			$semester_id = $conn->insert_id;
			$stmt5->close();

			
			if (count($current_course->type0) > 0 ) {
				
				
				$stmt6 = $conn->prepare("INSERT INTO `course_block`(`semester_id`, `type`, `max_select`, `min_pass`) VALUES (".$semester_id.",0,".(count($current_course->type0)).",".(count($current_course->type0)).")");

				$stmt6->execute();
				$course_block_id = $conn->insert_id;
				$stmt6->close();
				
				$insert_block = "INSERT INTO `block`(`course_id`, `course_block_id`, `user_id`) VALUES ";

				for ($i2=0; $i2<(count($current_course->type0)); $i2++) {
					$insert_block .= "(".$courses_to_id[$current_course->type0[$i2]].", ".$course_block_id.", ".$id."),";
					
					
				}
			$insert_block = substr($insert_block, 0, -1);

				$stmt7 = $conn->prepare($insert_block);

				$stmt7->execute();

				$stmt7->close();

				
			}
			
						if (count($current_course->type1) > 0 ) {
				
				
				$stmt6 = $conn->prepare("INSERT INTO `course_block`(`semester_id`, `type`, `max_select`, `min_pass`) VALUES (".$semester_id.",1,".(count($current_course->type1)).",".(count($current_course->type1)).")");

				$stmt6->execute();
				$course_block_id = $conn->insert_id;
				$stmt6->close();
				

				for ($i2=0; $i2<(count($current_course->type1)); $i2++) {

				$stmt7 = $conn->prepare("INSERT INTO `block`(`course_id`, `course_block_id`, `user_id`) VALUES (".$courses_to_id[$current_course->type1[$i2][0]].", ".$course_block_id.", ".$id.")");

				$stmt7->execute();
				$block_id = $conn->insert_id;
				$stmt7->close();

				if (count($current_course->type1[$i2]) > 1) {
				$insert_course_chain = "INSERT INTO `course_chain`(`block_id`, `chain_course_id`) VALUES ";
				for ($j2=1; $j2<(count($current_course->type1[$i2])); $j2++) {
					$insert_course_chain .= "(".$block_id.",".$courses_to_id[$current_course->type1[$i2][$j2]]."),";
				}
					$insert_course_chain = substr($insert_course_chain, 0, -1);

						$stmt8 = $conn->prepare($insert_course_chain);

						$stmt8->execute();

						$stmt8->close();

				
				}

					
				}

				

				
			}

			
						if (count($current_course->type2) > 0 ) {
				
				
				$stmt6 = $conn->prepare("INSERT INTO `course_block`(`semester_id`, `type`, `max_select`, `min_pass`) VALUES (".$semester_id.",2,".($current_course->curriculum_semester_max_select_type2).",".($current_course->curriculum_semester_min_pass_type2).")");

				$stmt6->execute();
				$course_block_id = $conn->insert_id;
				$stmt6->close();
				
				$insert_block = "INSERT INTO `block`(`course_id`, `course_block_id`, `user_id`) VALUES ";

				for ($i2=0; $i2<(count($current_course->type2)); $i2++) {
					$insert_block .= "(".$courses_to_id[$current_course->type2[$i2]].", ".$course_block_id.", ".$id."),";
					
					
				}
			$insert_block = substr($insert_block, 0, -1);

				$stmt7 = $conn->prepare($insert_block);

				$stmt7->execute();

				$stmt7->close();

				
			}
			
			
									if (count($current_course->type3) > 0 ) {
				
				
				$stmt6 = $conn->prepare("INSERT INTO `course_block`(`semester_id`, `type`, `max_select`, `min_pass`) VALUES (".$semester_id.",3,".($current_course->curriculum_semester_max_select_type3).",".($current_course->curriculum_semester_min_pass_type3).")");

				$stmt6->execute();
				$course_block_id = $conn->insert_id;
				$stmt6->close();
				

				for ($i2=0; $i2<(count($current_course->type3)); $i2++) {

				$stmt7 = $conn->prepare("INSERT INTO `block`(`course_id`, `course_block_id`, `user_id`) VALUES (".$courses_to_id[$current_course->type3[$i2][0]].", ".$course_block_id.", ".$id.")");

				$stmt7->execute();
				$block_id = $conn->insert_id;
				$stmt7->close();

				if (count($current_course->type3[$i2]) > 1) {
				$insert_course_chain = "INSERT INTO `course_chain`(`block_id`, `chain_course_id`) VALUES ";
				for ($j2=1; $j2<(count($current_course->type3[$i2])); $j2++) {
					$insert_course_chain .= "(".$block_id.",".$courses_to_id[$current_course->type3[$i2][$j2]]."),";
				}
					$insert_course_chain = substr($insert_course_chain, 0, -1);

						$stmt8 = $conn->prepare($insert_course_chain);

						$stmt8->execute();

						$stmt8->close();

				
				}

					
				}

				

				
			}
			
			
			
									if (count($current_course->type4) > 0 ) {
				
				
				$stmt6 = $conn->prepare("INSERT INTO `course_block`(`semester_id`, `type`, `max_select`, `min_pass`) VALUES (".$semester_id.",4,".($current_course->curriculum_semester_max_select_type4).",0)");

				$stmt6->execute();
				$course_block_id = $conn->insert_id;
				$stmt6->close();
				
				$insert_block = "INSERT INTO `block`(`course_id`, `course_block_id`, `user_id`) VALUES ";

				for ($i2=0; $i2<(count($current_course->type4)); $i2++) {
					$insert_block .= "(".$courses_to_id[$current_course->type4[$i2]].", ".$course_block_id.", ".$id."),";
					
					
				}
			$insert_block = substr($insert_block, 0, -1);

				$stmt7 = $conn->prepare($insert_block);

				$stmt7->execute();

				$stmt7->close();

				
			}
			
			
			
			
									if (count($current_course->type5) > 0 ) {
				
				
				$stmt6 = $conn->prepare("INSERT INTO `course_block`(`semester_id`, `type`, `max_select`, `min_pass`) VALUES (".$semester_id.",5,".($current_course->curriculum_semester_max_select_type5).",0)");

				$stmt6->execute();
				$course_block_id = $conn->insert_id;
				$stmt6->close();
				

				for ($i2=0; $i2<(count($current_course->type5)); $i2++) {

				$stmt7 = $conn->prepare("INSERT INTO `block`(`course_id`, `course_block_id`, `user_id`) VALUES (".$courses_to_id[$current_course->type5[$i2][0]].", ".$course_block_id.", ".$id.")");

				$stmt7->execute();
				$block_id = $conn->insert_id;
				$stmt7->close();

				if (count($current_course->type5[$i2]) > 1) {
				$insert_course_chain = "INSERT INTO `course_chain`(`block_id`, `chain_course_id`) VALUES ";
				for ($j2=1; $j2<(count($current_course->type5[$i2])); $j2++) {
					$insert_course_chain .= "(".$block_id.",".$courses_to_id[$current_course->type5[$i2][$j2]]."),";
				}
					$insert_course_chain = substr($insert_course_chain, 0, -1);

						$stmt8 = $conn->prepare($insert_course_chain);

						$stmt8->execute();

						$stmt8->close();

				
				}

					
				}

				

				
			}
			
			if ($current_course->type6[0] == 1) {
				
						$stmt8 = $conn->prepare("INSERT INTO `course_block`(`semester_id`, `type`, `max_select`, `min_pass`) VALUES (".$semester_id.",6,1,1)");

						$stmt8->execute();

						$stmt8->close();
				
				
			}

			
			
			
			$number = $number + 1;
$search_course_number = $search_course.$number;


			}

			

			
mysqli_commit($conn);


echo "1";

} catch (Exception $e) {
	mysqli_rollback($conn);
echo "2";
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