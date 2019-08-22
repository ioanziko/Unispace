<!--{"id":1,"statement_id":1,"aem":["55555","55551","55552","55556"],"grade":["4.00","7.00","3.50","9.00"]}
Στο table grades στο user_id teacher_id verify_grade θα μπει το $id.
Στο course_id το id απο το json
Στο register_course_id θα μπει το id απο το register_course. Το οποίο θα βρεθεί απο την αναζήτηση με βάση το id του φοιτητή (το id που θα βρεθεί απο το aem του json) και το id της δήλωσης μαθημάτων (statement_id απο το json)
Στο temp_grade και grade θα μπει ο βαθμός απο το json.
Στο weight θα πρέπει να μπει το βάρος του μαθήματος που θα το βρείτε στο course (με αναζήτηση με το id του json)
Το depart_id απο το table users. -->
<?php
$conn = new mysqli("localhost", "root", "", "testing");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
mysqli_set_charset($conn,"utf8");

$id = 1;
$level = 2;

if ($level == 2) {
  if (isset($_GET['data'])) {

		//$data = mysqli_real_escape_string($conn, $_GET['data']);
    $data = $_GET['data'];
    $json = json_decode($data);
    //echo $_GET['data'];
    //print_r($json);
    $array_json = (array) $json;
    //print_r($array_json['id']);

    $json_id = $array_json['id'];//id mathimatos
    $json_statement_id = $array_json['statement_id'];// id dilosis
    $json_AEMs = $array_json['aem']; //pinakas me AEM
    $json_grades = $array_json['grade'];// vathmologies ton AEM

    // echo "<br>"."<br>"."id: ".$json_id."<br>"."<br>" ;
    // echo "<br>"."<br>"."id: ".$json_statement_id."<br>"."<br>" ;
    // print_r($json_AEMs) ;
    // echo "<br>"."<br>";
    // print_r($json_grades) ;
    //echo count($json_AEMs);

    //vriskokume kathigiti me vasi to id tou mathimatos
    $stmt = $conn->prepare("SELECT `teacher_id`,`disable`,`weight` FROM `course` WHERE `id`=?");
		$stmt->bind_param( "i", $json_id);

		if ($stmt->execute()) {

  		$stmt->store_result();
  		$num_of_rows = $stmt->num_rows;
  		$stmt->bind_result($course_teacher_id, $course_disable, $course_weight);

  		if ($num_of_rows == 1) {
        $stmt->fetch();
		   }

		}
    $stmt->free_result();
		$stmt->close();
    //vrisko depart_id
    $stmt3 = $conn->prepare("SELECT `depart_id` FROM `users` WHERE `id`=?");//me poia metavliti vlepo an einai anoixtes diloseis???
		$stmt3->bind_param( "i", $id);

		if ($stmt3->execute()) {

  		$stmt3->store_result();
  		$num_of_rows =$stmt3->num_rows;
  		$stmt3->bind_result($users_depart_id);

  		if ($num_of_rows == 1) {
        $stmt3->fetch();
		   }

		}
    $stmt3->free_result();
		$stmt3->close();

    //echo $json_statement_id;
    //echo $users_depart_id;
    //vriskoume tin dilosi kai elgxoume an einai energi
    $stmt2 = $conn->prepare("SELECT id, grade_until FROM choose_course WHERE id=? AND depart_id=?");//me poia metavliti vlepo an einai anoixtes diloseis???
		$stmt2->bind_param( "ii", $json_statement_id, $users_depart_id);

		if ($stmt2->execute()) {
      //echo "stmt2"."<br>";
  		$stmt2->store_result();
  		$num_of_rows =$stmt2->num_rows;
  		$stmt2->bind_result($choose_course_id,$choose_course_grade_until);

  		if ($num_of_rows == 1) {
        $stmt2->fetch();
		   }

		}
    $stmt2->free_result();
		$stmt2->close();
    //echo "gradeuntil".$choose_course_grade_until."<br>" ;
    //elegxos anoixtis dilosis
    if($choose_course_grade_until > time()) //mia sygkekrimeni timi)
    {
      $diloseis_anoixtes = true;
    }else{
      //echo ($choose_course_grade_until - time() );
      $diloseis_anoixtes = true;//tha ginei false otan mpoyne kanonika timestamps
    }

    //elegxoume an to id tou xristi pou vazei to vathmo einai to id toy kathigiti pou ontos exei to mathima
    if($course_teacher_id == $id && $course_disable == 0 && $diloseis_anoixtes ){
      echo "Correct login"."<br>"; // synexizoume


      //pame na vroume ta id ton foititon vasei ton AEM
      $students_ids = array();
      $index = 0;
      for ( $i=0 ; $i < count($json_AEMs); $i++){
        $stmt4 = $conn->prepare("SELECT id FROM users WHERE aem=? AND depart_id=? ");		// LIMIT
        $stmt4->bind_param( "ii",$json_AEMs[$i] , $users_depart_id );
        // echo "<br>".$users_depart_id."  ";
        // echo $json_AEMs[$i]."<br>";

        if ($stmt4->execute()) {
          //echo "stmt2"."<br>";
          //echo "stmt4";
      		$stmt4->store_result();
      		$num_of_rows =$stmt4->num_rows;
      		$stmt4->bind_result($users_id);
          //echo $users_id;

      		if ($num_of_rows == 1) {
            $stmt4->fetch();
            $students_ids[$i] = $users_id;
          }else{ //proliptika ayto den tha xreiazetai otan oloi exoun unique AEM
            //$students_ids[$i] = $users_id;
            $stmt4->fetch();
            $students_ids[$i] = $users_id;
          }

    		}else{
          //$students_ids[$i] = "404";
        }

        $stmt4->free_result();
        $stmt4->close();
      }//print_r($students_ids); -- end of for loop

      //tha vroume ta register course id me vasei ta id toy foititi kai to staement id apo to json
      $register_course_ids = array();
      for($i=0; $i<count($students_ids);$i++){

        $stmt5 = $conn->prepare("SELECT id FROM register_course WHERE user_id=?");//poy na to valoume ayto sto grades
    		$stmt5->bind_param( "i", $students_ids[$i]);

    		if ($stmt5->execute()) {
          //echo "stmt2"."<br>";
      		$stmt5->store_result();
      		$num_of_rows =$stmt5->num_rows;
      		$stmt5->bind_result($student_register_course_ids[$i]);

      		if ($num_of_rows == 1) {
            $stmt5->fetch();
    		   }

    		}
        $stmt5->free_result();
    		$stmt5->close();

      }

      for ( $i=0 ; $i < count($json_grades); $i++){

        $stmt5 = $conn->prepare("INSERT INTO grades ( user_id,  teacher_id, verify_grade, course_id, register_course_id,temp_grade, grade, weight, depart_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        echo "1";
        $stmt5->bind_param("iiiiiiiii", $students_ids[$i], $id, $id, $json_id, $student_register_course_ids[$i], $json_grades[$i], $json_grades[$i], $course_weight, $depart_id  );
        echo "2";
        if ($stmt5->execute()) {
          echo "stmt5";
    	// $last_id = $conn->insert_id;

    		}
        $stmt5->close();


      }



    }else{
      echo "incorrect login";
    }
    // echo $course_teacher_id ==$id;
    // echo $course_disable==0;
    // echo $diloseis_anoixtes;










    // for ( $i=0 ; $i < count($json_AEMs); $i++){
    // }



  }
}


 ?>
