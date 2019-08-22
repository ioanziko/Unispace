<?php
require_once('../auth.php');


if (isset($_POST['choose_sector']) && isset($_POST['sector_id'] )) {
	
	$choose_sector = mysqli_real_escape_string($conn, $_POST['choose_sector']);
	$sector_id = mysqli_real_escape_string($conn, $_POST['sector_id']);
	$time = time();
	
	if ((is_numeric($choose_sector) && round($choose_sector)==$choose_sector && $choose_sector>0) && (is_numeric($sector_id) && round($sector_id)==$sector_id && $sector_id>0)) {
	
	
	$stmt = $conn->prepare("SELECT until, depart_id FROM choose_sector WHERE id=?");
	$stmt->bind_param("i", $choose_sector);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($until, $depart_id);
	$stmt->fetch();
	$stmt->free_result();
	$stmt->close();
	
	
	
	
	$stmt2 = $conn->prepare("SELECT curriculum_id FROM users WHERE id=?");
	$stmt2->bind_param("i", $id);
	$stmt2->execute();
	$stmt2->bind_result($curriculum_id);
	$stmt2->fetch();
	$stmt2->free_result();
	$stmt2->close();
	
	
	if ($until > $time){
	$stmt3 = $conn->prepare("INSERT INTO my_sector (sector_id, choose_sector_id, date, user_id) VALUES (?, ?, ?,?)");
	$stmt3->bind_param("iiii", $sector_id, $choose_sector, $time, $id);
	$stmt3->execute();
	$stmt3->close();
	echo '1';
	}
	
	else {
		die("2");

		}
}


else {
	die("22");
}

}
else {
	die("222");
}

?>