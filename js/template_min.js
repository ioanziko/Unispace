var current_tab = ""; var load_content = false; var auto_logout = Math.floor(Date.now() / 1000); window.addEventListener('popstate', function(e) {
  
  
  
  var character = e.state;    post_data_without_push(character.slice(0, character.indexOf(",")), character.slice(character.indexOf(",")+1)); 	current_tab = character.slice(0, character.indexOf(","));     });         $( document ).ready(function() { 
    
    if(window.location.hash) {  
      
      
      var hash = window.location.hash.substring(1);  	 	  	  	  history.replaceState(hash+',', null, hash+'.html'); 			   			  post_data_without_push(hash, '');  } else { 		  	  	  history.replaceState('profile,', null, './');  post_data_without_push('profile', ''); 	current_tab = 'profile,';  }   setInterval(function(){  if ((Math.floor(Date.now() / 1000) - auto_logout) >= 900) { window.location.replace("./logout.php"); 	 }  }, 1000);  
    
		$( ".menu_close" ).click(function() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }  
		});
	
      setInterval(function(){ 
        if (document.getElementsByClassName("error")[0].style.display == "inline-block") {  
      
        } 
        else if (document.getElementsByClassName("success")[0].style.display == "inline-block") {
          
          if (current_tab == "enrollment") {
			current_tab = "";
			history.replaceState('enrollment,', null, 'enrollment.html');
            post_data_without_push('enrollment', '');  
      
          }
		  else if (current_tab == "curriculum") {
			  			current_tab = "";
						history.replaceState('profile,', null, './');  
						post_data_without_push('profile', '');			  
		  }
		  else if (current_tab == "register") {
						$( "#register_input_clear" ).trigger( "click" );
		  }
		  else if (current_tab == "new_choose_sector") {
			  			current_tab = "";
						history.replaceState('profile,', null, './');  
						post_data_without_push('profile', '');			  
		  }
		  else if (current_tab == "my_sector") {
			  			current_tab = "";
						history.replaceState('profile,', null, './');  
						post_data_without_push('profile', '');			  
		  }
		  else if (current_tab == "my_course") {
			  			current_tab = "";
						history.replaceState('profile,', null, './');  
						post_data_without_push('profile', '');			  
		  }

		  

          }
           else if (document.getElementsByClassName("warning")[0].style.display == "inline-block") { 
      
           }
           }, 2900); 
    
    });   function post_data(url, param) { if (current_tab != url && load_content==false) { 	load_content = true; document.getElementById("loading").classList.add("loading"); document.getElementById("results").classList.add("loading_res");   	$.ajax({   type: "POST",   url: "./api/"+url+".php",   data: param,   success: function(msg){ auto_logout = Math.floor(Date.now() / 1000);   history.pushState(url+","+param, null, url+'.html'); 		  current_tab = url; 		  $(".active").removeClass("active"); 		  $("#"+url).addClass('active'); 			load_content = false; 			 			msg_response(url, msg);  	   	    	$("#loading").removeClass("loading"); 			$("#results").removeClass("loading_res"); 	     },   error: function(XMLHttpRequest, textStatus, errorThrown) { 		  		  document.getElementsByClassName("error")[0].style.display = "inline-block"; 				  auto_close_btn('2'); 				  $("#loading").removeClass("loading"); 				 $("#results").removeClass("loading_res"); 				 load_content = false;   } });    }    	 }  function post_data_without_push(url, param) { if (current_tab != url && load_content==false) { 	load_content = true; document.getElementById("loading").classList.add("loading"); document.getElementById("results").classList.add("loading_res");   	$.ajax({   type: "POST",   url: "./api/"+url+".php",   data: param,   success: function(msg){ 	  auto_logout = Math.floor(Date.now() / 1000); 		  current_tab = url; 		  $(".active").removeClass("active"); 		  $("#"+url).addClass('active'); 		  load_content = false; 		   		   			msg_response(url, msg);   	     		$("#loading").removeClass("loading"); 		$("#results").removeClass("loading_res");  	     },   error: function(XMLHttpRequest, textStatus, errorThrown) { 		  		  document.getElementsByClassName("error")[0].style.display = "inline-block"; 				  auto_close_btn('2'); 				  $("#loading").removeClass("loading"); 				  $("#results").removeClass("loading_res"); 				  load_content = false;    }  });     } 	 	 }  function exec_c(url, param) {  document.getElementById("loading").classList.add("loading"); document.getElementById("results").classList.add("loading_res");  	$.ajax({   type: "POST",   url: "./api/"+url+".php",   data: param,   success: function(msg){ auto_logout = Math.floor(Date.now() / 1000); 	  if (msg == 1) { 		   		  			document.getElementsByClassName("success")[0].style.display = "inline-block"; 		  				  auto_close_btn('1'); 	  } 	  else if (msg == 3) { 		   		  		  	document.getElementsByClassName("warning")[0].style.display = "inline-block"; 		  				  auto_close_btn('3'); 	  } 	  else { 		   		  		  document.getElementsByClassName("error")[0].style.display = "inline-block"; 						  auto_close_btn('2'); 	  }    		$("#loading").removeClass("loading"); 		$("#results").removeClass("loading_res");  	     },   error: function(XMLHttpRequest, textStatus, errorThrown) { 		  		  document.getElementsByClassName("error")[0].style.display = "inline-block"; 				  auto_close_btn('2'); 				  $("#loading").removeClass("loading"); 				  $("#results").removeClass("loading_res");    } });   }  function close_btn(disable) { 		if (disable == 1) { 		$( ".success" ).fadeOut("slow", function () {     $(this).css({display:"none"}); }); 	} 	else if  (disable == 2) { 		$( ".error" ).fadeOut("slow", function () {     $(this).css({display:"none"}); 	}); 	} 	else if  (disable == 3) { 		$( ".warning" ).fadeOut("slow", function () {     $(this).css({display:"none"}); 	});  	} 	 	 }  function auto_close_btn(disable) { 	if (disable == 1) { 		setTimeout(function(){ 		$( ".success" ).fadeOut("slow", function () {     $(this).css({display:"none"}); }); }, 3050); 	} 	else if  (disable == 2) { 				setTimeout(function(){ 		$( ".error" ).fadeOut("slow", function () {     $(this).css({display:"none"}); 	}); 	}, 3050); 	} 	else if  (disable == 3) { 				setTimeout(function(){ 		$( ".warning" ).fadeOut("slow", function () {     $(this).css({display:"none"}); 	}); 	}, 3050); 	}   }

// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}




