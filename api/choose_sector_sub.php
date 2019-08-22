<?php
require_once('../auth.php');

if (isset($_POST['choose_sector_start']) && isset($_POST['choose_sector_end']) && isset($_POST['choose_sector_semester1']) && isset($_POST['choose_sector_semester2']))
if ($level == 3){
	
	$choose_sector_start = strtotime(mysqli_real_escape_string($conn, $_POST['choose_sector_start']));
	$choose_sector_end = strtotime(mysqli_real_escape_string($conn, $_POST['choose_sector_end']));
	$choose_sector_semester1 = mysqli_real_escape_string($conn, $_POST['choose_sector_semester1']);
	$choose_sector_semester2 = mysqli_real_escape_string($conn, $_POST['choose_sector_semester2']);

	  $stmt3 = $conn->prepare("INSERT INTO `choose_sector`(`from`, `until`, `semester`, `sector_semester`, `depart_id`, `user_id`) VALUES (?,?,?,?,(SELECT `depart_id` FROM users WHERE `id`=?),?)");
      $stmt3->bind_param("iiiiii", $choose_sector_start, $choose_sector_end, $choose_sector_semester1, $choose_sector_semester2, $id, $id);

      if(!($stmt3->execute())){
        die('2');
      }else{
		echo '1';
      }
      $stmt3->close();	  

	  die();

}
else {
	die("3");
	
}

?>