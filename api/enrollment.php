<?php
require_once('../auth.php');

header("Content-type: application/json; charset=utf-8");

$json = array();

if ($level == 3) {
	
	$stmt = $conn->prepare("SELECT department.uni_id FROM `users` INNER JOIN `department` ON users.depart_id=department.id WHERE users.id=?");
$stmt->bind_param("i", $id);

$stmt->execute();
$stmt->store_result();

$stmt->bind_result($uni_id);

	$stmt->fetch();


		$stmt = $conn->prepare("SELECT department.uni_id FROM `users` INNER JOIN `department` ON users.depart_id=department.id WHERE users.id=?");
$stmt->bind_param("i", $id);

$stmt->execute();
$stmt->store_result();

$stmt->bind_result($uni_id);

	$stmt->fetch();
	
	$stmt->free_result();
$stmt->close();

		$stmt2 = $conn->prepare("SELECT `id`,`name` FROM `enrollment` WHERE `disable`=0 AND uni_id=?");
$stmt2->bind_param("i", $uni_id);

$stmt2->execute();
$stmt2->store_result();

$stmt2->bind_result($enrollment_id, $enrollment_name);
$json["ids"] = array();
$json["name"] = array();
$i=0;
	while ($stmt2->fetch()) {

	$json["ids"][$i] = $enrollment_id;
	$json["name"][$i] = $enrollment_name;
		
		$i = $i + 1;
	}
	
	$stmt2->free_result();
$stmt2->close();


	
	$stmt->free_result();
$stmt->close();

	
	$stmt->free_result();
$stmt->close();

echo json_encode($json);

}
else {
	die("");
	
}




?>