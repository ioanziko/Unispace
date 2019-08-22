<?php
require_once('../auth.php');
// Πάντα το header θα είναι (json):
//require_once('auth.php');
header("Content-type: application/json; charset=utf-8");

// Ή θα είναι (text):
// header("Content-Type: text/plain");""

// Στην περίπτωση που θέλουμε να μεταφέρουμε δεδομένα (όπως και τώρα) χρησιμοποιούμε το json
// Μέχρι να είναι γίνει το login, η σύνδεση με την βάση θα γίνεται:
// Μέσα στην php δεν θα έχετε ΚΑΘΟΛΟΥ html
// Φτιάχνω το query και βάζω τις παραμέτρους του. Είναι καλό το prepare() να είναι σε διπλά εισαγωγικά prepare("")
		$stmt = $conn->prepare("SELECT users.email, users.aem, users.first_name, users.last_name, users.father_name, users.phone, users.phone2, users.address, users.post_code, users.date_of_registration, users.semester_enter, users.current_semester, enrollment.name AS enrollment, users.first_degree, users.status, users.gender, users.birth_date , users.country, department.depart_name AS depart_id, curriculum.curriculum_name AS`curriculum_id` FROM users LEFT JOIN enrollment ON users.enrollment=enrollment.id LEFT JOIN curriculum ON users.curriculum_id=curriculum.id LEFT JOIN department ON users.depart_id=department.id WHERE users.id=?");

		$stmt->bind_param( "i", $id);
		$stmt->execute();
		// Μέσα στην μεταβλητή $json θα "χτίσω" το json
		$json = array();

		// Βάζω το πρώτο στοιχείο (που είναι ο τίτλος της σελίδας) μέσα στην μεταβλητή page_title
		$json["page_title"] = "Profile";


		$result = $stmt->get_result();


		$num_of_rows = mysqli_num_rows($result);

		if ($num_of_rows == 1) {

			// Αυτό γίνεται μόνο με μια σειρά αποτελέσματα και προσθέτει στον πίνακα $json τα αποτελέσματα
			// που πήρε απο τη βάση. Βάζει τα στοιχεία μέσα στις μεταβλητές, οι μεταβλητές έχουν τα ονόματα που έχουν στην βάση
			$json += $result->fetch_assoc();

		}


		// Αν θέλαμε να δούμε τη δομή και τι περιέχει ο πίνακας $json θα χρησιμοποιούσαμε: print_r($json);
		// Θα μας έδινε αυτά τα αποτελέσματα:


		// Με το json_encode μετατρέπει τον πίνακα σε json
		echo json_encode($json);


	  	$stmt->free_result();


		$stmt->close();

?>
