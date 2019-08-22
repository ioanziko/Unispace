<?php
//require_once('./auth.php');

$conn = new mysqli("localhost", "root", "", "testing");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
   mysqli_set_charset($conn,"utf8");

header("Content-type: application/json; charset=utf-8");

$json = array();

$id=1;

$stmt = $conn->prepare("SELECT current_semester FROM users WHERE users.id=?");
$stmt->bind_param( "i", $id);

$stmt->execute();
$stmt->store_result();

$stmt->bind_result($current_semester);

while ($stmt->fetch()) {

  $stmt2 = $conn->prepare("SELECT max_course FROM curriculum WHERE user_id=?");
	$stmt2->bind_param("i", $id);

	$stmt2->execute();
	$stmt2->store_result();

	$stmt2->bind_result($max_course);//poy mas xreiazetai ayto gia thn ora epeidh sto json apla exoyme ayta poy mporoyn kai mh na dilothoyn

  $index=0;
  while ($stmt2->fetch()) {

    $stmt3 = $conn->prepare("SELECT grades.course_id, course.course_name, course.teacher_id FROM grades  INNER JOIN course ON course.id=grades.course_id WHERE (grades.user_id=?) AND (grades.grade>=5)"); // teachers
    $stmt3->bind_param("i", $id);
    //perasmena mathimata me to course_id poy epistrefetai edo -- ara den mporoyn na dilothoun
    $stmt3->execute();
    $stmt3->store_result();

    $courses_passed = array();
    $courses_passed_names = array();
    $courses_passed_semesters = array();
    $courses_passed_teachers = array();
    $courses_passed_max_select = array();
    $courses_passed_type = array();
    $courses_passed_id = array();

    $courses_not_passed = array();
    $courses_not_passed_names = array();
    $courses_not_passed_semesters = array();
    $courses_not_passed_teachers = array();
    $courses_not_passed_max_select = array();
    $courses_not_passed_type = array();
    $courses_not_passed_id = array();


    $stmt3->bind_result($course_id_passed, $course_course_name, $course_teacher_id);//perasmena mahthimata

    //SELECT course_block.semester_id FROM course_block INNER JOIN block ON block.course_block_id = course_block.id WHERE (block.course_id = 2)

    while ($stmt3->fetch()) {
      $courses_passed[$index]=$course_id_passed;
      $courses_passed_names[$index]=$course_course_name;
      //$index++;
      $stmt10 = $conn->prepare("SELECT course_block.semester_id, course_block.type, course_block.max_select FROM course_block INNER JOIN block ON block.course_block_id = course_block.id WHERE (block.course_id = ?)");
      $stmt10->bind_param("i", $course_id_passed);
      //perasmena mathimata me to course_id poy epistrefetai edo -- ara den mporoyn na dilothoun
      $stmt10->execute();
      $stmt10->store_result();

      $stmt10->bind_result($course_block_semester_id, $course_block_type, $course_block_max_select);
      $stmt10->fetch();

      $courses_passed_max_select[$index]=$course_block_max_select;
      $courses_passed_type[$index] = $course_block_type;
      $courses_passed_id[$index] = $course_block_semester_id;

      $stmt11 = $conn->prepare("SELECT semester FROM semester WHERE id =? ");
      $stmt11->bind_param( "i", $course_block_semester_id);

      if($stmt11->execute()){
        $stmt11->store_result();
        $stmt11->bind_result($semester_semester);
        while($stmt11->fetch()){
           $courses_passed_semesters[$index]=$semester_semester;
        }
      }

      $stmt12 = $conn->prepare("SELECT first_name, last_name FROM users WHERE id=?");
      $stmt12->bind_param( "i", $course_teacher_id );

      if ($stmt12->execute()) {
        $stmt12->store_result();
        $stmt12->bind_result($first_name, $last_name);
          while($stmt12->fetch()){
           $courses_passed_teachers[$index]=$first_name ." ".$last_name;

        }
      }
      $index++;
    }


    $temp = sizeof($courses_passed);//arithmos perasameno mathimaton
    $index=0;

    $stmt4 = $conn->prepare("SELECT sector_id FROM my_sector WHERE user_id=?");
    $stmt4->bind_param("i", $id);

    $stmt4->execute();
    $stmt4->store_result();

    $stmt4->bind_result($sector_id);
    while ($stmt4->fetch()) {
      //echo $sector_id;
      $sectors_chosen[$index]=$sector_id;
      $index++;

      $stmt5 = $conn->prepare("SELECT semester.semester, semester.id, semester.min_pass,users.current_semester FROM semester INNER JOIN users WHERE (semester.sector_id=?)");
      //SELECT semester.semester,semester.id,semester.min_pass,users.current_semester FROM semester INNER JOIN users WHERE (semester.sector_id=1) AND ((semester.semester-users.current_semester)%2 =0) AND (semester.semester <= users.current_semester)

      $stmt5->bind_param("i", $sector_id);

      $stmt5->execute();
      $stmt5->store_result();

      $stmt5->bind_result($semester,$sem_id,$sem_min_pass,$current_semester);
      $index=0;
      while ($stmt5->fetch()) {

        if(abs($current_semester-$semester)%2 == 0 && $semester<=$current_semester && $temp >= $sem_min_pass){//do sth

          $stmt6 = $conn->prepare("SELECT id, type, max_select,min_pass FROM course_block  WHERE semester_id=?");
          $stmt6->bind_param("i", $sem_id);

          $stmt6->execute();
          $stmt6->store_result();

          $stmt6->bind_result($course_block_id,$course_block_type,$max_select,$min_pass);

          while ($stmt6->fetch()) {
            //echo $course_block_id;//kala mexri edo
            $stmt7 = $conn->prepare("SELECT course_id,id FROM block  WHERE course_block_id=?");
            $stmt7->bind_param("i", $course_block_id);

            $stmt7->execute();
            $stmt7->store_result();

            $stmt7->bind_result($block_course_id,$block_id);

            while ($stmt7->fetch()) {
              //echo $block_id;//ok mexri edo

              if(!in_array($block_course_id, $courses_passed)){
                        //mi perasmena

                if($course_block_type=='1' OR $course_block_type=='3'  OR $course_block_type=='5' ){
                  //pos akrivos mporoume na diaxeiristoume ta mathimata typoy alysidas?_m
                  $stmt8 = $conn->prepare("SELECT chain_course_id FROM course_chain  WHERE block_id=?");
                  $stmt8->bind_param("i", $block_id);

                  $stmt8->execute();
                  $stmt8->store_result();

                  $stmt8->bind_result($chain_course_id);
                  $flag=true;
                  while ($stmt8->fetch()) {
                    if(!in_array($chain_course_id,$courses_passed)){
                      $flag=false;
                      break;
                    }
                  }
                  if($flag){
                    //available mathima gia dilosi
                    array_push($courses_not_passed, $block_course_id);
                    array_push($courses_not_passed_max_select, $max_select);
                    array_push($courses_not_passed_type, $course_block_type);
                    array_push($courses_not_passed_id, $course_block_id);

					
                    //mathimata pou den exoyn perastei
                    $stmt13 = $conn->prepare("SELECT course_name, teacher_id FROM course  WHERE id=?");
                    $stmt13->bind_param("i", $block_course_id);

                    $stmt13->execute();
                    $stmt13->store_result();

                    $stmt13->bind_result($course_course_name, $course_teacher_id);
                    while ($stmt13->fetch()) {
                      array_push($courses_not_passed_names,$course_course_name);

                      $stmt14 = $conn->prepare("SELECT course_block.semester_id, course_block.type, course_block.max_select FROM course_block INNER JOIN block ON block.course_block_id = course_block.id WHERE (block.course_id = ?)");
                      $stmt14->bind_param("i", $block_course_id);
                      $stmt14->execute();
                      $stmt14->store_result();

                      $stmt14->bind_result($course_block_semester_id, $course_block_type, $course_block_max_select);
                      $stmt14->fetch();

                      $stmt15 = $conn->prepare("SELECT semester FROM semester WHERE id = ? ");
                      $stmt15->bind_param( "i", $course_block_semester_id);

                      if($stmt15->execute()){
                        $stmt15->store_result();
                        $stmt15->bind_result($semester_semester);
                        while($stmt15->fetch()){
                           array_push($courses_not_passed_semesters, $semester_semester);
                        }
                      }

                      $stmt16 = $conn->prepare("SELECT first_name, last_name FROM users WHERE id=?");
                      $stmt16->bind_param( "i", $course_teacher_id );

                      if ($stmt16->execute()) {
                        $stmt16->store_result();
                        $stmt16->bind_result($first_name, $last_name);
                          while($stmt16->fetch()){
                           array_push($courses_not_passed_teachers,$first_name ." ".$last_name);
                        }
                      }
}}

                  }else{//perasmena
                    array_push($courses_passed, $block_course_id);//perasmeno
                    array_push($courses_passed_max_select, $max_select);
                    array_push($courses_passed_type, $course_block_type);
					array_push($courses_passed_id, $course_block_semester_id);
                    $stmt9 = $conn->prepare("SELECT course_name, teacher_id FROM course  WHERE id=?");
                    $stmt9->bind_param("i", $block_course_id);
                    $stmt9->execute();
                    $stmt9->store_result();

                    $stmt9->bind_result($course_course_name, $course_teacher_id);
                    while ($stmt9->fetch()) {
                      array_push($courses_passed_names,$course_course_name);

                      $stmt17 = $conn->prepare("SELECT course_block.semester_id, course_block.type, course_block.max_select FROM course_block INNER JOIN block ON block.course_block_id = course_block.id WHERE (block.course_id = ?)");
                      $stmt17->bind_param("i", $block_course_id);
                      $stmt17->execute();
                      $stmt17->store_result();

                      $stmt17->bind_result($course_block_semester_id, $course_block_type, $course_block_max_select);
                      $stmt17->fetch();

                      $stmt18 = $conn->prepare("SELECT semester FROM semester WHERE id = ? ");
                      $stmt18->bind_param( "i", $course_block_semester_id);

                      if($stmt18->execute()){
                        $stmt18->store_result();
                        $stmt18->bind_result($semester_semester);
                        while($stmt18->fetch()){
                           array_push($courses_passed_semesters, $semester_semester);
                        }
                      }

                      $stmt19 = $conn->prepare("SELECT first_name, last_name FROM users WHERE id=?");
                      $stmt19->bind_param( "i", $course_teacher_id );

                      if ($stmt19->execute()) {
                        $stmt19->store_result();
                        $stmt19->bind_result($first_name, $last_name);
                          while($stmt19->fetch()){
                           array_push($courses_passed_teachers,$first_name ." ".$last_name);
                        }
                      }

                    }
                }}else{
                  array_push($courses_not_passed, $block_course_id);
                  array_push($courses_not_passed_max_select, $max_select);
                  array_push($courses_not_passed_type, $course_block_type);
                  array_push($courses_not_passed_id, $course_block_semester_id);
				  
				  
                  $stmt20 = $conn->prepare("SELECT course_name, teacher_id FROM course  WHERE id=?");
                  $stmt20->bind_param("i", $block_course_id);

                  $stmt20->execute();
                  $stmt20->store_result();

                  $stmt20->bind_result($course_course_name, $course_teacher_id);
                  while ($stmt20->fetch()) {
                    array_push($courses_not_passed_names,$course_course_name);

                    $stmt21 = $conn->prepare("SELECT course_block.semester_id, course_block.type, course_block.max_select FROM course_block INNER JOIN block ON block.course_block_id = course_block.id WHERE (block.course_id = ?)");
                    $stmt21->bind_param("i", $block_course_id);
                    $stmt21->execute();
                    $stmt21->store_result();

                    $stmt21->bind_result($course_block_semester_id, $course_block_type, $course_block_max_select);
                    $stmt21->fetch();

                    $stmt22 = $conn->prepare("SELECT semester FROM semester WHERE id = ? ");
                    $stmt22->bind_param( "i", $course_block_semester_id);

                    if($stmt22->execute()){
                      $stmt22->store_result();
                      $stmt22->bind_result($semester_semester);
                      while($stmt22->fetch()){
                         array_push($courses_not_passed_semesters, $semester_semester);
                      }
                    }

                    $stmt23 = $conn->prepare("SELECT first_name, last_name FROM users WHERE id=?");
                    $stmt23->bind_param( "i", $course_teacher_id );

                    if ($stmt23->execute()) {
                      $stmt23->store_result();
                      $stmt23->bind_result($first_name, $last_name);
                        while($stmt23->fetch()){
                         array_push($courses_not_passed_teachers,$first_name ." ".$last_name);
                      }
                    }

                  }
                }
              }//else{//perasmena

              //}



            }
          }
        }
      }
    }
  }