function msg_response(url, msg) {
	
		if (url == "profile")
			profile_json(msg);
		else if (url == "grades")
			grades_init_tables(msg);
		else if (url == "enrollment")
			enrollment_json(msg);
		else if (url == "curriculum")
			curriculum_json(msg);
		else if (url == "professors_list")
			professorListBuilder(msg);
		else if (url == "professor")
			professor_json(msg);
		else if (url == "register")
			register_init(msg);
		else if (url == "new_choose_sector")
			choose_sector_json(msg);
		else if (url == "new_choose_course")
			choose_course_json(msg);
		else if (url == "my_sector")
			sector_json(msg);
		else if (url == "my_course")
			statement_init(msg);
		else if (url == "course")
			courses_json(msg);
		else if (url == "course_info")
			temp_page_init(msg);
		else if (url == "users")
			users_json(msg);

		
		
}



	function profile_convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

	function profile_json(data) {
		document.title = 'Προφίλ';

		var res = '<div class="profile_body"> <div class="profile_container" id="profile_container">   <div class="profile_heading">Στοιχεία Χρήστη</div>    <div class="profile_personal">     <div class="profile_subheading">Προσωπικά Στοιχεία</div>     <div class="profile_row">         <span class="profile_field_title profile_cell">Ονοματεπώνυμο</span>         <span class="profile_field_content profile_cell" id="profile_Name"></span>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Όνομα Πατρός</div>         <div class="profile_field_content profile_cell" id="profile_fName"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell" id="profile_large_text">Ημερομηνία Γέννησης</div>         <div class="profile_field_content profile_cell" id="profile_bd"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell" id="profile_large_text">Φύλο</div>         <div class="profile_field_content profile_cell" id="profile_gender"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Τηλέφωνο</div>         <div class="profile_field_content profile_cell" id="profile_phone"></div>     </div>     <div class="profile_row" id="profile_optional_phone">         <div class="profile_field_title profile_cell">Τηλέφωνο 2</div>         <div class="profile_field_content profile_cell" id="profile_phone2"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">E-mail</div>         <div class="profile_field_content profile_cell" id="profile_email"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Διεύθυνση κατοικίας</div>         <div class="profile_field_content profile_cell" id="profile_address"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Τ.Κ.-Χώρα</div>         <div class="profile_field_content profile_cell" id="profile_tk"></div>     </div>   </div>    <div class="profile_academic">     <div class="profile_subheading">Ακαδημαϊκά Στοιχεία</div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Αριθμός Μητρώου</div>         <div class="profile_field_content profile_cell" id="profile_AEM"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Τμήμα</div>         <div class="profile_field_content profile_cell" id="profile_depart_id"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Ημερομηνία Εγγραφής</div>         <div class="profile_field_content profile_cell" id="profile_reg_date"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Πρόγραμμα Σπουδών</div>         <div class="profile_field_content profile_cell" id="profile_curric_id"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Τρόπος Εγγραφής</div>         <div class="profile_field_content profile_cell" id="profile_enrollment"></div>     </div>     <div class="profile_row" id="profile_optional_sem_entered">         <div class="profile_field_title profile_cell">Εξάμηνο Εγγραφής</div>         <div class="profile_field_content profile_cell" id="profile_sem_entered"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Τρέχων Εξάμηνο</div>         <div class="profile_field_content profile_cell" id="profile_curr_sem"></div>     </div>     <div class="profile_row">         <div class="profile_field_title profile_cell">Πρώτο πτυχίο</div>         <div class="profile_field_content profile_cell" id="profile_first_degree"></div>     </div>    </div>  </div> </div>';
		document.getElementById('results').innerHTML = res;
		// var access_level = ['Φοιτητής', 'Καθηγητής', 'Γραμματεία'];
    var gender = ['Άνδρας', 'Γυναίκα'];


    document.getElementById('profile_Name').textContent = data.last_name+' '+data.first_name;
    document.getElementById('profile_fName').textContent = data.father_name;
    document.getElementById('profile_bd').textContent = profile_convertDate(data.birth_date);
    document.getElementById('profile_gender').textContent = gender[data.gender];
    document.getElementById('profile_phone').textContent = data.phone;
    (data.phone2 != 0) ? document.getElementById('profile_phone2').textContent = data.phone2 : document.getElementById('profile_optional_phone').style.display = 'none';
    document.getElementById('profile_email').textContent = data.email;
    document.getElementById('profile_address').textContent = data.address;
    document.getElementById('profile_tk').textContent = data.post_code+', '+data.country;

    document.getElementById('profile_AEM').textContent = data.aem;
    document.getElementById('profile_depart_id').textContent = data.depart_id;
    document.getElementById('profile_reg_date').textContent = profile_convertDate(data.date_of_registration);
    document.getElementById('profile_curric_id').textContent = data.curriculum_id;
    document.getElementById('profile_enrollment').textContent = data.enrollment;
    (data.enrollment === 'katataktiries') ? document.getElementById('profile_sem_entered').textContent = data.semester_enter : document.getElementById('profile_optional_sem_entered').style.display = 'none';
    document.getElementById('profile_curr_sem').textContent = data.current_semester;
    (data.first_degree)?document.getElementById('profile_first_degree').textContent = 'Ναι':document.getElementById('profile_first_degree').textContent = 'Όχι';

	}





	function grades_init_tables(data) {
		document.title = 'Βαθμολογία';
		var res = '<div class="grades_container" id="grades_container">  <div class="grades_switch_box">    <span class="grades_switch_text" id="grades_switch_text_default">Βαθμολογία ανά εξάμηνο</span>    <label class="grades_switch">      <input type="checkbox">      <span class="grades_slider" onclick="grades_switch_tables()"></span>    </label>    <span class="grades_switch_text" id="grades_switch_text_analytical">Αναλυτική βαθμολογία</span>  </div>  <div class="grades_default" id="grades_default"></div>  <div class="grades_analytical" id="grades_analytical"></div></div>';
		
				document.getElementById('results').innerHTML = res;

    // Initialize default grades table
     var sem = 0;
    var gradesPassedSum = 0;
    var gradesTotalAvg = 0;
    var gradesTotalDm = 0;
    var gradesTotalECTS = 0;
    for (j in data) {
      if (j === 'Grades' || data[j].length === 0) break;
      var gradesSumSem=0;
      var gradesWeightSem=0;
      var gradesDmSem=0;
      var gradesEctsSem=0;
      var gradesPassedSem=0;

      var semTableTitle = '<div class="grades_title">\
        Εξάμηνο <span id="grades_sem_title_temp"></span>\
      </div>';
      var semTableHead = '\
      <tr>\
        <th class="grades_head">Μάθημα</th>\
        <th class="grades_head grades_hide grades_type_grades_dm_ects">Τύπος</th>\
        <th class="grades_head grades_type_grades_dm_ects">Βαθμός</th>\
        <th class="grades_head grades_exams_date">Εξεταστική</th>\
        <th class="grades_head grades_hide grades_type_grades_dm_ects">ΔΜ</th>\
        <th class="grades_head grades_hide grades_type_grades_dm_ects">ECTS</th>\
        <th class="grades_head grades_hide grades_professors">Ισχύων Διδάσκων</th>\
        <th class="grades_head grades_hide grades_professors">Διδάσκων εξέτασης</th>\
      </tr>';
      var semTableFoot = '<div class="grades_foot">\
        <div class="grades_foot_left" id="grades_sem_passed_temp">Περασμένα μαθήματα: </div>\
        <div class=grades_foot_right>\
          <span>ΜΟ: </span>\
          <span id="grades_sem_average_temp" class="grades_redFont"></span>\
          <span class="grades_hide">ΔΜ: </span>\
          <span id="grades_sem_dm_sum_temp" class="grades_redFont grades_hide"></span>\
          <span class="grades_hide">ECTS: </span>\
          <span id="grades_sem_ECTS_sum_temp" class="grades_redFont grades_hide"></span>\
        </div>\
      </div>';

      div_sem = document.getElementById("grades_default");
      div_sem.innerHTML += semTableTitle;
      div_sem.innerHTML += '<table class="grades_table" id="grades_sem_temp"></table>';
      div_sem.innerHTML += semTableFoot;

      document.getElementById("grades_sem_temp").id = "grades_sem"+sem;
      document.getElementById("grades_sem"+sem).innerHTML += semTableHead;
      document.getElementById("grades_sem_title_temp").id = "grades_sem_title"+sem;
      document.getElementById("grades_sem_title"+sem).textContent = (sem+1);

      for (i=0; i<data[j].length; i++){
        var semTableRow='<tr>\
          <td class="grades_cell" id="grades_sem_name_temp"></td>\
          <td class="grades_cell grades_center grades_hide grades_type_grades_dm_ects" id="grades_sem_type_temp"></td>\
          <td class="grades_cell grades_center grades_type_grades_dm_ects" id="grades_sem_grade_temp"></td>\
          <td class="grades_cell grades_center grades_exams_date" id="grades_sem_exams_date_temp"></td>\
          <td class="grades_cell grades_center grades_hide grades_type_grades_dm_ects" id="grades_sem_dm_temp"></td>\
          <td class="grades_cell grades_center grades_hide grades_type_grades_dm_ects" id="grades_sem_ECTS_temp"></td>\
          <td class="grades_cell grades_center grades_hide grades_professors" id="grades_sem_professor_temp"></td>\
          <td class="grades_cell grades_center grades_hide grades_professors" id="grades_sem_exam_professor_temp"></td>\
        </tr>';

        document.getElementById("grades_sem"+sem).innerHTML += semTableRow;

        document.getElementById("grades_sem_name_temp").id="grades_sem_name"+i+sem;
        document.getElementById("grades_sem_type_temp").id="grades_sem_type"+i+sem;
        document.getElementById("grades_sem_grade_temp").id="grades_sem_grade"+i+sem;
        document.getElementById("grades_sem_exams_date_temp").id="grades_sem_exams_date"+i+sem;
        document.getElementById("grades_sem_dm_temp").id="grades_sem_dm"+i+sem;
        document.getElementById("grades_sem_ECTS_temp").id="grades_sem_ECTS"+i+sem;
        document.getElementById("grades_sem_professor_temp").id="grades_sem_professor"+i+sem;
        document.getElementById("grades_sem_exam_professor_temp").id="grades_sem_exam_professor"+i+sem;

        document.getElementById("grades_sem_name"+i+sem).textContent=data[j][i][0];
        document.getElementById("grades_sem_type"+i+sem).textContent=grades_subject_type_map(data[j][i][1]);
        // Find the subarray that contains the latest exam's info
        var max_exam_id = 0;
        var sub_array = 0;
        var global_max_exam_id = 0;
        for (m in data['Grades']) {
          if (max_exam_id < data['Grades'][m][1] && data['Grades'][m][0] === data[j][i][2]) {
            max_exam_id = data['Grades'][m][1];
            sub_array = m;
          }
          if (global_max_exam_id < data['Grades'][m][1]) global_max_exam_id = data['Grades'][m][1];
        }

        if (data['Grades'][sub_array][4] === null){
          document.getElementById("grades_sem_grade"+i+sem).textContent = '-';
          document.getElementById("grades_sem_exams_date"+i+sem).textContent = '-';
          document.getElementById("grades_sem_exam_professor"+i+sem).textContent = '-';
        } else {
          document.getElementById("grades_sem_grade"+i+sem).textContent = data['Grades'][sub_array][4];
          document.getElementById("grades_sem_exams_date"+i+sem).textContent = data['Grades'][sub_array][2];
          document.getElementById("grades_sem_exam_professor"+i+sem).textContent = data['Grades'][sub_array][5];
          if (data['Grades'][sub_array][4] >= 5){
            gradesSumSem+=(data['Grades'][sub_array][4]*data[j][i][6]);
            gradesWeightSem+=data[j][i][6];
            gradesPassedSem+=1;
            gradesDmSem+=data[j][i][3];
            gradesEctsSem+=data[j][i][4];
          }
        }
        document.getElementById("grades_sem_dm"+i+sem).textContent=data[j][i][3];
        document.getElementById("grades_sem_ECTS"+i+sem).textContent=data[j][i][4];
        document.getElementById("grades_sem_professor"+i+sem).textContent=data[j][i][5];
      }
      document.getElementById("grades_sem_passed_temp").id="grades_sem_passed"+sem;
      document.getElementById("grades_sem_average_temp").id="grades_sem_average"+sem;
      document.getElementById("grades_sem_dm_sum_temp").id="grades_sem_dm_sum"+sem;
      document.getElementById("grades_sem_ECTS_sum_temp").id="grades_sem_ECTS_sum"+sem;

      (gradesPassedSem === 0) ? gradesAv = 0 : gradesAv=gradesSumSem/gradesWeightSem;
      document.getElementById("grades_sem_average"+sem).textContent = (gradesAv.toFixed(2));
      document.getElementById("grades_sem_ECTS_sum"+sem).textContent = gradesEctsSem;
      document.getElementById("grades_sem_dm_sum"+sem).textContent = gradesDmSem;
      document.getElementById("grades_sem_passed"+sem).textContent += gradesPassedSem;

      gradesTotalAvg += Number(gradesAv.toFixed(2));
      gradesTotalDm += gradesDmSem;
      gradesTotalECTS += gradesEctsSem;
      gradesPassedSum+=gradesPassedSem;
      ++sem;
    }
    var gradesTotalRow = '<div class="grades_sum">\
      <div class="grades_sum_left" id="grades_passed_sum">Συνολικά Περασμένα Μαθήματα: </div>\
      <div class=grades_sum_right>\
        <span>ΜΟ: </span>\
        <span id="grades_tot_avg" class="grades_redFont_shadow"></span>\
        <span class="grades_hide">ΔΜ: </span>\
        <span id="grades_tot_dm" class="grades_redFont_shadow"></span>\
        <span class="grades_hide">ECTS: </span>\
        <span id="grades_tot_ECTS" class="grades_redFont_shadow"></span>\
      </div>\
     </div>';

    document.getElementById("grades_default").innerHTML += gradesTotalRow;
    document.getElementById("grades_passed_sum").textContent += gradesPassedSum;
    document.getElementById("grades_tot_avg").textContent = (gradesTotalAvg/sem).toFixed(2);
    document.getElementById("grades_tot_dm").textContent = gradesTotalDm;
    document.getElementById("grades_tot_ECTS").textContent = gradesTotalECTS;

    grades_switch_tables();

    //Initialize analytical grades table
    for (j=1; j<=global_max_exam_id; j++) {
      var gradesPassedExam = 0;
      var gradesSumExam=0;
      var gradesWeightExam=0;

      var gradesSumTempExam=0;
      var gradesWeightTempExam=0;
      var gradesDmTempExam=0;
      var gradesEctsTempExam=0;
      var exTableTitle = '<div class="grades_title">\
        Εξεταστική <span id="grades_ex_title_temp"></span>\
      </div>';
      var exTableHead = '<tr>\
        <th class="grades_head">Μάθημα</th>\
        <th class="grades_head grades_ex_type_grades_dm_ects">Τύπος</th>\
        <th class="grades_head grades_ex_type_grades_dm_ects">Βαθμός</th>\
        <th class="grades_head grades_hide grades_professors">Διδάσκων εξέτασης</th>\
      </tr>';
      var exTableFoot = '<div class="grades_foot">\
        <div class="grades_foot_left" id="grades_ex_passed_temp">Περασμένα μαθήματα: </div>\
        <div class=grades_foot_right>\
          <span>ΜΟ: </span>\
          <span id="grades_ex_average_temp" class="grades_redFont"></span>\
        </div>\
      </div>';

      div_ex = document.getElementById("grades_analytical");
      div_ex.innerHTML += exTableTitle;
      div_ex.innerHTML += '<table class="grades_table" id="grades_ex_temp"></table>';
      div_ex.innerHTML += exTableFoot;

      document.getElementById("grades_ex_temp").id = "grades_ex"+j;
      document.getElementById("grades_ex"+j).innerHTML += exTableHead;
      document.getElementById("grades_ex_title_temp").id = "grades_ex_title"+j;

      for (i in data['Grades']){
        if (data['Grades'][i][1] === j) {
          document.getElementById("grades_ex_title"+j).textContent = data['Grades'][i][2];

          var exTableRow='<tr>\
            <td class="grades_cell" id="grades_ex_name_temp"></td>\
            <td class="grades_cell grades_center grades_ex_type_grades_dm_ects" id="grades_ex_type_temp"></td>\
            <td class="grades_cell grades_center grades_ex_type_grades_dm_ects" id="grades_ex_grade_temp" class="grades_redFont"></td>\
            <td class="grades_cell grades_center grades_hide grades_professors" id="grades_ex_exam_professor_temp"></td>\
          </tr>';
          document.getElementById("grades_ex"+j).innerHTML += exTableRow;

          document.getElementById("grades_ex_name_temp").id="grades_ex_name"+i+j;
          document.getElementById("grades_ex_type_temp").id="grades_ex_type"+i+j;
          document.getElementById("grades_ex_grade_temp").id="grades_ex_grade"+i+j;
          document.getElementById("grades_ex_exam_professor_temp").id="grades_ex_exam_professor"+i+j;

          document.getElementById("grades_ex_name"+i+j).textContent = data['Grades'][i][3];
          for (m in data){
            for (k=0; k<data[m].length; k++){
              if (data[m][k][2] === data['Grades'][i][0]){
                document.getElementById("grades_ex_type"+i+j).textContent = grades_subject_type_map(data[m][k][1]);
                gradesWeightTempExam = data[m][k][6];
                gradesSumTempExam = data['Grades'][i][4] * gradesWeightTempExam;
                break;
              }
            }
            break;
          }
          if (data['Grades'][i][4] === null){
            document.getElementById("grades_ex_grade"+i+j).textContent = '-';
            document.getElementById("grades_ex_exam_professor"+i+j).textContent = '-';
          } else {
            document.getElementById("grades_ex_grade"+i+j).textContent = data['Grades'][i][4];
            document.getElementById("grades_ex_exam_professor"+i+j).textContent = data['Grades'][i][5];
            if (data['Grades'][i][4] >= 5){
              gradesPassedExam+=1;
              gradesWeightExam += gradesWeightTempExam;
              gradesSumExam += gradesSumTempExam;
            }
          }
        }
      }
      document.getElementById("grades_ex_passed_temp").id="grades_ex_passed"+j;
      document.getElementById("grades_ex_average_temp").id="grades_ex_average"+j;


      (gradesPassedExam === 0) ? gradesAvExam = 0 : gradesAvExam=gradesSumExam/gradesWeightExam;
      document.getElementById("grades_ex_average"+j).textContent = gradesAvExam.toFixed(2);
      document.getElementById("grades_ex_passed"+j).textContent += gradesPassedExam;
    }
    var gradesTotalRow = '<div class="grades_sum">\
      <div class="grades_sum_left" id="grades_passed_sum2">Συνολικά Περασμένα Μαθήματα: </div>\
      <div class=grades_sum_right>\
        <span>ΜΟ: </span>\
        <span id="grades_tot_avg2" class="grades_redFont_shadow"></span>\
      </div>\
     </div>';

    document.getElementById("grades_analytical").innerHTML += gradesTotalRow;
    document.getElementById("grades_passed_sum2").textContent += gradesPassedSum;
    document.getElementById("grades_tot_avg2").textContent = (gradesTotalAvg/sem).toFixed(2);
  }

  function grades_subject_type_map(x) {
    if (x === 0){
      return 'Υ';
    } else if (x === 1) {
      return 'ΥΕ';
    } else {
      return 'Ε';
    }
  }

  function grades_switch_tables() {
    if (document.getElementById('grades_analytical').style.display == 'none') {
      document.getElementById('grades_default').style.display = 'none';
      // document.getElementById('grades_analytical').style.display = 'block';
      $("#grades_analytical").fadeIn("slow");
      document.getElementById('grades_switch_text_default').style.color = 'grey';
      document.getElementById('grades_switch_text_default').style.fontWeight = 'normal';
      document.getElementById('grades_switch_text_analytical').style.color = 'black';
      document.getElementById('grades_switch_text_analytical').style.fontWeight = 'bold';
    } else {
      document.getElementById('grades_analytical').style.display = 'none';
      // document.getElementById('grades_default').style.display = 'block';
      $("#grades_default").fadeIn("slow");
      document.getElementById('grades_switch_text_analytical').style.color = 'grey';
      document.getElementById('grades_switch_text_analytical').style.fontWeight = 'normal';
      document.getElementById('grades_switch_text_default').style.color = 'black';
      document.getElementById('grades_switch_text_default').style.fontWeight = 'bold';
    }
  }
  


  // ****  ENROLLMENT **** //



  function enrollment_json(data) {
		document.title = 'Τρόποι Εισαγωγής';

		var res = '<div class="container herocontent"> <h2 class="page-header">Τρόποι Εισαγωγής</h2><br> <div class="row "> <div class="input-group"> <input type="text" class="form-control" placeholder="Πληκτρολογήστε Τρόπο Εισαγωγής" aria-label="Τρόπος Εισαγωγής" aria-describedby="basic-addon2"id="myInput"> <div class="buttons"> <button type="button" class="btn w3-button"id="addBtn" onclick="enrollment_add()" value="click!"><i class="fa fa-plus"></i>Προσθήκη</button> </div> </div> </div><br> <div class="tbl-header"> <table class="table table-bordered" > <thead class="thead-dark"> <tr> <th >Όνομα</th> <th>Ενέργειες</th> </tr> </thead> <tbody id="tropoieis"> </tbody> </table> </div> </div> <style> .herocontent{ margin-top: 80px; } .jumbotron { padding: 2rem 1rem; margin-bottom: 2rem; background-color: #f6f9fc; border-radius: 0.3rem; } .myPage{background: #f5f7f8; } .page-header{ text-decoration: underline; -webkit-text-decoration-color: rgba(0, 255, 213, 0.76); /* Safari */ text-decoration-color: rgba(0, 255, 213, 0.76); text-align: center; } .form-control{ padding: 15px; } .buttons{ margin: 10px; } .btn{ background-color: rgba(8, 224, 188, 0.76); } table{ width:100%; table-layout: auto; align-items: center; } .tbl-header{ background-color: rgba(255,255,255,0.3); } </style>';
		document.getElementById('results').innerHTML = res;


    var output=document.getElementById('tropoieis');
  
         var jcontent = data;
        var outp='';
        for(var myObj in jcontent.name ){
               outp+='<tr>';
               outp+='<td>'+jcontent.name[myObj]+'</td><td><a onclick="enrollment_delete('+jcontent.ids[myObj]+')" class="delete delete_event" style="cursor:pointer;" title="Delete" data-toggle="tooltip">&#x1f5d1;</a></td>';
               outp+='</tr>';
          
  
        }
        output.innerHTML+=outp;
  
    
  
  
   
   }
    
  
  
   function enrollment_add() {
  var input = document.getElementById('myInput').value;
  var id = 0;
  exec_c('enrollment_task', 'name='+input+'&id='+id);
   }
  
   function enrollment_delete(data) {
  
      if (Number.isInteger(data)) {
  
          if (data > 0) {
              var input = "";
              var id = data;
              exec_c('enrollment_task', 'name='+input+'&id='+id);
          }
  
      }
      
  
   }
  
  






  // **** ENROLLMENT **** //
  
  
  
  // ****  CURRICULUM **** //
  
  
  
  
  function curriculum_json(data) {

    		document.title = 'Πρόγραμμα Σπουδών';

  var res = '<div id="curriculum_initial_form">			<fieldset>				<legend style="font-size:18px;">Δημιουργία προγράμματος σπουδών</legend><br>				<label class="curriculum_label" for="cname">Όνομα προγράμματος σπουδών:</label>				<input type="text" id="curriculum_name" class="curriculum_input" class="required"><br>				<label class="curriculum_label" for="csem">Αριθμός εξαμήνων:</label>				<input type="number" id="curriculum_semesters" class="curriculum_input" min="0" class="required"><br>				<label class="curriculum_label" for="cmaxLes">Μέγιστος αριθμός μαθημάτων ανά εξάμηνο (0: απεριόριστα):</label>				<input type="number" id="curriculum_maxLessons" class="curriculum_input" min="0" class="required"><br><br>				<button type="button" id="curriculum_createTable" class="curriculum_button" onclick ="curriculum_courses()">Επόμενο</button>				</fieldset>		</div>				<div id="curriculum_course_form" style="display:none;">		<div style="position: relative;">						<div class="curriculum_courses">												<span id="curriculum_courses">									<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px;">				<legend style="font-size:18px;">Δήλωση μαθημάτων</legend>				<label class="curriculum_label" for="lname">Όνομα μαθήματος</label>				<input class="curriculum_input" type="text" name="lname" id="curriculum_courses_name1" placeholder="Όν. μαθήμ." class="required"><br>				<label class="curriculum_label" for="lprof">Διδάσκων</label>				<select class="curriculum_input" name="llab" id="curriculum_courses_prof1"></select><br>				<label class="curriculum_label" for="lunits">Διδακτικές Μονάδες</label>				<input class="curriculum_input" type="number" name="lunits" id="curriculum_courses_units1" min="0" max="20" placeholder="Δ.M" class="required"><br>				<label class="curriculum_label" for="lects">ECTS</label>				<input class="curriculum_input" type="number" name="lects" id="curriculum_courses_ects1" min="0" max="20" placeholder="ECTS" class="required"><br>				<label class="curriculum_label" for="llab">Εργαστήριο</label>				<select class="curriculum_input" name="llab" id="curriculum_courses_lab1">					<option value="1">NAI</option>					<option value="0">OXI</option>				</select>				<br>				<label class="curriculum_label" for="lper">Περίοδος</label>				<select class="curriculum_input" name="lper" id="curriculum_courses_seas1">				<option value="1">EAP</option>				<option value="0">XEIM</option>				</select><br>				<label class="curriculum_label" for="lweight">Βάρος (0-100)</label>				<input class="curriculum_input" type="number" name="lweight"  id="curriculum_courses_weight1" step="0.01" min="0" max="100" maxlength="4" class="required"><br>				<label class="curriculum_label" style="vertical-align:top;" for="ldesc">Περιγραφή: </label>				<textarea class="curriculum_input" type="text" name="ldesc" style="resize:none;" id="curriculum_courses_desc1" placeholder="Περιγραφή" rows="5" cols="22" class="required"></textarea>			</fieldset>													</span>										<div class="curriculum_add_course"><div class="curriculum_add_course_text" onclick="curriculum_add_course()">&#x2b;</div></div>		</div>		</div>		<br><br>		<button type="button" id="endlesson" class="curriculum_button" onclick="curriculum_sector()">Επόμενο</button>		</div>				<div id="curriculum_sector_form" style="display:none;">						<div style="position: relative;">						<div class="curriculum_sector">												<span id="curriculum_sector">									<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px;">				<legend style="font-size:18px;">Δήλωση κατευθύνσεων</legend>				<label class="curriculum_label">Όνομα κατεύθυνσης: </label>								<input class="curriculum_input" type="text" name="dname" id="curriculum_sector_name1" placeholder="Όνομα κατεύθυνσης" value="Κορμός" class="required"><br>								<label class="curriculum_label">Έναρξης κατεύθυνσης: </label>								<input class="curriculum_input" type="number" name="dsemstart" id="curriculum_sector_start1" value="1" placeholder="Έναρξης κατεύθυνσης" style="width:200px" class="required"><br>												<label class="curriculum_label">Λήξης κατεύθυνσης: </label>								<input class="curriculum_input" type="number" name="dsemend" id="curriculum_sector_end1" style="width:200px" placeholder="Λήξης κατεύθυνσης" class="required">			</fieldset>													</span>										<div class="curriculum_add_sector"><div class="curriculum_add_sector_text" onclick="curriculum_add_sector()">&#x2b;</div></div>		</div>		</div>		<br><br>		<button type="button" class="curriculum_button" onclick="curriculum_semester()">Επόμενο</button>						</div>						<div id="curriculum_semester_form">				</div>										<div id="open_course" class="open_course">  <div class="open_course_content">    <span class="open_course_close" onclick="close_course()">&times;</span>	<table id="open_course_course" style="font-size:18px;max-height: 388px;overflow-y: auto;display: block;overflow-x: hidden;" cellpadding="16"></table>	</div></div>';
  
  
		
				document.getElementById('results').innerHTML = res;

  
var select = document.getElementById("curriculum_courses_prof1");

for (var i in data.ids) {
	select.options[select.options.length] = new Option(data.name[i], data.ids[i]);


}


}


