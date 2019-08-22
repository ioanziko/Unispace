<?php
require_once('../auth.php');

header("Content-type: application/json; charset=utf-8");


$stmt = $conn->prepare("SELECT current_semester,depart_id FROM users WHERE id=?");
$stmt->bind_param( "i", $id );

if ($stmt->execute()) {
  $stmt->store_result();

  $num_of_rows = $stmt->num_rows;
  $stmt->bind_result($users_current_semester, $users_depart_id);

  if ($num_of_rows == 1) {
    $stmt->fetch();
  }

}
$stmt->free_result();
$stmt->close();

$stmt2 = $conn->prepare("SELECT `id`, `until`, `sector_semester` FROM `choose_sector` WHERE `semester`=? AND `depart_id`=? ORDER BY `until` DESC LIMIT 0,1");		// LIMIT
$stmt2->bind_param( "ii", $users_current_semester, $users_depart_id );

if ($stmt2->execute()) {
  $stmt2->store_result();
  // $num_of_rows = $stmt->num_rows;
  $stmt2->bind_result($choose_sector_id, $choose_sector_until, $choose_sector_sector_semester );

  while ($stmt2->fetch()) {

  if($choose_sector_until > time()){
      $choose_sector = true;

      //βρισκω curriculum_id
      $curriculum_id=1;
      $stmt4 = $conn->prepare("SELECT `id` FROM `curriculum` WHERE `user_id` = ?");
      $stmt4->bind_param( "i", $id);

      if ($stmt4->execute()) {
        $stmt4->store_result();

        $num_of_rows = $stmt4->num_rows;
        $stmt4->bind_result($curriculum_id);

        if ($num_of_rows == 1) {
          $stmt4->fetch();
        }

      }
      $stmt4->free_result();
      $stmt4->close();

      //vrisko id , sector_name kateythinsis
      $stmt3 = $conn->prepare("SELECT `id`, `sector_name` FROM `sector` WHERE `curriculum_id` = ? AND `start_semester` = ?");
      $stmt3->bind_param( "ii", $curriculum_id , $choose_sector_sector_semester );

      if ($stmt3->execute()) {
        $stmt3->store_result();

        $num_of_rows = $stmt3->num_rows;
        $stmt3->bind_result($sector_id, $sector_sector_name);
			$counter = 0;
          while ($stmt3->fetch()) {
			    $json["ids"][$counter] = $sector_id;
				$json["name"][$counter] = $sector_sector_name;

			  
			  $counter = $counter + 1;
		  }       

      }
      $stmt3->free_result();
      $stmt3->close();


      $json["choose_sector"] = $choose_sector_id;


    }else{
      $choose_sector = false;
    }
  }
  if(!$stmt2->fetch()){
    $choose_sector = "not enough data";
  }
}
$stmt2->free_result();
$stmt2->close();

//echo $choose_sector;
echo json_encode($json);
 ?>
