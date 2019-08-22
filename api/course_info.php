<?php
require_once('../auth.php');

header("Content-type: application/json; charset=utf-8");


if($level == 2){
  if (isset($_POST['t_id'])) {


		$c_id = mysqli_real_escape_string($conn, $_POST['t_id']);

    $stmt = $conn->prepare("SELECT `teacher_id`, `disable`,`curriculum_id` FROM `course` WHERE `id` = ?");
    $stmt->bind_param( "i", $c_id);

    if ($stmt->execute()) {
      $stmt->store_result();
      $num_of_rows = $stmt->num_rows;
      $stmt->bind_result($course_teacher_id, $course_disable, $course_curriculum_id);
      if ($num_of_rows == 1) {
        $stmt->fetch();
       }
    }

    if($course_teacher_id == $id && $course_disable == 0){

      $stmt2 = $conn->prepare("SELECT `depart_id`, `curriculum_name` FROM `curriculum` WHERE `id` = ?");
      $stmt2->bind_param( "i", $course_curriculum_id);

      if ($stmt2->execute()) {
        $stmt2->store_result();
        $num_of_rows = $stmt2->num_rows;
        $stmt2->bind_result($curriculum_depart_id, $curriculum_curriculum_name);
        if ($num_of_rows == 1) {
          $stmt2->fetch();
         }
      }

      $stmt3 = $conn->prepare("SELECT `id`, `name`, `grade_until` FROM `choose_course` WHERE `depart_id`=? ORDER BY `grade_until` DESC LIMIT 0,1");
  		$stmt3->bind_param( "i", $curriculum_depart_id);

  		if ($stmt3->execute()) {
  		$stmt3->store_result();
  		$num_of_rows = $stmt3->num_rows;
  		$stmt3->bind_result($choose_course_id,$choose_course_name,$choose_course_grade_until);
  		if ($num_of_rows == 1) {
        $stmt3->fetch();
		   }
  		}

      $stmt4 = $conn->prepare("SELECT `course_name`, `teacher_id`, `dscr`, `credits`, `ects`, `lab`, `session`, `disable` FROM `course` WHERE `id`=?");
      $stmt4->bind_param( "i", $c_id);

      if ($stmt4->execute()) {
      $stmt4->store_result();
      $num_of_rows = $stmt4->num_rows;
      $stmt4->bind_result($course_course_name, $course_teacher_id, $course_dscr, $course_credits, $course_ects, $course_lab, $course_session, $course_disable);
      if ($num_of_rows == 1) {
        $stmt4->fetch();
       }
      }

      $stmt5 = $conn->prepare("SELECT `first_name`, `last_name` FROM `users` WHERE `id`=?");
      $stmt5->bind_param( "i", $course_teacher_id);

      if ($stmt5->execute()) {
      $stmt5->store_result();
      $num_of_rows = $stmt5->num_rows;
      $stmt5->bind_result($users_first_name, $users_last_name);
      if ($num_of_rows == 1) {
        $stmt5->fetch();
       }
      }

    }else{
      die('3');
    }
    $stmt5->free_result();
    $stmt5->close();
    $stmt4->free_result();
    $stmt4->close();
    $stmt3->free_result();
    $stmt3->close();
    $stmt2->free_result();
    $stmt2->close();
    $stmt->free_result();
    $stmt->close();

    $json["id"] = $c_id;
    $json["curriculum"] = $curriculum_curriculum_name;
    $json["course_name"] = $course_course_name;
    $json["teacher"] = $users_first_name." ".$users_last_name;
    $json["dscr"] = $course_dscr;
    $json["credits"] = $course_credits;
    $json["ects"] = $course_ects;
    $json["lab"] = $course_lab;
    $json["session"] = $course_session;
    $json["disable"] = $course_disable;
    $json["statement_id"] = $choose_course_id;
    $json["statement_name"] = $choose_course_name;
    $json["statement_until"] = $choose_course_grade_until;
    echo json_encode($json);

	}else{
    die('2');
  }
}else {
  die('3');
}

?>
