<?php
require_once('../auth.php');


if ($level == 3) {

	if (isset($_POST['data'])) {

	//$data = mysqli_real_escape_string($conn, $_GET['data']);
    //echo $data;
    //$data = $_GET['data'];
    $json = json_decode($_POST['data']);
    //print_r($json);
    //$count = count($json['email']);
    //echo(count($json['email']));

if (!is_array(($json->email))){

      $email = $json->email;
      $access_level = $json->access_level;
      $first_name = $json->first_name;
      $last_name = $json->last_name;
      $father_name = $json->father_name;
      $phone = $json->phone;
      $phone2 = $json->phone2;
      $address = $json->address;
      $post_code = $json->post_code;
      $date_of_registration = $json->date_of_registration;
      $semester_enter = $json->semester_enter;
      $enrollment = $json->enrollment;
      $first_degree = $json->first_degree;
      $gender = $json->gender;
      $birth_date = $json->birth_date;
      $country = $json->country;
      $curriculum_id = $json->curriculum_id;

	     //Κωδικός
      $tyxaios_kodikos = substr(md5(rand()), 0, 7);
      $options = [
                  'cost' => 11
                  ];
      $hash = password_hash($tyxaios_kodikos, PASSWORD_BCRYPT, $options);

      //Αυτά δεν μας τα δίνει το json
      $user_id = $id;
      $current_semester = $semester_enter;
      $status = 1;

      //depart_id
      $stmt2 = $conn->prepare("SELECT `depart_id` FROM `users` WHERE `id`=?");
      $stmt2->bind_param( "i", $id);

      if ($stmt2->execute()) {
      $stmt2->store_result();
      $num_of_rows = $stmt2->num_rows;
      $stmt2->bind_result($users_depart_id);
      if ($num_of_rows == 1) {
        $stmt2->fetch();
       }
      }

      $depart_id = $users_depart_id;

      //AEM
      if($level == 2 ){//kathigitis  --> den pairnei AEM
        $aem = 0;
      }else{

              $stmt3 = $conn->prepare("SELECT `aem` FROM `users` WHERE `depart_id` = ? ORDER BY `aem` DESC LIMIT 0,1");
              $stmt3->bind_param( "i", $users_depart_id);

              if ($stmt3->execute()) {
              $stmt3->store_result();
              $num_of_rows = $stmt3->num_rows;
              $stmt3->bind_result($users_aem);
              if ($num_of_rows == 1) {
                $stmt3->fetch();
               }
              }
              $aem = $users_aem + 1 ;
      }

      //username
      $username = substr($first_name, 0,4).substr($last_name, 0,4);
	  $username_search = $username.'%';
      $stmt4 = $conn->prepare("SELECT `username` FROM `users` WHERE `username` LIKE ? ORDER BY `username` DESC LIMIT 0,1");
      $stmt4->bind_param( "s", $username_search);

      if ($stmt4->execute()) {
      $stmt4->store_result();
      $num_of_rows = $stmt4->num_rows;
      $stmt4->bind_result($users_username);//last username existing
      if ($num_of_rows == 1) {
        $stmt4->fetch();

        preg_match_all('!\d+!', $users_username, $last_number);
        $var = implode(' ', $last_number[0]);
        $var = $var+1;
        $username = $username.$var;
       }
      }





      $stmt = $conn->prepare("INSERT INTO `users` (`username`, `email`, `aem`, `password`, `access_level`, `first_name`, `last_name`, `father_name`, `phone`, `phone2`, `address`, `post_code`, `date_of_registration`, `semester_enter`, `current_semester`, `enrollment`, `first_degree`, `status`, `gender`, `birth_date`, `country`, `user_id`, `depart_id`, `curriculum_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
      $stmt->bind_param("ssisisssiisisiiiiiissiii", $username, $email, $aem, $hash, $access_level, $first_name, $last_name, $father_name, $phone , $phone2, $address, $post_code, $date_of_registration, $semester_enter, $current_semester, $enrollment, $first_degree, $status, $gender, $birth_date, $country, $user_id, $depart_id, $curriculum_id);

      if(!($stmt->execute())){
        die('2');
      }else{

      }
      $stmt->close();
      $stmt2->close();

if ($access_level == 1) {
	  $time = time();
	  
      $stmt3 = $conn->prepare("INSERT INTO `my_sector`( `user_id`, `sector_id`, `date`, `choose_sector_id`) VALUES (?,(SELECT `id` FROM `sector` WHERE `curriculum_id`=? AND `start_semester`=1 ORDER BY `id` ASC LIMIT 0,1),?,NULL)");
      $stmt3->bind_param("iii", $id, $curriculum_id, $time);

      if(!($stmt3->execute())){
        die('2');
      }else{

      }
      $stmt3->close();
		
}
	  
	}
	else {
    for ($i=0; $i<count($json->email); $i++) {
      //echo $i;

      //Αυτά μας τα περνάει το json
      $email = $json->email[$i];
      $access_level = $json->access_level[$i];
      $first_name = $json->first_name[$i];
      $last_name = $json->last_name[$i];
      $father_name = $json->father_name[$i];
      $phone = $json->phone[$i];
      $phone2 = $json->phone2[$i];
      $address = $json->address[$i];
      $post_code = $json->post_code[$i];
      $date_of_registration = $json->date_of_registration[$i];
      $semester_enter = $json->semester_enter[$i];
      $enrollment = $json->enrollment[$i];
      $first_degree = $json->first_degree[$i];
      $gender = $json->gender[$i];
      $birth_date = $json->birth_date[$i];
      $country = $json->country[$i];
      $curriculum_id = $json->curriculum_id[$i];

      //Κωδικός
      $tyxaios_kodikos = substr(md5(rand()), 0, 7);
      $options = [
                  'cost' => 11
                  ];
      $hash = password_hash($tyxaios_kodikos, PASSWORD_BCRYPT, $options);

      //Αυτά δεν μας τα δίνει το json
      $user_id = $id;
      $current_semester = $semester_enter;
      $status = 1;

      //depart_id
      $stmt2 = $conn->prepare("SELECT `depart_id` FROM `users` WHERE `id`=?");
      $stmt2->bind_param( "i", $id);

      if ($stmt2->execute()) {
      $stmt2->store_result();
      $num_of_rows = $stmt2->num_rows;
      $stmt2->bind_result($users_depart_id);
      if ($num_of_rows == 1) {
        $stmt2->fetch();
       }
      }

      $depart_id = $users_depart_id;

      //AEM
      if($level == 2 ){//kathigitis  --> den pairnei AEM
        $aem = 0;
      }else{

              $stmt3 = $conn->prepare("SELECT `aem` FROM `users` WHERE `depart_id` = ? ORDER BY `aem` DESC LIMIT 0,1");
              $stmt3->bind_param( "i", $users_depart_id);

              if ($stmt3->execute()) {
              $stmt3->store_result();
              $num_of_rows = $stmt3->num_rows;
              $stmt3->bind_result($users_aem);
              if ($num_of_rows == 1) {
                $stmt3->fetch();
               }
              }
              $aem = $users_aem + 1 ;
      }

      //username
      $username = substr($first_name, 0,4).substr($last_name, 0,4);
	  	  $username_search = $username.'%';
      $stmt4 = $conn->prepare("SELECT `username` FROM `users` WHERE `username` LIKE ? ORDER BY `username` DESC LIMIT 0,1");
      $stmt4->bind_param( "s", "$username%");

      if ($stmt4->execute()) {
      $stmt4->store_result();
      $num_of_rows = $stmt4->num_rows;
      $stmt4->bind_result($users_username);//last username existing
      if ($num_of_rows == 1) {
        $stmt4->fetch();

        preg_match_all('!\d+!', $users_username, $last_number);
        $var = implode(' ', $last_number[0]);
        $var = $var+1;
        $username = $username.$var;
       }
      }






      $stmt = $conn->prepare("INSERT INTO `users` (`username`, `email`, `aem`, `password`, `access_level`, `first_name`, `last_name`, `father_name`, `phone`, `phone2`, `address`, `post_code`, `date_of_registration`, `semester_enter`, `current_semester`, `enrollment`, `first_degree`, `status`, `gender`, `birth_date`, `country`, `user_id`, `depart_id`, `curriculum_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
      $stmt->bind_param("ssisisssiisisiiiiiissiii", $username, $email, $aem, $hash, $access_level, $first_name, $last_name, $father_name, $phone , $phone2, $address, $post_code, $date_of_registration, $semester_enter, $current_semester, $enrollment, $first_degree, $status, $gender, $birth_date, $country, $user_id, $depart_id, $curriculum_id);

      if(!($stmt->execute())){
        die('2');
      }else{

      }
      $stmt->close();
      $stmt2->close();

if ($access_level == 1) {

	  $time = time();
	  
      $stmt3 = $conn->prepare("INSERT INTO `my_sector`( `user_id`, `sector_id`, `date`, `choose_sector_id`) VALUES (?,(SELECT `id` FROM `sector` WHERE `curriculum_id`=? AND `start_semester`=1 ORDER BY `id` ASC LIMIT 0,1),?,NULL)");
      $stmt3->bind_param("iii", $id, $curriculum_id, $time);

      if(!($stmt3->execute())){
        die('2');
      }else{

      }
      $stmt3->close();	  
}
	  
    }


	}
    die('1');//for loop end

  }else{
    die('2');//POST error
  }

}else{
  die('3');//wrong level
}
?>