function curriculum_courses() {

document.getElementById('curriculum_initial_form').style.display = "none";
document.getElementById('curriculum_course_form').style.display = "block";




}


function curriculum_sector() {

document.getElementById('curriculum_course_form').style.display = "none";
document.getElementById('curriculum_sector_form').style.display = "block";




}


function curriculum_add_course() {
var counter = 1;


while (document.getElementById('curriculum_courses_name'+counter)) {
counter = counter + 1;
}


var new_course = '<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px;">				<legend style="font-size:18px;">Δήλωση μαθημάτων</legend>				<label class="curriculum_label" for="lname">Όνομα μαθήματος</label>				<input class="curriculum_input" type="text" name="lname" id="curriculum_courses_name'+counter+'" placeholder="Όν. μαθήμ." class="required"><br>				<label class="curriculum_label" for="lprof">Διδάσκων</label>				<select class="curriculum_input" name="llab" id="curriculum_courses_prof'+counter+'"></select><br>				<label class="curriculum_label" for="lunits">Διδακτικές Μονάδες</label>				<input class="curriculum_input" type="number" name="lunits" id="curriculum_courses_units'+counter+'" min="0" max="20" placeholder="Δ.M" class="required"><br>				<label class="curriculum_label" for="lects">ECTS</label>				<input class="curriculum_input" type="number" name="lects" id="curriculum_courses_ects'+counter+'" min="0" max="20" placeholder="ECTS" class="required"><br>				<label class="curriculum_label" for="llab">Εργαστήριο</label>				<select class="curriculum_input" name="llab" id="curriculum_courses_lab'+counter+'">					<option value="1">NAI</option>					<option value="0">OXI</option>				</select>				<br>				<label class="curriculum_label" for="lper">Περίοδος</label>				<select class="curriculum_input" name="lper" id="curriculum_courses_seas'+counter+'">				<option value="1">EAP</option>				<option value="0">XEIM</option>				</select><br>				<label class="curriculum_label" for="lweight">Βάρος (0-100)</label>				<input class="curriculum_input" type="number" name="lweight"  id="curriculum_courses_weight'+counter+'" step="0.01" min="0" max="100" maxlength="4" class="required"><br>				<label class="curriculum_label" style="vertical-align:top;" for="ldesc">Περιγραφή: </label>				<textarea class="curriculum_input" type="text" name="ldesc" style="resize:none;" id="curriculum_courses_desc'+counter+'" placeholder="Περιγραφή" rows="5" cols="22" class="required"></textarea>			</fieldset>';

document.getElementById('curriculum_courses').insertAdjacentHTML( "beforeend", new_course );


var select = document.getElementById('curriculum_courses_prof1').innerHTML;

document.getElementById('curriculum_courses_prof'+counter).innerHTML = select;



}

function curriculum_add_sector() {

var counter = 1;


while (document.getElementById('curriculum_sector_name'+counter)) {
counter = counter + 1;
}

var new_sector = '<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px;">				<legend style="font-size:18px;">Δήλωση κατευθύνσεων</legend>				<label class="curriculum_label">Όνομα κατεύθυνσης: </label>								<input class="curriculum_input" type="text" name="dname" id="curriculum_sector_name'+counter+'" placeholder="Όνομα κατεύθυνσης" class="required"><br>								<label class="curriculum_label">Έναρξης κατεύθυνσης: </label>								<input class="curriculum_input" type="number" name="dsemstart" id="curriculum_sector_start'+counter+'" placeholder="Έναρξης κατεύθυνσης" style="width:200px" class="required"><br>												<label class="curriculum_label">Λήξης κατεύθυνσης: </label>								<input class="curriculum_input" type="number" name="dsemend" id="curriculum_sector_end'+counter+'" style="width:200px" placeholder="Λήξης κατεύθυνσης" class="required">			</fieldset>';


document.getElementById('curriculum_sector').insertAdjacentHTML( "beforeend", new_sector );


}


function open_course(type, number) {

var counter = 1;


while (document.getElementById('curriculum_courses_name'+counter)) {
var course_name = document.getElementById("curriculum_courses_name"+counter).value;

var data = '  <tr>    <td>'+course_name+'</td>    <td><button type="button" class="curriculum_button" onclick="insert_course('+type+', '+number+', \''+course_name+'\', 0)">Προσθήκη</button></td>   </tr>';
document.getElementById("open_course_course").insertAdjacentHTML( "beforeend", data );
counter = counter + 1;
}

document.getElementById("open_course").style.display = "block";


}

function open_course_chain(type, number) {

var counter = 1;


while (document.getElementById('curriculum_courses_name'+counter)) {
var course_name = document.getElementById("curriculum_courses_name"+counter).value;

var data = '  <tr>    <td>'+course_name+'</td>    <td><button type="button" class="curriculum_button" onclick="insert_course('+type+', '+number+', \''+course_name+'\', 1)">Προσθήκη</button></td>   </tr>';
document.getElementById("open_course_course").insertAdjacentHTML( "beforeend", data );
counter = counter + 1;
}

document.getElementById("open_course").style.display = "block";


}


function close_course() {


document.getElementById("open_course").style.display = "none";
document.getElementById("open_course_course").innerHTML = "";

}

function insert_course(type, number, text, chain) {

if (chain == 0) {
var data = '<div class="curriculum_semester_inside_course" name="'+text+'">'+text+' <span class="curriculum_semester_chain" name="chain_'+text+'"></span><label style="color:red;cursor:pointer;" onclick="if (confirm(\'Διαγραφή;\')) this.parentNode.parentNode.removeChild(this.parentNode);">&#x274c;</label></div>';
				


if (type==1 || type==3 || type==5) {

document.getElementById("curriculum_semester_type"+type+"_"+number).insertAdjacentHTML( "beforeend", data );
document.getElementById("open_course").style.display = "none";
document.getElementById("open_course_course").innerHTML = "";
open_course_chain(type, number);

}
else {

document.getElementById("curriculum_semester_type"+type+"_"+number).insertAdjacentHTML( "beforeend", data );
document.getElementById("open_course").style.display = "none";
document.getElementById("open_course_course").innerHTML = "";

}

}
else {


var searchEles = document.getElementById("curriculum_semester_type"+type+"_"+number).children;

if (document.getElementsByName("chain_"+searchEles[searchEles.length-1].getAttribute("name"))[document.getElementsByName("chain_"+searchEles[searchEles.length-1].getAttribute("name")).length-1].textContent.length == 0) {
 document.getElementsByName("chain_"+searchEles[searchEles.length-1].getAttribute("name"))[document.getElementsByName("chain_"+searchEles[searchEles.length-1].getAttribute("name")).length-1].insertAdjacentHTML( "beforeend", text );

}
else {
 document.getElementsByName("chain_"+searchEles[searchEles.length-1].getAttribute("name"))[document.getElementsByName("chain_"+searchEles[searchEles.length-1].getAttribute("name")).length-1].insertAdjacentHTML( "beforeend", "," + text );

}




}

}

