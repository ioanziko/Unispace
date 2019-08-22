<?php
require_once('./auth.php');
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.
?>
<!DOCTYPE html>
<html>
<head>
<title>Unispace</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<link rel="stylesheet" type="text/css" href="./css/template.css">
<link rel="stylesheet" href="./css/w3.css">
<link rel="stylesheet" href="./css/bootstrap.min.css">
<link rel="stylesheet" href="./css/w3-theme-black.css">
<link rel="stylesheet" href="./css/font-awesome.min.css">
<script src="./js/jquery-3.3.1.min.js"></script>
<script type = "text/javascript" src = "./js/template_min.js" ></script>
<script type = "text/javascript" src = "./js/bootstrap.min.js" ></script>
</head>

<body id="myPage">

<?php
if ($level==1) {
	
	?>
<div class="w3-top">
 <div class="w3-bar w3-theme-d2 w3-left-align">
  <div class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-hover-white w3-theme-d2" id="menu_close" onclick="openNav()"><i class="fa fa-bars"></i></div>
  <div class="w3-bar-item w3-button w3-teal menu_close" style="padding-left:2px; padding-right:6px;  padding-top:0px; padding-bottom:0px;" id="profile" onclick="post_data(this.id, '')"><image src="./UniSpace.png" style="max-height:38px;"></image></div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="grades" onclick="post_data(this.id, '')">Βαθμολογίες</div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="my_course" onclick="alert('Δεν υπάρχει ανοιχτή δήλωση μαθημάτων');">Δήλωση Μαθημάτων</div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="my_sector" onclick="post_data(this.id, '')">Δήλωση Κατεύθυνσης</div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="professors_list" onclick="post_data(this.id, '')">Καθηγητές</div>
   
  <div class="w3-bar-item w3-button w3-hide-small w3-right w3-hover-teal"  onclick="location.href = './logout.php';"><span class="fa fa-sign-out"></span>Αποσύνδεση</div>
 </div>

  <!-- Navbar on small screens -->
  <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium">
    <div class="w3-bar-item w3-button menu_close" id="grades" onclick="post_data(this.id, '')">Βαθμολογίες</div>

	<div class="w3-bar-item w3-button menu_close" id="my_course" onclick="alert('Δεν υπάρχει ανοιχτή δήλωση μαθημάτων');">Δήλωση Μαθημάτων</div>
	<div class="w3-bar-item w3-button menu_close" id="my_sector" onclick="post_data(this.id, '')">Δήλωση Κατεύθυνσης</div>
	<div class="w3-bar-item w3-button menu_close" id="professors_list" onclick="post_data(this.id, '')">Καθηγητές</div>
    <div class="w3-bar-item w3-button menu_close"  onclick="location.href = './logout.php';">Αποσύνδεση</div>
  </div>
  

</div>
  <?php
} else if ($level==3) {
  ?>
  
  
  <div class="w3-top">
 <div class="w3-bar w3-theme-d2 w3-left-align">
  <div class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-hover-white w3-theme-d2" id="menu_close" onclick="openNav()"><i class="fa fa-bars"></i></div>
  <div class="w3-bar-item w3-button w3-teal menu_close" style="padding-left:2px; padding-right:6px;  padding-top:0px; padding-bottom:0px;" id="profile" onclick="post_data(this.id, '')"><image src="./UniSpace.png" style="max-height:38px;"></image></div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="curriculum" onclick="post_data(this.id, '')">Πρόγραμμα Σπουδών</div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="new_choose_course" onclick="post_data(this.id, '')">Δήλωση Μαθημάτων</div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="new_choose_sector" onclick="post_data(this.id, '')">Δήλωση Κατεύθυνσης</div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="register" onclick="post_data(this.id, '')">Εγγραφή Χρηστών</div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="enrollment" onclick="post_data(this.id, '')">Τρόποι Εισαγωγής</div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="professors_list" onclick="post_data(this.id, '')">Καθηγητές</div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="users" onclick="post_data(this.id, '')">Φοιτητές</div>
   
  <div class="w3-bar-item w3-button w3-hide-small w3-right w3-hover-teal"  onclick="location.href = './logout.php';"><span class="fa fa-sign-out"></span>Αποσύνδεση</div>
 </div>

  <!-- Navbar on small screens -->
  <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium">
    <div class="w3-bar-item w3-button menu_close" id="curriculum" onclick="post_data(this.id, '')">Πρόγραμμα Σπουδών</div>
	  <div class="w3-bar-item w3-button menu_close" id="new_choose_course" onclick="post_data(this.id, '')">Δήλωση Μαθημάτων</div>
  <div class="w3-bar-item w3-button menu_close" id="new_choose_sector" onclick="post_data(this.id, '')">Δήλωση Κατεύθυνσης</div>

	<div class="w3-bar-item w3-button menu_close" id="register" onclick="post_data(this.id, '')">Εγγραφή Χρηστών</div>
	<div class="w3-bar-item w3-button menu_close" id="enrollment" onclick="post_data(this.id, '')">Τρόποι Εισαγωγής</div>
	<div class="w3-bar-item w3-button menu_close" id="professors_list" onclick="post_data(this.id, '')">Καθηγητές</div>
		<div class="w3-bar-item w3-button menu_close" id="users" onclick="post_data(this.id, '')">Φοιτητές</div>

    <div class="w3-bar-item w3-button menu_close"  onclick="location.href = './logout.php';">Αποσύνδεση</div>
  </div>
  

</div>
  
  
  <?php
} else if ($level==2) {
  ?>
  
  
  <div class="w3-top">
 <div class="w3-bar w3-theme-d2 w3-left-align">
  <div class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-hover-white w3-theme-d2" id="menu_close" onclick="openNav()"><i class="fa fa-bars"></i></div>
  <div class="w3-bar-item w3-button w3-teal menu_close" style="padding-left:2px; padding-right:6px;  padding-top:0px; padding-bottom:0px;" id="profile" onclick="post_data(this.id, '')"><image src="./UniSpace.png" style="max-height:38px;"></image></div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="course" onclick="post_data(this.id, '')">Μαθήματα</div>
  <div class="w3-bar-item w3-button w3-hide-small w3-hover-white " id="professors_list" onclick="post_data(this.id, '')">Καθηγητές</div>
   
  <div class="w3-bar-item w3-button w3-hide-small w3-right w3-hover-teal"  onclick="location.href = './logout.php';"><span class="fa fa-sign-out"></span>Αποσύνδεση</div>
 </div>

  <!-- Navbar on small screens -->
  <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium">
    <div class="w3-bar-item w3-button menu_close" id="course" onclick="post_data(this.id, '')">Μαθήματα</div>
	<div class="w3-bar-item w3-button menu_close" id="professors_list" onclick="post_data(this.id, '')">Καθηγητές</div>
    <div class="w3-bar-item w3-button menu_close"  onclick="location.href = './logout.php';">Αποσύνδεση</div>
  </div>
  

</div>
  
  
  <?php
}
  ?>
 

<div id="loading">
<div id="results" style="padding-top: 56px;">


</div>
</div>

<!-- Footer -->
<footer class="w3-container w3-padding-32 w3-theme-d1 w3-center" style="position:absolute; width:100%; margin-top: 20px;">
  
   <button type="button" class=" w3-button w3-large w3-teal " onclick="window.open('UniSpace_manual.pdf','_blank');"><span class="fa fa-bug"></span>Οδηγίες Χρήσης

                  </button>



  <p>© 2019 Powered by Democritus Software Engineering Team</p>


</footer>



		<div class="alert success">
  <span class="closebtn" onclick="close_btn('1')">&times;</span>  
  <strong>Επιτυχής </strong> αλλαγή!
</div>

		<div class="alert error">
  <span class="closebtn" onclick="close_btn('2')">&times;</span>  
  <strong>Σφάλμα. </strong> Προσπαθήστε ξανά!
</div>

		<div class="alert warning">
  <span class="closebtn" onclick="close_btn('3')">&times;</span>  
  <strong>Προειδοποίηση. </strong> Μη εξουσιοδοτημένο μέλος!
</div>







</body>



</html>