//mathimata poy exoun perastei
$json["Unavailable "] = array();
$json["Unavailable "][0] = $courses_passed_names;
$json["Unavailable "][1] = $courses_passed_teachers;
$json["Unavailable "][2] = $courses_passed_semesters;
$json["Unavailable "][3] = $courses_passed_max_select;
$json["Unavailable "][4] = $courses_passed_type;
$json["Unavailable "][5] = $courses_passed_id;

$json["Available "] = array();
$json["Available "][0] = $courses_not_passed_names;
$json["Available "][1] = $courses_not_passed_teachers;
$json["Available "][2] = $courses_not_passed_semesters;
$json["Available "][3] = $courses_not_passed_max_select;
$json["Available "][4] = $courses_not_passed_type;
$json["Available "][5] = $courses_not_passed_id;

//print_r($courses_passed); //perasmena mathimata, epistrefei course_id
//print_r($sectors_chosen); //epilegmenes kateythinseis, 1->kormos, 2 ->energeia
// print_r($courses_passed_names);
// print_r($courses_passed_teachers);
// print_r($courses_passed_semesters);
// print_r($courses_passed_max_select);
//
// print_r($courses_not_passed_names);
// print_r($courses_not_passed_teachers);
// print_r($courses_not_passed_semesters);
// print_r($courses_not_passed_max_select);
echo json_encode($json);

?>