function curriculum_semester() {

var counter = 1;
var counter2 = 1;

while (document.getElementById('curriculum_sector_name'+counter2)) {
var i = 0;
for (i=parseInt(document.getElementById('curriculum_sector_start'+counter2).value); i<=parseInt(document.getElementById('curriculum_sector_end'+counter2).value); i++) {
var name = document.getElementById('curriculum_sector_name'+counter2).value;
var data = '<div id="curriculum_semester_form'+counter+'" class="curriculum_semester_forms">										<div>											<div class="curriculum_semester_header">Εξάμηνο <span id="curriculum_semester_number'+counter+'">'+i+'</span> (<span id="curriculum_semester_sector'+counter+'">'+name+'</span>)																		<div style="float:right; border-left: 1px solid #5aaaf8;padding-left:12px;">							<label class="curriculum_label">Ελάχιστος αριθμός περασμένων μαθημάτων: </label>								<input class="curriculum_input" type="number" id="curriculum_semester_minpass'+counter+'" class="required"><br></div>						</div><br>			<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px; vertical-align:top;">				<legend style="font-size:18px;">Υποχρεωτικά</legend>				<div id="curriculum_semester_type0_'+counter+'">								</div><br>		<button type="button" id="endlesson" class="curriculum_button" onclick="open_course(0, '+counter+')">Προσθήκη Μαθήματος</button>			</fieldset>									<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px; vertical-align:top;">				<legend style="font-size:18px;">Υποχρεωτικά με αλυσίδα</legend>				<div id="curriculum_semester_type1_'+counter+'">								</div><br>		<button type="button" class="curriculum_button" onclick="open_course(1, '+counter+')">Προσθήκη Μαθήματος</button>			</fieldset>			<br>						<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px; vertical-align:top;">				<legend style="font-size:18px;">Υποχρεωτικά επιλογής</legend>						<label class="curriculum_label">Ελάχιστος αριθμός περασμένων μαθημάτων: </label>								<input class="curriculum_input" type="number" id="curriculum_semester_min_pass_type2_'+counter+'" class="required"><br>						<label class="curriculum_label">Μέγιστος αριθμός επιλογής: </label>								<input class="curriculum_input" type="number" id="curriculum_semester_max_select_type2_'+counter+'" class="required"><br>				<div id="curriculum_semester_type2_'+counter+'">								</div><br>		<button type="button" class="curriculum_button" onclick="open_course(2, '+counter+')">Προσθήκη Μαθήματος</button>			</fieldset>												<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px; vertical-align:top;">				<legend style="font-size:18px;">Υποχρεωτικά επιλογής με αλυσίδα</legend>						<label class="curriculum_label">Ελάχιστος αριθμός περασμένων μαθημάτων: </label>								<input class="curriculum_input" type="number" id="curriculum_semester_min_pass_type3_'+counter+'" class="required"><br>						<label class="curriculum_label">Μέγιστος αριθμός επιλογής: </label>								<input class="curriculum_input" type="number" id="curriculum_semester_max_select_type3_'+counter+'" class="required"><br>				<div id="curriculum_semester_type3_'+counter+'">								</div><br>		<button type="button" class="curriculum_button" onclick="open_course(3, '+counter+')">Προσθήκη Μαθήματος</button>			</fieldset><br>					<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px; vertical-align:top;">				<legend style="font-size:18px;">Ελεύθερης επιλογής</legend>						<label class="curriculum_label">Μέγιστος αριθμός επιλογής: </label>								<input class="curriculum_input" type="number" id="curriculum_semester_max_select_type4_'+counter+'" class="required"><br>				<div id="curriculum_semester_type4_'+counter+'">								</div><br>		<button type="button" class="curriculum_button" onclick="open_course(4, '+counter+')">Προσθήκη Μαθήματος</button>			</fieldset>											<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px; vertical-align:top;">				<legend style="font-size:18px;">Ελεύθερης επιλογής με αλυσίδα</legend>						<label class="curriculum_label">Μέγιστος αριθμός επιλογής: </label>								<input class="curriculum_input" type="number" id="curriculum_semester_max_select_type5_'+counter+'" class="required"><br>				<div id="curriculum_semester_type5_'+counter+'">								</div><br>		<button type="button" class="curriculum_button" onclick="open_course(5, '+counter+')">Προσθήκη Μαθήματος</button>			</fieldset>			<br>											<fieldset style="display:inline-block; margin-left: 8px; margin-bottom: 8px; vertical-align:top;">				<legend style="font-size:18px;">Πτυχιακή</legend>						<label class="curriculum_label">Πτυχιακή: </label>								<input type="checkbox" style="vertical-align: bottom;" id="curriculum_semester_type6_'+counter+'" value="1"><br>			</fieldset>					</div><br>												<button type="button" class="curriculum_button" onclick="curriculum_next_semester('+counter+')">Επόμενο</button>				</div>';

document.getElementById("curriculum_semester_form").insertAdjacentHTML( "beforeend", data );

counter= counter + 1;
}

counter2 = counter2 + 1;
}

document.getElementById("curriculum_sector_form").style.display = "none";

document.getElementById("curriculum_semester_form1").style.display = "block";


}

function curriculum_next_semester(number) {

if (document.getElementById('curriculum_semester_form'+(number + 1))) {

document.getElementById("curriculum_semester_form"+number).style.display = "none";
document.getElementById("curriculum_semester_form"+(number+1)).style.display = "block";


}
else {
var json = '{"curriculum_name":"'+document.getElementById("curriculum_name").value+'","curriculum_semesters":'+document.getElementById("curriculum_semesters").value+',"curriculum_maxLessons":'+document.getElementById("curriculum_maxLessons").value;


var counter = 1;
var courses_curriculum_courses_name = [];
var courses_curriculum_courses_prof = [];
var courses_curriculum_courses_units = [];
var courses_curriculum_courses_ects = [];
var courses_curriculum_courses_lab = [];
var courses_curriculum_courses_seas = [];
var courses_curriculum_courses_weight = [];
var courses_curriculum_courses_desc = [];




while (document.getElementById('curriculum_courses_name'+counter)) {
courses_curriculum_courses_name[(counter-1)] = document.getElementById('curriculum_courses_name'+counter).value;
courses_curriculum_courses_prof[(counter-1)] = document.getElementById("curriculum_courses_prof"+counter).options[document.getElementById("curriculum_courses_prof"+counter).selectedIndex].value;
courses_curriculum_courses_units[(counter-1)] = document.getElementById('curriculum_courses_units'+counter).value;
courses_curriculum_courses_ects[(counter-1)] = document.getElementById('curriculum_courses_ects'+counter).value;
courses_curriculum_courses_lab[(counter-1)] = document.getElementById('curriculum_courses_lab'+counter).value;
courses_curriculum_courses_seas[(counter-1)] = document.getElementById('curriculum_courses_seas'+counter).value;
courses_curriculum_courses_weight[(counter-1)] = document.getElementById('curriculum_courses_weight'+counter).value;
courses_curriculum_courses_desc[(counter-1)] = document.getElementById('curriculum_courses_desc'+counter).value;

counter = counter + 1;
}


json += ',"curriculum_courses_name":'+JSON.stringify(courses_curriculum_courses_name)+',"curriculum_courses_prof":'+JSON.stringify(courses_curriculum_courses_prof)+',"curriculum_courses_units":'+JSON.stringify(courses_curriculum_courses_units)+',"curriculum_courses_ects":'+JSON.stringify(courses_curriculum_courses_ects)+',"curriculum_courses_lab":'+JSON.stringify(courses_curriculum_courses_lab)+',"curriculum_courses_seas":'+JSON.stringify(courses_curriculum_courses_seas)+',"curriculum_courses_weight":'+JSON.stringify(courses_curriculum_courses_weight)+',"curriculum_courses_desc":'+JSON.stringify(courses_curriculum_courses_desc);




counter = 1
var curriculum_sector_name = [];
var curriculum_sector_start = [];
var curriculum_sector_end = [];

while (document.getElementById('curriculum_sector_name'+counter)) {
curriculum_sector_name[(counter-1)] = document.getElementById('curriculum_sector_name'+counter).value;
curriculum_sector_start[(counter-1)] = document.getElementById('curriculum_sector_start'+counter).value;
curriculum_sector_end[(counter-1)] = document.getElementById('curriculum_sector_end'+counter).value;

counter = counter + 1;
}



json += ',"curriculum_sector_name":'+JSON.stringify(curriculum_sector_name)+',"curriculum_sector_start":'+JSON.stringify(curriculum_sector_start)+',"curriculum_sector_end":'+JSON.stringify(curriculum_sector_end);

json += ',"courses":{';
counter = 1
while (document.getElementById('curriculum_semester_number'+counter)) {





json += '"course'+counter+'": {"curriculum_semester_number":"'+document.getElementById('curriculum_semester_number'+counter).textContent+'","curriculum_semester_sector":"'+document.getElementById('curriculum_semester_sector'+counter).textContent+'","curriculum_semester_minpass":'+document.getElementById('curriculum_semester_minpass'+counter).value+',"type0":[ ';

var div0 = document.getElementById('curriculum_semester_type0_'+counter).getElementsByTagName('div');
for(var i = 0, l = div0.length; i < l; i++){
json += '"'+div0[i].getAttribute("name")+'",';

}
json = json.substring(0, json.length - 1);
json += '],"type1":[ ';

var div1 = document.getElementById('curriculum_semester_type1_'+counter).getElementsByTagName('div');
var span1 = document.getElementById('curriculum_semester_type1_'+counter).getElementsByTagName('span');
for(var i = 0, l = div1.length; i < l; i++){
json += '["'+div1[i].getAttribute("name")+'"';
var span_split = (span1[i].textContent).split(',');
for(var j = 0; j < span_split.length; j++) {
if (span_split[j].length > 1) {
json += ',"'+span_split[j]+'"';
}
}
json += '],';
}

json = json.substring(0, json.length - 1);
json += '],"type2":[ ';




var div2 = document.getElementById('curriculum_semester_type2_'+counter).getElementsByTagName('div');
for(var i = 0, l = div2.length; i < l; i++){
json += '"'+div2[i].getAttribute("name")+'",';

}
json = json.substring(0, json.length - 1);
json += '],"type3":[ ';



var div3 = document.getElementById('curriculum_semester_type3_'+counter).getElementsByTagName('div');
var span3 = document.getElementById('curriculum_semester_type3_'+counter).getElementsByTagName('span');
for(var i = 0, l = div3.length; i < l; i++){
json += '["'+div3[i].getAttribute("name")+'"';
var span_split = (span3[i].textContent).split(',');
for(var j = 0; j < span_split.length; j++) {
if (span_split[j].length > 1) {
json += ',"'+span_split[j]+'"';
}
}
json += '],';
}

json = json.substring(0, json.length - 1);
json += '],"type4":[ ';



var div4 = document.getElementById('curriculum_semester_type4_'+counter).getElementsByTagName('div');
for(var i = 0, l = div4.length; i < l; i++){
json += '"'+div4[i].getAttribute("name")+'",';

}
json = json.substring(0, json.length - 1);
json += '],"type5":[ ';



var div5 = document.getElementById('curriculum_semester_type5_'+counter).getElementsByTagName('div');
var span5 = document.getElementById('curriculum_semester_type5_'+counter).getElementsByTagName('span');
for(var i = 0, l = div5.length; i < l; i++){
json += '["'+div5[i].getAttribute("name")+'"';
var span_split = (span5[i].textContent).split(',');
for(var j = 0; j < span_split.length; j++) {
if (span_split[j].length > 1) {
json += ',"'+span_split[j]+'"';
}
}
json += '],';
}

json = json.substring(0, json.length - 1);
json += '],"type6":[ ';

if (document.getElementById('curriculum_semester_type6_'+counter).checked) {

json += '1';

}
else {
json += '0';

}








json += '], "curriculum_semester_min_pass_type2":'+document.getElementById('curriculum_semester_min_pass_type2_'+counter).value+',"curriculum_semester_max_select_type2":'+document.getElementById('curriculum_semester_max_select_type2_'+counter).value+',"curriculum_semester_min_pass_type3":'+document.getElementById('curriculum_semester_min_pass_type3_'+counter).value+',"curriculum_semester_max_select_type3":'+document.getElementById('curriculum_semester_max_select_type3_'+counter).value+',"curriculum_semester_max_select_type4":'+document.getElementById('curriculum_semester_max_select_type4_'+counter).value+',"curriculum_semester_max_select_type5":'+document.getElementById('curriculum_semester_max_select_type5_'+counter).value;


json += "},"
counter = counter + 1;
}

json = json.substring(0, json.length - 1);



json += '}}';


exec_c("curriculum_add", "data="+json);



}

}


  
  
  
  
  
    // ****  CURRICULUM **** //
	
	// ****  PROFESSORS_LIST **** //
	
	
	function professorListBuilder(data){
		
		document.title = 'Καθηγητές';

		var res = '<div class="professorListContainer"><table id="professorListTable"> <tr class="professorListRowHead">   <th class="professorListHeader">Name</th>   <th class="professorListHeader">e-mail</th>   <th class="professorListHeader">Status</th></tr>   </div>';
		document.getElementById('results').innerHTML = res;

var listRow='<tr class="professorListRowData" > <td class="professorListName professorListData" id="professorListNameTemp" style="cursor:pointer;" onclick="post_data(\'professor\',this.dataset.id)"> </td>  <td class="professorListEmail professorListData"><a id="professorListEmailTemp">  </a></td>  <td class="professorListAvail professorListData" id="professorListAvailTemp"></td>  </tr>';

for (var i=0;i<data.ids.length;i++){

var tbody=document.createElement("tbody");
tbody.innerHTML=listRow;
document.getElementById("professorListTable").appendChild(tbody);

document.getElementById("professorListNameTemp").setAttribute("data-id","t_id="+data.ids[i]); //afto vazw ws 2h metavliti
var name=document.getElementById("professorListNameTemp");
var email=document.getElementById("professorListEmailTemp");
var avail=document.getElementById("professorListAvailTemp");


name.id="professorListName"+data.ids[i];
email.id="professorListEmail"+data.ids[i];
avail.id="professorListAvail"+data.ids[i];

name.textContent=data.name[i];
email.textContent=data.email[i];
avail.textContent=isOnline(data.status[i]);


}

}




