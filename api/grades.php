<?php
require_once('../auth.php');

header("Content-type: application/json; charset=utf-8");

$json = array();

$stmt = $conn->prepare("SELECT my_sector.id, sector.sector_name FROM my_sector INNER JOIN sector ON my_sector.sector_id=sector.id WHERE my_sector.user_id=? ORDER BY my_sector.id ASC");
$stmt->bind_param("i", $id);

$stmt->execute();
$stmt->store_result();

$stmt->bind_result($sector_id, $sector_name);

while ($stmt->fetch()) {


	$stmt2 = $conn->prepare("SELECT id, semester FROM semester WHERE sector_id=? ORDER BY semester ASC");//ascending
	$stmt2->bind_param("i", $sector_id);

	$stmt2->execute();
	$stmt2->store_result();

	$stmt2->bind_result($semester_id,$semester_number);

	while ($stmt2->fetch()) {

			$json["Εξάμηνο ".$semester_number] = array();

			$stmt3 = $conn->prepare("SELECT id,type FROM course_block	WHERE semester_id=?");//ascending
			$stmt3->bind_param("i", $semester_id);

			$stmt3->execute();
			$stmt3->store_result();

			$stmt3->bind_result($course_block_id, $course_block_type);
			$i = 0;
			while ($stmt3->fetch()) {

				$stmt4 = $conn->prepare("SELECT block.course_id, course.course_name, course.teacher_id, course.credits, course.ects, course.weight FROM block INNER JOIN course ON block.course_id=course.id WHERE block.course_block_id=?");
				$stmt4->bind_param("i", $course_block_id);

				$stmt4->execute();
				$stmt4->store_result();

				$stmt4->bind_result($course_id, $course_name, $teacher_id, $credits, $ects , $weight);
				while ($stmt4->fetch()) {

					$stmt5 = $conn->prepare("SELECT first_name, last_name FROM users WHERE id=?");
					$stmt5->bind_param( "i", $teacher_id );

					$stmt5->execute();

					$stmt5->store_result();

					$stmt5->bind_result($first_name, $last_name);

				//notes for the queries- oysiastika to 3o mono einai ayto poy exo xrisimopoihsei
				//SELECT DISTINCT( 'course_id') FROM my_course WHERE user_id=?
				//SELECT grades.grade, users.name FROM grades ... WHERE grades.course_id=? AND grades.user_id=? ORDER BY grades.id DESC LIMIT 0,1 //innner
				//SELECT course.id AS course_id, choose_course.id AS choose_course_id, choose_course.name AS choose_course_name, course.course_name, grades.grade, CONCAT(users.last_name, ' ', users.first_name) AS teacher_name FROM my_course INNER JOIN course ON my_course.course_id=course.id LEFT JOIN grades ON my_course.id=grades.register_course_id AND my_course.user_id=grades.user_id AND my_course.course_id=grades.course_id LEFT JOIN users ON grades.teacher_id=users.id INNER JOIN choose_course ON my_course.choose_course_id=choose_course.id;

				while ($stmt5->fetch()) {
					$json["Εξάμηνο ".$semester_number][$i][0] = $course_name;
					$json["Εξάμηνο ".$semester_number][$i][1] = $course_block_type;
					$json["Εξάμηνο ".$semester_number][$i][2] = $course_id;
					$json["Εξάμηνο ".$semester_number][$i][3] = $credits;
					$json["Εξάμηνο ".$semester_number][$i][4] = $ects;
					$json["Εξάμηνο ".$semester_number][$i][5] = $first_name." ".$last_name;//na pareis kai onoma apo kathigiti
					$json["Εξάμηνο ".$semester_number][$i][6] = $weight;
					$i++;
				}

					$stmt5->free_result();
					$stmt5->close();
				}
				//echo $i;
				$stmt4->free_result();
				$stmt4->close();
			}
			$stmt3->free_result();
			$stmt3->close();
	}
	$stmt2->free_result();
	$stmt2->close();
}
$stmt->free_result();
$stmt->close();

$json['Grades'] = array();

$stmtg = $conn->prepare("SELECT course.id AS course_id, choose_course.id AS choose_course_id, choose_course.name AS choose_course_name, course.course_name, grades.grade, CONCAT(users.last_name, ' ', users.first_name) AS teacher_name FROM my_course INNER JOIN course ON my_course.course_id=course.id LEFT JOIN grades ON my_course.id=grades.course_id AND my_course.user_id=grades.user_id AND my_course.course_id=grades.course_id LEFT JOIN users ON grades.teacher_id=users.id INNER JOIN choose_course ON my_course.choose_course_id=choose_course.id WHERE my_course.user_id=?");
$stmtg->bind_param( "i", $id );
$stmtg->execute();
$stmtg->store_result();
$stmtg->bind_result($course_id, $choose_course_id, $choose_course_name, $course_name, $grade, $teacher_name);
$j=0;
while ($stmtg->fetch()) {
	$json['Grades'][$j][0] = $course_id;
	$json['Grades'][$j][1] = $choose_course_id;
	$json['Grades'][$j][2] = $choose_course_name;
	$json['Grades'][$j][3] = $course_name;
	$json['Grades'][$j][4] = $grade;
	$json['Grades'][$j][5] = $teacher_name;
	$j++;
}

$stmtg->free_result();
$stmtg->close();

echo json_encode($json);

?>