function isOnline(status){
if(status==1){
return "Ενεργός";
}else{
return "Ανενεργός";
}
}

	// ****  PROFESSORS_LIST **** //

		// ****  PROFESSOR **** //

	function professor_json(data) {
 		document.title = 'Πληροφορίες καθηγητή';

		var res = '<div class="container herocontent" style="text-align:center">               <h2 class="page-header">Πληροφορίες Καθηγητή</h2><br>                <br>    <div class="tbl-header">      <center>        <table  class="table table-bordered table-striped" >            <thead class="thead-dark">                <tr>                    <th style="background-color:  rgba(48, 206, 179, 0.76); border:none"><br></th>                    <th style="background-color:  rgba(48, 206, 179, 0.76); border:none"><br></th>                </tr>            </thead>            <tbody id="tropoieis">                                     <tr>                     <td>email:</td>                     <td id="email"></td>                     </tr>                     <tr>                     <td>Όνομα:</td>                     <td id="first_name"></td>                     </tr>                     <tr>                     <td>Επώνυμο:</td>                     <td id="last_name"></td>                     </tr>                     <tr>                     <td>Πατρώνυμο:</td>                     <td id="father_name"></td>                     </tr>                     <tr>                     <td>Τηλέφωνο:</td>                     <td id="phone"></td>                     </tr>                     <tr>                     <td>Τηλέφωνο2:</td>                     <td id="phone2"></td>                     </tr>                     <tr>                     <td>Διεύθυνη:</td>                     <td id="address"></td>                     </tr>                     <tr>                     <td>ΤΚ:</td>                     <td id="post_code"></td>                     </tr>                     <tr>                     <td>Κατάσταση:</td>                     <td id="status"></td>                     </tr>                     <tr>                     <td>Φύλο:</td>                     <td id="gender"></td>                     </tr>                     <tr>                     <td>Ώρες επικοινωνίας:</td>                     <td id="contact_hours"></td>                     </tr>                     <tr>                     <td>Ιστοσελίδα:</td>                     <td id="site"></td>                     </tr>                     <tr>                     <td>Τομέας:</td>                     <td id="staff_sector"></td>                     </tr>            </tbody>        </table>		</center>    </div>    </div>';
		document.getElementById('results').innerHTML = res;

 var output=document.getElementById('email');
      output.textContent=data.email;
      var output=document.getElementById('first_name');
      output.textContent=data.first_name;
      var output=document.getElementById('last_name');
      output.textContent=data.last_name;
      var output=document.getElementById('father_name');
      output.textContent=data.father_name;
      var output=document.getElementById('phone');
      output.textContent=data.phone;
      var output=document.getElementById('phone2');
      output.textContent=data.phone2;
      var output=document.getElementById('address');
      output.textContent=data.address;
      var output=document.getElementById('post_code');
      output.textContent=data.post_code;
      var output=document.getElementById('status');
      if(data.status==1)
       output.textContent='Eνεργός';
      else
      output.textContent='Aνενεργός';
      var output=document.getElementById('gender');
      output.textContent=data.gender;
      var output=document.getElementById('contact_hours');
      output.textContent=data.contact_hours;
      var output=document.getElementById('site');
      output.textContent=data.site;
      var output=document.getElementById('staff_sector');
      output.textContent=data.staff_sector;
            

      
 
 }
 
 		// ****  PROFESSOR **** //

		
		 		// ****  REGISTER **** //

		
		  function register_init(data) {
    document.title = "Εγγραφή";

			var res = '<div class="register_container" id="register_container">  <div class="register_method_buttons" id="register_method_buttons">    <span class="register_method" id="register_method_input">Εγγραφή ενός χρήστη</span>    <span id="register_upload_wrapper">      <label for="register_uploadedCSV" class="register_method" id="register_method_upload">Εγγραφή χρηστών (.csv)</label>      <input type="file" accept=".csv" name="myfile" id="register_uploadedCSV">    </span>  </div>  <div class="register_file_error" id="register_file_error"></div>  <div class="register_input_container" id="register_input_container">    <div class="register_input_wrapper">      <label for="register_eMail" class="register_input_label">E-mail:</label>      <input type="email" class="register_input" id="register_eMail">      <label class="register_input_error" id="register_eMail_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_accessLevel" class="register_input_label">Ιδιότητα:</label>      <select class="register_input" id="register_accessLevel">        <option value="1" select="selected">Φοιτητής</option>        <option value="2">Καθηγητής</option>        <option value="3">Γραμματεία</option>      </select>      <label class="register_input_error" id="register_accessLevel_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_firstName" class="register_input_label">Όνομα:</label>      <input type="text" class="register_input" id="register_firstName">      <label class="register_input_error" id="register_firstName_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_lastName" class="register_input_label">Επώνυμο:</label>      <input type="text" class="register_input" id="register_lastName">      <label class="register_input_error" id="register_lastName_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_fatherName" class="register_input_label">Όνομα πατέρα:</label>      <input type="text" class="register_input" id="register_fatherName">      <label class="register_input_error" id="register_fatherName_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_phone" class="register_input_label">Τηλέφωνο:</label>      <input type="text" class="register_input" id="register_phone">      <label class="register_input_error" id="register_phone_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_phone2" class="register_input_label">Τηλέφωνο 2:</label>      <input type="text" class="register_input" id="register_phone2">      <label class="register_input_error" id="register_phone2_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_address" class="register_input_label">Διεύθυνση:</label>      <input type="text" class="register_input" id="register_address">      <label class="register_input_error" id="register_address_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_postCode" class="register_input_label">Ταχυδρομικός κώδικας:</label>      <input type="text" class="register_input" id="register_postCode">      <label class="register_input_error" id="register_postCode_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_dateOfRegistration" class="register_input_label">Ημερομηνία εγγραφής:</label>      <input type="date" class="register_input" id="register_dateOfRegistration">      <label class="register_input_error" id="register_dateOfRegistration_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_semesterEnter" class="register_input_label">Εξάμηνο εισαγωγής:</label>      <input type="text" class="register_input" id="register_semesterEnter">      <label class="register_input_error" id="register_semesterEnter_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_enrollment" class="register_input_label">Τρόπος εισαγωγής:</label>      <select class="register_input" id="register_enrollment"></select>      <label class="register_input_error" id="register_enrollment_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_firstDegree" class="register_input_label">Πρώτο πτυχίο:</label>      <select class="register_input" id="register_firstDegree">        <option value="1" select="selected">Ναι</option>        <option value="0">Όχι</option>      </select>      <label class="register_input_error" id="register_firstDegree_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_gender" class="register_input_label">Φύλο</label>      <select class="register_input" id="register_gender">        <option disabled selected value> -- Διαλέξτε φύλο -- </option>        <option value="1">Άνδρας</option>        <option value="0">Γυναίκα</option>      </select>      <label class="register_input_error" id="register_gender_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_birthDate" class="register_input_label">Ημερομηνία γέννησης:</label>      <input type="date" class="register_input" id="register_birthDate">      <label class="register_input_error" id="register_birthDate_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_country" class="register_input_label">Χώρα:</label>      <select class="register_input" id="register_country">      	<option value="AF">Afghanistan</option>      	<option value="AX">Aland Islands</option>      	<option value="AL">Albania</option>      	<option value="DZ">Algeria</option>      	<option value="AS">American Samoa</option>      	<option value="AD">Andorra</option>      	<option value="AO">Angola</option>      	<option value="AI">Anguilla</option>      	<option value="AQ">Antarctica</option>      	<option value="AG">Antigua and Barbuda</option>      	<option value="AR">Argentina</option>      	<option value="AM">Armenia</option>      	<option value="AW">Aruba</option>      	<option value="AU">Australia</option>      	<option value="AT">Austria</option>      	<option value="AZ">Azerbaijan</option>      	<option value="BS">Bahamas</option>      	<option value="BH">Bahrain</option>      	<option value="BD">Bangladesh</option>      	<option value="BB">Barbados</option>      	<option value="BY">Belarus</option>      	<option value="BE">Belgium</option>      	<option value="BZ">Belize</option>      	<option value="BJ">Benin</option>      	<option value="BM">Bermuda</option>      	<option value="BT">Bhutan</option>      	<option value="BO">Bolivia, Plurinational State of</option>      	<option value="BQ">Bonaire, Sint Eustatius and Saba</option>      	<option value="BA">Bosnia and Herzegovina</option>      	<option value="BW">Botswana</option>      	<option value="BV">Bouvet Island</option>      	<option value="BR">Brazil</option>      	<option value="IO">British Indian Ocean Territory</option>      	<option value="BN">Brunei Darussalam</option>      	<option value="BG">Bulgaria</option>      	<option value="BF">Burkina Faso</option>      	<option value="BI">Burundi</option>      	<option value="KH">Cambodia</option>      	<option value="CM">Cameroon</option>      	<option value="CA">Canada</option>      	<option value="CV">Cape Verde</option>      	<option value="KY">Cayman Islands</option>      	<option value="CF">Central African Republic</option>      	<option value="TD">Chad</option>      	<option value="CL">Chile</option>      	<option value="CN">China</option>      	<option value="CX">Christmas Island</option>      	<option value="CC">Cocos (Keeling) Islands</option>      	<option value="CO">Colombia</option>      	<option value="KM">Comoros</option>      	<option value="CG">Congo</option>      	<option value="CD">Congo, the Democratic Republic of the</option>      	<option value="CK">Cook Islands</option>      	<option value="CR">Costa Rica</option>      	<option value="CI">Cote d\'Ivoire</option>      	<option value="HR">Croatia</option>      	<option value="CU">Cuba</option>      	<option value="CW">Curacao</option>      	<option value="CY">Cyprus</option>      	<option value="CZ">Czech Republic</option>      	<option value="DK">Denmark</option>      	<option value="DJ">Djibouti</option>      	<option value="DM">Dominica</option>      	<option value="DO">Dominican Republic</option>      	<option value="EC">Ecuador</option>      	<option value="EG">Egypt</option>      	<option value="SV">El Salvador</option>      	<option value="GQ">Equatorial Guinea</option>      	<option value="ER">Eritrea</option>      	<option value="EE">Estonia</option>      	<option value="ET">Ethiopia</option>      	<option value="FK">Falkland Islands (Malvinas)</option>      	<option value="FO">Faroe Islands</option>      	<option value="FJ">Fiji</option>      	<option value="FI">Finland</option>      	<option value="FR">France</option>      	<option value="GF">French Guiana</option>      	<option value="PF">French Polynesia</option>      	<option value="TF">French Southern Territories</option>      	<option value="GA">Gabon</option>      	<option value="GM">Gambia</option>      	<option value="GE">Georgia</option>      	<option value="DE">Germany</option>      	<option value="GH">Ghana</option>      	<option value="GI">Gibraltar</option>      	<option value="GR" selected="selected">Greece</option>      	<option value="GL">Greenland</option>      	<option value="GD">Grenada</option>      	<option value="GP">Guadeloupe</option>      	<option value="GU">Guam</option>      	<option value="GT">Guatemala</option>      	<option value="GG">Guernsey</option>      	<option value="GN">Guinea</option>      	<option value="GW">Guinea-Bissau</option>      	<option value="GY">Guyana</option>      	<option value="HT">Haiti</option>      	<option value="HM">Heard Island and McDonald Islands</option>      	<option value="VA">Holy See (Vatican City State)</option>      	<option value="HN">Honduras</option>      	<option value="HK">Hong Kong</option>      	<option value="HU">Hungary</option>      	<option value="IS">Iceland</option>      	<option value="IN">India</option>      	<option value="ID">Indonesia</option>      	<option value="IR">Iran, Islamic Republic of</option>      	<option value="IQ">Iraq</option>      	<option value="IE">Ireland</option>      	<option value="IM">Isle of Man</option>      	<option value="IL">Israel</option>      	<option value="IT">Italy</option>      	<option value="JM">Jamaica</option>      	<option value="JP">Japan</option>      	<option value="JE">Jersey</option>      	<option value="JO">Jordan</option>      	<option value="KZ">Kazakhstan</option>      	<option value="KE">Kenya</option>      	<option value="KI">Kiribati</option>      	<option value="KP">Korea, Democratic People\'s Republic of</option>      	<option value="KR">Korea, Republic of</option>      	<option value="KW">Kuwait</option>      	<option value="KG">Kyrgyzstan</option>      	<option value="LA">Lao People\'s Democratic Republic</option>      	<option value="LV">Latvia</option>      	<option value="LB">Lebanon</option>      	<option value="LS">Lesotho</option>      	<option value="LR">Liberia</option>      	<option value="LY">Libya</option>      	<option value="LI">Liechtenstein</option>      	<option value="LT">Lithuania</option>      	<option value="LU">Luxembourg</option>      	<option value="MO">Macao</option>      	<option value="MK">Macedonia, the former Yugoslav Republic of</option>      	<option value="MG">Madagascar</option>      	<option value="MW">Malawi</option>      	<option value="MY">Malaysia</option>      	<option value="MV">Maldives</option>      	<option value="ML">Mali</option>      	<option value="MT">Malta</option>      	<option value="MH">Marshall Islands</option>      	<option value="MQ">Martinique</option>      	<option value="MR">Mauritania</option>      	<option value="MU">Mauritius</option>      	<option value="YT">Mayotte</option>      	<option value="MX">Mexico</option>      	<option value="FM">Micronesia, Federated States of</option>      	<option value="MD">Moldova, Republic of</option>      	<option value="MC">Monaco</option>      	<option value="MN">Mongolia</option>      	<option value="ME">Montenegro</option>      	<option value="MS">Montserrat</option>      	<option value="MA">Morocco</option>      	<option value="MZ">Mozambique</option>      	<option value="MM">Myanmar</option>      	<option value="NA">Namibia</option>      	<option value="NR">Nauru</option>      	<option value="NP">Nepal</option>      	<option value="NL">Netherlands</option>      	<option value="NC">New Caledonia</option>      	<option value="NZ">New Zealand</option>      	<option value="NI">Nicaragua</option>      	<option value="NE">Niger</option>      	<option value="NG">Nigeria</option>      	<option value="NU">Niue</option>      	<option value="NF">Norfolk Island</option>      	<option value="MP">Northern Mariana Islands</option>      	<option value="NO">Norway</option>      	<option value="OM">Oman</option>      	<option value="PK">Pakistan</option>      	<option value="PW">Palau</option>      	<option value="PS">Palestinian Territory, Occupied</option>      	<option value="PA">Panama</option>      	<option value="PG">Papua New Guinea</option>      	<option value="PY">Paraguay</option>      	<option value="PE">Peru</option>      	<option value="PH">Philippines</option>      	<option value="PN">Pitcairn</option>      	<option value="PL">Poland</option>      	<option value="PT">Portugal</option>      	<option value="PR">Puerto Rico</option>      	<option value="QA">Qatar</option>      	<option value="RE">Reunion</option>      	<option value="RO">Romania</option>      	<option value="RU">Russian Federation</option>      	<option value="RW">Rwanda</option>      	<option value="BL">Saint Barthelemy</option>      	<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>      	<option value="KN">Saint Kitts and Nevis</option>      	<option value="LC">Saint Lucia</option>      	<option value="MF">Saint Martin (French part)</option>      	<option value="PM">Saint Pierre and Miquelon</option>      	<option value="VC">Saint Vincent and the Grenadines</option>      	<option value="WS">Samoa</option>      	<option value="SM">San Marino</option>      	<option value="ST">Sao Tome and Principe</option>      	<option value="SA">Saudi Arabia</option>      	<option value="SN">Senegal</option>      	<option value="RS">Serbia</option>      	<option value="SC">Seychelles</option>      	<option value="SL">Sierra Leone</option>      	<option value="SG">Singapore</option>      	<option value="SX">Sint Maarten (Dutch part)</option>      	<option value="SK">Slovakia</option>      	<option value="SI">Slovenia</option>      	<option value="SB">Solomon Islands</option>      	<option value="SO">Somalia</option>      	<option value="ZA">South Africa</option>      	<option value="GS">South Georgia and the South Sandwich Islands</option>      	<option value="SS">South Sudan</option>      	<option value="ES">Spain</option>      	<option value="LK">Sri Lanka</option>      	<option value="SD">Sudan</option>      	<option value="SR">Suriname</option>      	<option value="SJ">Svalbard and Jan Mayen</option>      	<option value="SZ">Swaziland</option>      	<option value="SE">Sweden</option>      	<option value="CH">Switzerland</option>      	<option value="SY">Syrian Arab Republic</option>      	<option value="TW">Taiwan, Province of China</option>      	<option value="TJ">Tajikistan</option>      	<option value="TZ">Tanzania, United Republic of</option>      	<option value="TH">Thailand</option>      	<option value="TL">Timor-Leste</option>      	<option value="TG">Togo</option>      	<option value="TK">Tokelau</option>      	<option value="TO">Tonga</option>      	<option value="TT">Trinidad and Tobago</option>      	<option value="TN">Tunisia</option>      	<option value="TR">Turkey</option>      	<option value="TM">Turkmenistan</option>      	<option value="TC">Turks and Caicos Islands</option>      	<option value="TV">Tuvalu</option>      	<option value="UG">Uganda</option>      	<option value="UA">Ukraine</option>      	<option value="AE">United Arab Emirates</option>      	<option value="GB">United Kingdom</option>      	<option value="US">United States</option>      	<option value="UM">United States Minor Outlying Islands</option>      	<option value="UY">Uruguay</option>      	<option value="UZ">Uzbekistan</option>      	<option value="VU">Vanuatu</option>      	<option value="VE">Venezuela, Bolivarian Republic of</option>      	<option value="VN">Viet Nam</option>      	<option value="VG">Virgin Islands, British</option>      	<option value="VI">Virgin Islands, U.S.</option>      	<option value="WF">Wallis and Futuna</option>      	<option value="EH">Western Sahara</option>      	<option value="YE">Yemen</option>      	<option value="ZM">Zambia</option>      	<option value="ZW">Zimbabwe</option>      </select>      <label class="register_input_error" id="register_country_error"></label>    </div>    <div class="register_input_wrapper">      <label for="register_curriculumID" class="register_input_label">Πρόγραμμα Σπουδών:</label>      <select class="register_input" id="register_curriculumID"></select>      <label class="register_input_error" id="register_curriculumID_error"></label>    </div>    <div class="register_input_buttons" id="register_input_buttons">      <span class="register_input_button" id="register_input_register" onclick="register_input2json()">Εισαγωγή</span>      <span class="register_input_button" id="register_input_clear">Καθαρισμός</span>      <span class="register_input_button" id="register_input_cancel">Ακύρωση</span>    </div>  </div></div>';
	
	document.getElementById('results').innerHTML = res;

	
    var i, currIdOpt, enrollOpt;
    var access_level = ['Φοιτητής', 'Καθηγητής', 'Γραμματεία'];

    $("#register_input_container").hide();

    $("#register_method_input").click(function() {
      $("#register_input_container").show();
      $("#register_method_buttons").hide();
      $("#register_file_error").hide();
    });

    var currentYear = new Date().getFullYear();
    var currentMonth = '0' + (new Date().getMonth() + 1);
    var currentDate = new Date().getDate();
    $("#register_dateOfRegistration").val(currentYear+'-'+currentMonth+'-'+currentDate);
    $("#register_birthDate").val(currentYear+'-'+currentMonth+'-'+currentDate);

    var enrollSel = document.getElementById('register_enrollment');
    for (i = 0; i < data["enrollment_ids"].length; i++) {
      enrollOpt = document.createElement('option');
      enrollOpt.appendChild( document.createTextNode(data.enrollment_name[i]) );
      enrollOpt.value = data.enrollment_ids[i];
      enrollSel.appendChild(enrollOpt);
    }

    var currIdSel = document.getElementById('register_curriculumID');
    for (i = 0; i < data["curriculum_ids"].length; i++) {
      currIdOpt = document.createElement('option');
      currIdOpt.appendChild( document.createTextNode(data.curriculum_name[i]) );
      currIdOpt.value = data.curriculum_ids[i];
      if (i === data["curriculum_ids"].length - 1) currIdOpt.selected="selected";
      currIdSel.appendChild(currIdOpt);
    }

    $("#register_input_clear").click(function() {
      $("#register_eMail").val('');
      $("#register_accessLevel").val('1');
      $("#register_firstName").val('');
      $("#register_lastName").val('');
      $("#register_fatherName").val('');
      $("#register_phone").val('');
      $("#register_phone2").val('');
      $("#register_address").val('');
      $("#register_postCode").val('');
      $("#register_dateOfRegistration").val(currentYear+'-'+currentMonth+'-'+currentDate);
      $("#register_semesterEnter").val('');
      $("#register_enrollment").val(data.enrollment_ids[0]);
      $("#register_firstDegree").val('0');
      $("#register_gender").val('');
      $("#register_birthDate").val(currentYear+'-'+currentMonth+'-'+currentDate);
      $("#register_country").val('GR');
      $("#register_curriculumID").val(data.curriculum_ids[data["curriculum_ids"].length - 1]);

      $(".register_input_error").hide();
      $(".register_input").css("border", "1px solid grey");
      window.scrollTo(0, 0);
    });

    $("#register_input_cancel").click(function() {
      $("#register_input_clear").click();
      $("#register_input_container").hide();
      $("#register_method_buttons").show();
    });

    var register_upload_wrapper = $("#register_upload_wrapper");
    var register_upload_file = $("#register_upload_wrapper #register_uploadedCSV");

    function register_FileChange() {
      register_csvProcess($(this), data);
      $(this).remove();
      $("<input type='file' name='myfile' id='register_uploadedCSV'>").change(register_FileChange).appendTo(register_upload_wrapper);
    }
    register_upload_file.change(register_FileChange);
  }

  function register_input2json() {
    var email = document.getElementById("register_eMail");
    var access_level = document.getElementById("register_accessLevel");
    var first_name = document.getElementById("register_firstName");
    var last_name = document.getElementById("register_lastName");
    var father_name = document.getElementById("register_fatherName");
    var phone = document.getElementById("register_phone");
    var phone2 = document.getElementById("register_phone2");
    var address = document.getElementById("register_address");
    var post_code = document.getElementById("register_postCode");
    var date_of_registration = document.getElementById("register_dateOfRegistration");
    var semester_enter = document.getElementById("register_semesterEnter");
    var enrollment = document.getElementById("register_enrollment");
    var first_degree = document.getElementById("register_firstDegree");
    var gender = document.getElementById("register_gender");
    var birth_date = document.getElementById("register_birthDate");
    var country = document.getElementById("register_country");
    var curriculum_id = document.getElementById("register_curriculumID");
    var result = {};

    if (email.value === '') {
      $("#register_eMail_error").text("Παρακαλώ συμπληρώστε το e-mail.");
      $("#register_eMail_error").show();
      $("#register_eMail").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else if (!email.checkValidity()) {
      $("#register_eMail").val('');
      $("#register_eMail_error").text("Μη έγκυρο e-mail.");
      $("#register_eMail_error").show();
      $("#register_eMail").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_eMail_error").hide();
      $("#register_eMail").css("border", "1px solid grey");
      result.email = email.value;
    }

    result.access_level = Number(access_level.value);

    if (first_name.value === '') {
      $("#register_firstName_error").text("Παρακαλώ συμπληρώστε το όνομα.");
      $("#register_firstName_error").show();
      $("#register_firstName").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_firstName_error").hide();
      $("#register_firstName").css("border", "1px solid grey");
      result.first_name = first_name.value;
    }

    if (last_name.value === '') {
      $("#register_lastName_error").text("Παρακαλώ συμπληρώστε το επώνυμο.");
      $("#register_lastName_error").show();
      $("#register_lastName").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_lastName_error").hide();
      $("#register_lastName").css("border", "1px solid grey");
      result.last_name = last_name.value;
    }

    if (father_name.value === '') {
      $("#register_fatherName_error").text("Παρακαλώ συμπληρώστε το όνομα πατέρα.");
      $("#register_fatherName_error").show();
      $("#register_fatherName").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_fatherName_error").hide();
      $("#register_fatherName").css("border", "1px solid grey");
      result.father_name = father_name.value;
    }

    if (phone.value === '') {
      $("#register_phone_error").text("Παρακαλώ συμπληρώστε το τηλέφωνο.");
      $("#register_phone_error").show();
      $("#register_phone").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else if (isNaN(Number(phone.value))) {
      $("#register_phone").val('');
      $("#register_phone_error").text("Το τηλέφωνο περιλαμβάνει μόνο αριθμούς.");
      $("#register_phone_error").show();
      $("#register_phone").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_phone_error").hide();
      $("#register_phone").css("border", "1px solid grey");
      result.phone = Number(phone.value);
    }

    if (isNaN(Number(phone2.value))) {
      $("#register_phone2").val('');
      $("#register_phone2_error").text("Το τηλέφωνο περιλαμβάνει μόνο αριθμούς.");
      $("#register_phone2_error").show();
      $("#register_phone2").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_phone2_error").hide();
      $("#register_phone2").css("border", "1px solid grey");
      result.phone2 = Number(phone2.value);
    }

    if (address.value === '') {
      $("#register_address_error").text("Παρακαλώ συμπληρώστε τη διεύθυνση.");
      $("#register_address_error").show();
      $("#register_address").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_address_error").hide();
      $("#register_address").css("border", "1px solid grey");
      result.address = address.value;
    }

    if (post_code.value === '') {
      $("#register_postCode_error").text("Παρακαλώ συμπληρώστε τον ταχυδρομικό κώδικα.");
      $("#register_postCode_error").show();
      $("#register_postCode").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else if (isNaN(Number(post_code.value))) {
      $("#register_postCode").val('');
      $("#register_postCode_error").text("Ο ταχυδρομικός κώδικας πρέπει να περιλαμβάνει μόνο αριθμούς.");
      $("#register_postCode_error").show();
      $("#register_postCode").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_postCode_error").hide();
      $("#register_postCode").css("border", "1px solid grey");
      result.post_code = Number(post_code.value);
    }

    if (date_of_registration.value === '') {
      $("#register_dateOfRegistration_error").text("Παρακαλώ συμπληρώστε την ημερομηνία εγγραφής.");
      $("#register_dateOfRegistration_error").show();
      $("#register_dateOfRegistration").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_dateOfRegistration_error").hide();
      $("#register_dateOfRegistration").css("border", "1px solid grey");
      result.date_of_registration = date_of_registration.value;
    }

    if (semester_enter.value === '') {
      $("#register_semesterEnter_error").text("Παρακαλώ συμπληρώστε το εξάμηνο εγγραφής.");
      $("#register_semesterEnter_error").show();
      $("#register_semesterEnter").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else if (isNaN(Number(semester_enter.value))) {
      $("#register_semesterEnter").val('');
      $("#register_semesterEnter_error").text("Το εξάμηνο εγγραφής πρέπει να είναι αριθμός.");
      $("#register_semesterEnter_error").show();
      $("#register_semesterEnter").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_semesterEnter_error").hide();
      $("#register_semesterEnter").css("border", "1px solid grey");
      result.semester_enter = Number(semester_enter.value);
    }

    result.enrollment = Number(enrollment.value);

    result.first_degree = Number(first_degree.value);

    if (gender.value === '') {
      $("#register_gender_error").text("Παρακαλώ διαλέξτε φύλο.");
      $("#register_gender_error").show();
      $("#register_gender").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_gender_error").hide();
      $("#register_gender").css("border", "1px solid grey");
      result.gender = Number(gender.value);
    }

    if (birth_date.value === '') {
      $("#register_birthDate_error").text("Παρακαλώ συμπληρώστε την ημερομηνία γέννησης.");
      $("#register_birthDate_error").show();
      $("#register_birthDate").css("border", "1px solid red");
      window.scrollTo(0, 0);
    } else {
      $("#register_birthDate_error").hide();
      $("#register_birthDate").css("border", "1px solid grey");
      result.birth_date = birth_date.value;
    }

    result.country = country.value;

    result.curriculum_id = Number(curriculum_id.value);

    if (register_objectCount(result) === 17) {
      var JSON_file = JSON.stringify(result);

      exec_c('register_user', 'data='+JSON_file);
      $("#register_input_container").hide();
      $("#register_method_buttons").show();
    }
  }

  function register_objectCount(obj) {
    if (obj.__count__ !== undefined) {
        return obj.__count__;
    }
    if (Object.keys) {
        return Object.keys(obj).length;
    }
    var c = 0, p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            c += 1;
        }
    }
    return c;
  }

  function register_csvProcess(csv_file, data) {
    var reader = new FileReader()
    reader.onload = function() {
      var lines = reader.result.split('\n');
      var email = [], access_level = [], first_name = [], last_name = [], father_name = [], phone = [], phone2 = [], address = [], post_code = [], date_of_registration = [], semester_enter = [], enrollment = [], first_degree = [], gender = [], birth_date = [], country = [], curriculum_id = [];
      var result = {};
      var currentline;
      var enrollment_found = false, curriculum_found = false;

      for (i = 0; i < lines.length; i++) {
        currentline = register_csv2array(lines[i]);
        if (currentline[0] === 'email' || currentline.length === 0) continue;
        if (currentline.length !== 17) {
          $("#register_file_error").text("Μη έγκυρο αρχείο.");
          $("#register_file_error").show();
          return;
        }
        for (j = 0; j < currentline.length; j++){
          if (currentline[j] === '' && j === 5){
            $("#register_file_error").text("Μη έγκυρο αρχείο.");
            $("#register_file_error").show();
            return;
          }
        }
        email.push(currentline[0]);
        if (Number(currentline[1]) === 1 || Number(currentline[1]) === 2 || Number(currentline[1]) === 3){
          access_level.push(Number(currentline[1]));
        } else if (currentline[1] === 'ΦΟΙΤΗΤΗΣ') {
          access_level.push(1);
        } else if (currentline[1] === 'ΚΑΘΗΓΗΤΗΣ') {
          access_level.push(2);
        } else if (currentline[1] === 'ΓΡΑΜΜΑΤΕΙΑ') {
          access_level.push(3);
        } else {
          $("#register_file_error").text("Μη έγκυρο αρχείο.");
          $("#register_file_error").show();
          return;
        }
        first_name.push(currentline[2]);
        last_name.push(currentline[3]);
        father_name.push(currentline[4]);
        if (isNaN(Number(currentline[5])) || isNaN(Number(currentline[6])) || isNaN(Number(currentline[8])) || isNaN(Number(currentline[10]))) {
          $("#register_file_error").text("Μη έγκυρο αρχείο.");
          $("#register_file_error").show();
          return;
        } else {
          phone.push(Number(currentline[5]));
          phone2.push(Number(currentline[6]));
          post_code.push(Number(currentline[8]));
          semester_enter.push(Number(currentline[10]));
        }
        address.push(currentline[7]);
        date_of_registration.push(currentline[9]);
        for (j in data["enrollment_ids"]) {
          if (Number(currentline[11]) === data.enrollment_ids[j]) {
            enrollment.push(Number(currentline[11]));
            enrollment_found = true;
          } else if (currentline[11] === data.enrollment_name[j]) {
            enrollment.push(data.enrollment_ids[j]);
            enrollment_found = true;
          }
        }
        if (!enrollment_found){
          $("#register_file_error").text("Μη έγκυρο αρχείο.");
          $("#register_file_error").show();
          return;
        }
        first_degree.push(Number(currentline[12]));
        if (Number(currentline[13]) === 0 || Number(currentline[13]) === 1){
          gender.push(Number(currentline[13]));
        } else if (currentline[13] === 'Γυναίκα') {
          gender.push(0);
        } else if (currentline[13] === 'Άνδρας') {
          gender.push(1);
        } else {
          $("#register_file_error").text("Μη έγκυρο αρχείο.");
          $("#register_file_error").show();
          return;
        }
        birth_date.push(currentline[14]);
        country.push(currentline[15]);
        for (j in data["curriculum_ids"]) {
          if (Number(currentline[16]) === data.curriculum_ids[j]) {
            curriculum_id.push(Number(currentline[11]));
            curriculum_found = true;
          } else if (currentline[16] === data.curriculum_name[j]) {
            curriculum_id.push(data.curriculum_ids[j]);
            curriculum_found = true;
          }
        }
        if (!curriculum_found){
          $("#register_file_error").text("Μη έγκυρο αρχείο.");
          $("#register_file_error").show();
          return;
        }
      }
      $("#register_file_error").hide();
      result = {"email":email, "access_level":access_level, "first_name":first_name, "last_name":last_name, "father_name":father_name, "phone":phone, "phone2":phone2, "address":address, "post_code":post_code,"date_of_registration":date_of_registration, "semester_enter":semester_enter, "enrollment":enrollment, "first_degree":first_degree, "gender":gender, "birth_date":birth_date, "country":country, "curriculum_id":curriculum_id}

      var JSON_file = JSON.stringify(result);
      exec_c('register_user', 'data='+JSON_file);
    }
    reader.readAsText(csv_file[0].files[0]);
  }

  function register_csv2array(text) {
     var re_valid =  /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
     var re_value =  /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    if (!re_valid.test(text)) return null;
    var a = [];
    text.replace(re_value,
        function(m0, m1, m2, m3) {
          if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
          else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
          else if (m3 !== undefined) a.push(m3);
          return '';
        });
    if (/,\s*$/.test(text)) a.push('');
    return a;
  }
  
  		 		// ****  REGISTER **** //

				
  		 		// ****  NEW_CHOOSE_SECTOR **** //

function choose_sector_json() {

    document.title = "Δήλωση Κατεύθυνσης";

			var res = '<div class="choose_sector_frame"><h2 class="choose_sector_header">Δήλωση Κατευθύνσεων</h2><div>  Έναρξη δηλώσεων:  <input class="choose_sector_select" type="date" name="choose_sector_start" id="choose_sector_start"></div><br><div>  Λήξη δηλώσεων:  <input class="choose_sector_select" type="date" name="choose_sector_end" id="choose_sector_end"></div><br><div>Εξάμηνο ανακοίνωσης: <select class="choose_sector_select" id="choose_sector_semester1">  <option value="1">1o Εξάμηνο</option>  <option value="2">2o Εξάμηνο</option>  <option value="3">3o Εξάμηνο</option>  <option value="4">4o Εξάμηνο</option>  <option value="5">5o Εξάμηνο</option>  <option value="6">6o Εξάμηνο</option>  <option value="7">7o Εξάμηνο</option>  <option value="8">8o Εξάμηνο</option>  <option value="9">9o Εξάμηνο</option>  <option value="10">10o Εξάμηνο</option>  <option value="11">11o Εξάμηνο</option>  <option value="12">12o Εξάμηνο</option></select> </div><br><div>Εξάμηνο κατεύθυνσης: <select class="choose_sector_select"id="choose_sector_semester2">  <option value="1">1o Εξάμηνο</option>  <option value="2">2o Εξάμηνο</option>  <option value="3">3o Εξάμηνο</option>  <option value="4">4o Εξάμηνο</option>  <option value="5">5o Εξάμηνο</option>  <option value="6">6o Εξάμηνο</option>  <option value="7">7o Εξάμηνο</option>  <option value="8">8o Εξάμηνο</option>  <option value="9">9o Εξάμηνο</option>  <option value="10">10o Εξάμηνο</option>  <option value="11">11o Εξάμηνο</option>  <option value="12">12o Εξάμηνο</option></select> </div><br> <button class="choose_sector_button"type="button" onclick="choose_sector_send()">Αποστολή</button>  </div>';
	
	document.getElementById('results').innerHTML = res;
				
				
}

				
				function choose_sector_send() {
				
				
var choose_sector_start = document.getElementById("choose_sector_start").value; 
var choose_sector_end = document.getElementById("choose_sector_end").value; 
var choose_sector_semester1 = document.getElementById("choose_sector_semester1").value; 
var choose_sector_semester2 = document.getElementById("choose_sector_semester2").value; 

var param = "choose_sector_start="+choose_sector_start+"&choose_sector_end="+choose_sector_end+"&choose_sector_semester1="+choose_sector_semester1+"&choose_sector_semester2="+choose_sector_semester2;

exec_c("choose_sector_sub", param);
}


  		 		// ****  NEW_CHOOSE_SECTOR **** //

				 // ****  NEW_CHOOSE_COURSE **** //

				
				function choose_course_json() {
					
					 document.title = "Δήλωση Μαθημάτων";

			var res = '<div class="task2Container">  <form>  <fieldset>  <legend>Δήλωση Εξαμήνου</legend>  <br> <span class="task2Underline"> Τιτλος Εξαμήνου: </span><input class="task2Input" type="text" name="semesterName" placeholder="Εξάμηνο,Έτος" required><br><br> <span class="task2Underline">Αρχή Περιόδου Δήλωσης Μαθημάτων:</span><input class="task2Input" type="date" name="startStatementPeriodDate"><br><br> <span class="task2Underline">Τέλος Περιόδου Δηλώσεων:</span><input class="task2Input" type="date" name="endStatementPeriodDate"><br><br> <span class="task2Underline">Προθεσμία Βαθμολογιών Καθηγητή:</span><input class="task2Input" type="date" name="professorsDeadline"><br><br></fieldset><fieldset> <legend>Επιλογές για τους επι πτυχίο φοιτητές.</legend> <br>  <span class="task2Underline">Εξάμηνο μετά απο το οποιο θεωρείται επι πτυχίο φοιτητής</span><input class="task2Input" list="semesterCount" name="semesterGraduate">  <datalist id="semesterCount">    <option value="1">    <option value="2">	<option value="3">    <option value="4">    <option value="5">    <option value="6">    <option value="7">    <option value="8">    <option value="9">    <option value="10">    <option value="11">    <option value="12">    <option value="13">    <option value="14">    <option value="15">	<option value="16">    <option value="17">    <option value="18">    <option value="19">    <option value="20">  </datalist>   <br>  <br>  <span class="task2Underline"> Περιορισμός Εξαμήνου:</span>  <span class="task2radio" id="task2Limitation">    <input class="task2Input task2InputRadio" type="radio" name="semesterLimitation" value="0">Ναι<br>    <input class="task2Input task2InputRadio" type="radio" name="semesterLimitation" value="1" checked>Όχι<br>	</span>  <br>  <br>  <br>  <span class="task2Underline"> Δήλωση Εξαμήνου:</span>  <span class="task2radio" id="task2SemType">  <input class="task2Input task2InputRadio" type="radio" name="semesterTypeAllowed"  value="0">Κανονική<br>  <input class="task2Input task2InputRadio" id="semtype" type="radio" name="semesterTypeAllowed" value="1" checked>Εαρινό και χειμερινό<br>  </span></fieldset><input id="task2submit" type="submit" onclick="task2FormToJson(event);" name="semesterSubmit" value="Υποβολή">  </form>  </div>';
	
	document.getElementById('results').innerHTML = res;

	
	var width1=document.getElementById("task2SemType").offsetWidth;
document.getElementById("task2Limitation").style.width=width1+"px";

					
				}
				
				function task2FormToJson(e){
   e.preventDefault();

var value=[];
var inputs=document.getElementsByTagName("input");

for (i=0;i<5;i++){

value.push(inputs[i].value);


}

//first question with radio opt
var radio1=task2inputcheck(inputs[5],inputs[6]);
value.push(radio1.value);

//second q
var radio2=task2inputcheck(inputs[7],inputs[8]);
value.push(radio2.value);

for(i=0;i<value.length;i++){

if(value[i]=="")
value[i]=null;

}

json={semesterName:"",
   startStatementPeriodDate:"",
   endStatementPeriodDate:"",
   professorsDeadline:"",
   semesterGraduate:"", 
   semesterLimitation:"", 
   semesterTypeAllowed:""};
   
   var k=0;
   for (j in json){
   
   json[j]=value[k];
   k++;
   
   }
   
json=JSON.stringify(json);   
alert("data="+json);
exec("choose_course_sub", "data="+json);

}

function task2inputcheck(input1,input2){

if (input1.checked){
return input1;
}else{
return input2;
}

}


				 // ****  NEW_CHOOSE_COURSE **** //

				 
				 // ****  MY_SECTOR **** //
				 
				 function sector_json(data) {

				     document.title = "Δήλωση Κατεύθυνσης";

			var res = '<div class="myBox"><h2>Επιλογή Κατεύθυνσης</h2><div id="sector_cont"></div> <br> <button type="button" class="sector_button" onclick="sector_send()">Αποστολή</button> </div>';
	
	document.getElementById('results').innerHTML = res;

var built = "";
for (var i in data.ids) {

built += '<div class="sector_font"><label class="container"><input type="radio" name="sector_radio" value="sector_id='+data.ids[i]+'&choose_sector='+data.choose_sector+'"> <span id="sector_radio_'+i+'" class="checkmark"></span></label></div>';


}
document.getElementById("sector_cont").innerHTML = built;

for (var i in data.ids) {
document.getElementById('sector_radio_'+i).textContent = data.name[i];


}


}


function sector_send() {
var param = null;
var radios = document.getElementsByName('sector_radio');

for (var i = 0, length = radios.length; i < length; i++)
{
 if (radios[i].checked)
 {
  // do whatever you want with the checked radio
  param = radios[i].value;

  // only one radio can be logically checked, don't check the rest
  break;
 }
}
if (param != null) {
exec_c("my_sector_sub", param);
}
else {
alert('Διάλεξε κατεύθυνση');
}

}
				 
				 // ****  MY_SECTOR **** //
				 
				 // ****  MY_COURSE **** //
				 
				 
				   function statement_init(data) {
    document.title = "Δήλωση μαθημάτων";
			var res = '<div class="statement_container" id="statement_container">  <div class="statement_semesters" id="statement_semesters"></div>  <div class="statement_buttons" id="statement_buttons">    <span class="statement_button" id="statement_submit" onclick="statement_submit()">Υποβολή</span>  </div></div>';
	
	document.getElementById('results').innerHTML = res;

    var i, k, limit;
    var includedBlocks = [];
    var includedTypes = [];
    var maxSem = data["Available "][2][0];
    var minSem = maxSem;
    var subjTypeMap = ["Υποχρεωτικά", "Υποχρεωτικά με αλυσίδα", "Υποχρεωτικά επιλογής", "Υποχρεωτικά επιλογής με αλυσίδα", "Ελεύθερης επιλογής", "Ελεύθερης επιλογής με αλυσίδα", "Πτυχιακή"];

    for (i in data["Available "][2]) {
      if (data["Available "][2][i] > maxSem)
        maxSem = data["Available "][2][i];
      else if (data["Available "][2][i] < minSem)
        minSem = data["Available "][2][i];
    }

    for (i in data["Unavailable "][2]) {
      if (data["Unavailable "][2][i] > maxSem)
        maxSem = data["Unavailable "][2][i];
      else if (data["Unavailable "][2][i] < minSem)
        minSem = data["Unavailable "][2][i];
    }

    for (i = minSem; i <= maxSem; i++ ) {
      if (data["Available "][2].includes(i)) {
        document.getElementById("statement_semesters").innerHTML += '<div class="statement_title" id="statement_title'+i+'"><span class="statement_title_text">Εξάμηνο '+i+'</span></div>';
      } else if (data["Unavailable "][2].includes(i)) {
        document.getElementById("statement_semesters").innerHTML += '<div class="statement_title" id="statement_title'+i+'"><span class="statement_title_text">Εξάμηνο '+i+'</span></div>';
      }
    }

    var lastType = data["Available "][4][0];
    for (k = 0; k < data["Available "][0].length; k++) {
      if (lastType !== data["Available "][4][k]) {
        includedBlocks = [];
      }
      if (data["Available "][4][k] === 0 || data["Available "][4][k] === 1){
        if (!(includedBlocks.includes(data["Available "][5][k]))) {
          document.getElementById("statement_title"+data["Available "][2][k]).innerHTML += '<div class="statement_subtitle" id="statement_subtitle'+data["Available "][2][k]+data["Available "][4][k]+'"><span class="statement_subtitle_text">'+subjTypeMap[data["Available "][4][k]]+'</span><div class="statement_block" id="statement_block'+data["Available "][2][k]+data["Available "][4][k]+data["Available "][5][k]+'"></div></div>';
          includedBlocks.push(data["Available "][5][k]);
        }
      } else {
        if (!(includedBlocks.includes(data["Available "][5][k]))) {
          document.getElementById("statement_title"+data["Available "][2][k]).innerHTML += '<div class="statement_subtitle" id="statement_subtitle'+data["Available "][2][k]+data["Available "][4][k]+'"><span class="statement_subtitle_text">'+subjTypeMap[data["Available "][4][k]]+'</span><span class="statement_subtitle_text">Επιλέξτε '+data["Available "][3][k]+'</span><div class="statement_block" id="statement_block'+data["Available "][2][k]+data["Available "][4][k]+data["Available "][5][k]+'"></div></div>';
          includedBlocks.push(data["Available "][5][k]);
        }
      }
      lastType = data["Available "][4][k];
    }

    var lastSem = -1;
    for (k = 0; k < data["Unavailable "][0].length; k++) {
      if (lastSem === data["Available "][2][k]) {
        continue;
      } else {
        document.getElementById("statement_title"+data["Unavailable "][2][k]).innerHTML += '<div class="statement_subtitle"><span class="statement_subtitle_text">Μη διαθέσιμα μαθήματα</span><div class="statement_block" id="statement_block_un'+data["Unavailable "][2][k]+'"></div></div>';
      }
      lastSem = data["Unavailable "][2][k];
    }

    for (k = 0; k < data["Available "][0].length; k++) {
      if (data["Available "][4][k] === 0 || data["Available "][4][k] === 1) {
        document.getElementById("statement_block"+data["Available "][2][k]+data["Available "][4][k]+data["Available "][5][k]).innerHTML += '<input type="checkbox" value="'+data["Available "][0][k]+','+data["Available "][5][k]+'"><span class="statement_subject">'+data["Available "][0][k]+' ('+ data["Available "][1][k]+')</span><br>';
      } else {
        document.getElementById("statement_block"+data["Available "][2][k]+data["Available "][4][k]+data["Available "][5][k]).innerHTML += '<input class="statement_limit'+data["Available "][3][k]+data["Available "][5][k]+'" type="checkbox" value="'+data["Available "][0][k]+','+data["Available "][5][k]+'"><span class="statement_subject">'+data["Available "][0][k]+' ('+ data["Available "][1][k]+')</span><br>';

        limit = data["Available "][3][k];
        statement_checkboxDisable(limit, data["Available "][5][k]);
      }
    }

    for (k = 0; k < data["Unavailable "][0].length; k++) {
      document.getElementById("statement_block_un"+data["Unavailable "][2][k]).innerHTML += '<input type="checkbox" disabled><span class="statement_subject statement_unavailable">'+data["Unavailable "][0][k]+' ('+ data["Unavailable "][1][k]+')</span><br>';
    }
  }

  function statement_checkboxDisable(limit, block) {
    $("input.statement_limit"+limit+block).on('change', function(e) {
      if($(this).siblings(':checked').length >= limit) {
        this.checked = false;
      }
    });
  }

  function statement_submit() {
    var checkValues = [];
    var names = [];
    var blocks = [];
    var arr = [];

    $.each($("input[type='checkbox']:checked"), function(){
      checkValues.push($(this).val());
    });


    for (var i = 0; i < checkValues.length; i++) {
      arr = checkValues[i].split(',');
      names.push(arr[0]);
      blocks.push(Number(arr[1]));
    }

    var result = {name: names, block_id: blocks};

    var JSON_file = JSON.stringify(result);
    exec_c('my_course_sub', JSON_file);
  }
  
 				 // ****  MY_COURSE **** //

				 // ****  COURSE **** //

				 
				 
function courses_json(data) {
	    document.title = "Μαθήματα";
			var res = '<table id="courses_customers">    <tr>      <th>Μάθημα</th>      <th>Διδακτικές Μονάδες</th>     <th>ECTS</th>    </tr>  </table>';
	
	document.getElementById('results').innerHTML = res;

	   
var i;
for (i in data.ids) {

var ids = data.ids[i];
var name = data.name[i];
var credits = data.credits[i];
var ects = data.ects[i];

    var myTable_rest_rows='<tr class="back_color">  <td id="courses_lesson'+i+'" class="courses_lesson" onclick="post_data(\'course_info\', \'t_id='+ids+'\')" ></td>    <td id="courses_dm'+i+'" class="courses_dm" ></td>   <td id="courses_ects'+i+'" class="courses_ects" ></td>  </tr>';

  document.getElementById("courses_customers").innerHTML += myTable_rest_rows;


document.getElementById("courses_lesson"+i).textContent = name;
document.getElementById("courses_dm"+i).textContent = credits;
document.getElementById("courses_ects"+i).textContent = ects;

}
}

				   // ****  COURSE **** //

				   // ****  COURSE_INFO **** //

				     function temp_page_init(data) {
    document.title = data["course_name"];

			var res = '<div class="temp_page_container" id="temp_page_container">  <div class="temp_page_title" id="temp_page_subj">Τιτλος μαθήματος: </div>  <div class="temp_page_disabled" id="temp_page_disabled">Το μάθημα είναι ανενεργό</div>  <div class="temp_page_info_container" id="temp_page_info_container">    <div class="temp_page_info" id="temp_page_curric"></div>    <div class="temp_page_info" id="temp_page_prof">Καθηγητής: </div>    <div class="temp_page_info" id="temp_page_sess">Εξάμηνο: </div>    <div class="temp_page_info" id="temp_page_lab">Εργαστήριο: </div>    <div class="temp_page_info" id="temp_page_dm">Διδακτικές Μονάδες: </div>    <div class="temp_page_info" id="temp_page_ects">ECTS: </div>    <div class="temp_page_info">Περιγραφή: </div>    <div class="temp_page_info_dscr" id="temp_page_dscr"></div>  </div>  <div class="temp_page_buttons" id="temp_page_buttons">    <div class="temp_page_deadline" id="temp_page_deadline">      Προθεσμία υποβολής βαθμολογιών:    </div>    <div id="temp_page_upload_wrapper">      <label for="temp_page_uploadedCSV" class="temp_page_btn_label">Βαθμολογία</label>      <input type="file" name="myfile" id="temp_page_uploadedCSV">    </div>  </div>  <span class="temp_page_popup_bg" id="temp_page_popup_bg"></span>  <div class="temp_page_popup" id="temp_page_popup">    <div class="temp_page_popup_heading">      <div class="temp_page_popup_heading_info" id="temp_page_popup_subj">Τίτλος Μαθήματος: </div>      <div class="temp_page_popup_heading_info" id="temp_page_popup_exam">Εξεταστική περίοδος: </div>    </div>    <div id="temp_page_popup_table"></div>    <div class="temp_page_popup_button_container">      <span class="temp_page_popup_button_text">Θέλετε να ανεβάσετε αυτό το αρχείο βαθμολογιών;</span>      <span class="temp_page_popup_button" id="temp_page_popup_button_submit">Ναί</span>      <span class="temp_page_popup_button" id="temp_page_popup_button_cancel">Όχι</span>    </div>  </div></div>';
	
	document.getElementById('results').innerHTML = res;
	
	
    $("#temp_page_popup").hide();
    $("#temp_page_popup_bg").hide();
    $("#temp_page_disabled").hide();

    var session_map = ["Χειμερινό", "Εαρινό"];
    var months = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαϊου", "Απριλίου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"];
    var days = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"];

    var timestampUntil = data["statement_until"];
    var timeUntil = new Date();
    timeUntil.setTime(timestampUntil*1000);

    var timeNow = new Date()
    timeNow.setTime(Date.now());

    var deadline = days[timeUntil.getDay()]+" "+timeUntil.getDate()+" "+months[timeUntil.getMonth()+1]+" "+timeUntil.getFullYear();
    document.getElementById("temp_page_deadline").textContent += deadline;

    if (timestampUntil < Math.floor(Date.now() / 1000)) {
      $("#temp_page_buttons").hide();
    }

    if (data["disable"] == 1){
      $(".temp_page_info").addClass("temp_page_info_disabled");
      $("#temp_page_buttons").hide();
      $("#temp_page_disabled").show();
    }
    if (data["statement_name"] === '' || data["statement_until"] === '') {
      $("#temp_page_buttons").hide();
    }

    document.getElementById("temp_page_subj").textContent += data["course_name"];
    document.getElementById("temp_page_curric").textContent += data["curriculum"];
    document.getElementById("temp_page_prof").textContent += data["teacher"];
    document.getElementById("temp_page_sess").textContent += session_map[data["session"]];
    if (data["lab"] == 1) document.getElementById("temp_page_lab").innerHTML += "&#x2714;";
    else if (data["lab"] == 0) document.getElementById("temp_page_lab").innerHTML += "&#x2718;";

    document.getElementById("temp_page_dm").textContent += data["credits"];
    document.getElementById("temp_page_ects").textContent += data["ects"];
    document.getElementById("temp_page_dscr").textContent += data["dscr"];

    document.getElementById("temp_page_popup_subj").textContent += data["course_name"];
    document.getElementById("temp_page_popup_exam").textContent += data["statement_name"];

    var $wrapper = $("#temp_page_upload_wrapper");
    var $file = $("#temp_page_upload_wrapper #temp_page_uploadedCSV");

    function FileChange() {
      temp_page_csvProcess($(this), data["id"], data[0]["statement_id"]);
      $(this).remove();
      $("<input type='file' name='myfile' id='temp_page_uploadedCSV'>").change(FileChange).appendTo($wrapper);
    }
    $file.change(FileChange);
  }


  function temp_page_csvProcess(csv_file, id, statement_id) {
    var reader = new FileReader()
    reader.onload = function() {
      var lines = reader.result.split('\n');
      var aem = [];
      var grades = [];
      var result = {};
      var multiplier = 1;
      var tablePopup = '<table class="temp_page_popup_table">\
        <tr>\
          <th>Αριθμός Μητρώου</th>\
          <th>Ονοματεπώνυμο</th>\
          <th>Βαθμός</th>\
        </tr>';

      for (var i = 1; i < lines.length - 1; i++) {
        var currentline = temp_page_csv2array(lines[i])//.split(',');
        tablePopup += '<tr><td id="temp_page_aem'+i+'"></td><td id="temp_page_name'+i+'"></td><td id="temp_page_grade'+i+'"></td></tr>';
        if (currentline[2] > 10) {
          multiplier = 10;
        }
      }
      tablePopup += '</table>';
      document.getElementById("temp_page_popup_table").innerHTML = tablePopup;
      $("#temp_page_popup").show();
      $("#temp_page_popup_bg").show();

      for (i = 1; i < lines.length - 1; i++) {
        currentline = temp_page_csv2array(lines[i])//.split(',');
        document.getElementById("temp_page_aem"+i).textContent = currentline[0];
        document.getElementById("temp_page_name"+i).textContent = currentline[1];
        document.getElementById("temp_page_grade"+i).textContent = currentline[2];
        if (isNaN(Number(currentline[0])) || isNaN(Number(currentline[2]))) continue;
        aem.push(currentline[0]);
        if (multiplier === 1) grades.push(Number(currentline[2]).toFixed(2));
        else if (multiplier === 10) grades.push(currentline[2]);
        result = {"id": id, "statement_id": statement_id, "aem": aem, "grade": grades};
      }

      $("#temp_page_popup_button_cancel").click(function() {
        $("#temp_page_popup").hide();
        $("#temp_page_popup_bg").hide();
      });

      $("#temp_page_popup_button_submit").click(function() {
        $("#temp_page_popup").hide();
        $("#temp_page_popup_bg").hide();
        var JSON_file = JSON.stringify(result);
        console.log(JSON_file);
        exec_c('insert_grades', JSON_file);
      });
    }
    reader.readAsText(csv_file[0].files[0]);
  }

  function temp_page_csv2array(text) {
     var re_valid =  /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
     var re_value =  /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    if (!re_valid.test(text)) return null;
    var a = [];
    text.replace(re_value,
        function(m0, m1, m2, m3) {
          if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
          else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
          else if (m3 !== undefined) a.push(m3);
          return '';
        });
    if (/,\s*$/.test(text)) a.push('');
    return a;
  };
  
  				   // ****  COURSE_INFO **** //

				   
				    // ****  USERS **** //

					function users_json(data) {
			document.title = 'Φοιτητές';

			var res = '    <input type="text" class="inputhing" id="searchTxt" onkeyup="search()" name="search" placeholder="Search..">           <select id="semester_sel" onchange="search()"></select>     	    <select id="year_sel" onchange="search()"></select>     	    <select id="wayin_sel" onchange="search()"></select>    	        <table id="students_info" class="students_info">      <tr>        <th>Όνομα</th>        <th>ΑΕΜ</th>        <th>Εξάμηνο</th>        <th>Έτος</th>        <th style="padding:12px;">Τρόπος Εισαγωγής</th>      </tr>    </table>';
	
	document.getElementById('results').innerHTML = res;
	
						
var i;
var semester_select = document.getElementById("semester_sel");
var opt_sem = document.createElement("OPTION");
var year_select = document.getElementById("year_sel");
var opt_year = document.createElement("OPTION");
var wayin_select = document.getElementById("wayin_sel");
var opt_wayin = document.createElement("OPTION");
semester_select.appendChild(opt_sem);
year_select.appendChild(opt_year);
wayin_select.appendChild(opt_wayin);

for (i in data.ids) {

var ids = data.ids[i];
var name = data.name[i];
var aem = data.aem[i];
var semester = data.semester[i];
var year = data.year[i];
var in_name = data.in_name[i];

    var myTable_rest_rows='<tr  class="back_color"> <td id="name'+i+'"> </td>   <td id="aem'+i+'"></td> <td id="semester'+i+'"> </td>  <td id="year'+i+'"> </td>  <td id="in_name'+i+'"> </td></tr>';

  document.getElementById("students_info").innerHTML += myTable_rest_rows;


document.getElementById("name"+i).textContent = name;
document.getElementById("aem"+i).textContent = aem;
document.getElementById("semester"+i).textContent = semester;
document.getElementById("year"+i).textContent = year;
document.getElementById("in_name"+i).textContent = in_name;

var semester_select = document.getElementById("semester_sel");
var opt_sem = document.createElement("OPTION");
opt_sem.textContent = semester;
opt_sem.value = semester;
semester_select.appendChild(opt_sem);

var year_select = document.getElementById("year_sel");
var opt_year = document.createElement("OPTION");
opt_year.textContent = year;
opt_year.value = year;
year_select.appendChild(opt_year);

var wayin_select = document.getElementById("wayin_sel");
var opt_wayin = document.createElement("OPTION");
opt_wayin.textContent = in_name;
opt_wayin.value = in_name;
wayin_select.appendChild(opt_wayin);


}
}


function search(){
	var i, sem, year, wayin, td, txtValue;
  var input = document.getElementById("searchTxt");
  var filter = input.value.toUpperCase();
	var sem_sel = document.getElementById("semester_sel");
	var input1 = sem_sel.options[sem_sel.selectedIndex].textContent;
	var year_sel = document.getElementById("year_sel");
	var input2= year_sel.options[year_sel.selectedIndex].textContent;
	var wayin_sel = document.getElementById("wayin_sel");
	var input3 = wayin_sel.options[wayin_sel.selectedIndex].textContent;

	//console.log(input);
	var table = document.getElementById("students_info");
	var tr = table.getElementsByTagName("tr");
	
	for (i=1;i<tr.length;i++){
		td = tr[i].getElementsByTagName("td")[0].textContent || tr[i].getElementsByTagName("td")[0].innerText;
		sem=tr[i].getElementsByTagName("td")[2].textContent || tr[i].getElementsByTagName("td")[2].innerText;
		year=tr[i].getElementsByTagName("td")[3].textContent || tr[i].getElementsByTagName("td")[3].innerText;
		wayin=tr[i].getElementsByTagName("td")[4].textContent || tr[i].getElementsByTagName("td")[4].innerText;
		//console.log(wayin);
		if(td){
      txtValue = td.toUpperCase();
			
  		if(sem.indexOf(input1) > -1 && year.indexOf(input2) > -1 && wayin.indexOf(input3) > -1 && txtValue.indexOf(filter) > -1){
  				
  			tr[i].style.display="";
  			  		
 		
      } else {
      	tr[i].style.display="none";
         			
      }
  	}
  }
}
	


					
					// ****  USERS **** //
