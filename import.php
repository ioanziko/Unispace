<html>  
      <head>  
           <title>Webslesson Tutorial</title> 
           <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
     <style>
   
   .box
   {
    width:750px;
    padding:20px;
    background-color:#fff;
    border:1px solid #ccc;
    border-radius:5px;
    margin-top:100px;
   }
  </style>
      </head>  
      <body>  
        <div class="container box">
          <h3 align="center">Import JSON File Data into Mysql Database in PHP</h3><br />
          <?php
          $connect = mysqli_connect("localhost", "uniadmin", "UNI@dm!n!", "testing"); //Connect PHP to MySQL Database
          $query = '';
          $table_data = '';
          $filename = "employee_data.json";
          $data = file_get_contents($filename); //Read the JSON file in PHP
          $array = json_decode($data, true); //Convert JSON String into PHP Array
          foreach($array as $row) //Extract the Array Values by using Foreach Loop
          {
           $query .= "INSERT INTO tbl_employee(name, gender, designation) VALUES ('".$row["name"]."', '".$row["gender"]."', '".$row["designation"]."'); ";  // Make Multiple Insert Query 
           $table_data .= '
            <tr>
       <td>'.$row["name"].'</td>
       <td>'.$row["gender"].'</td>
       <td>'.$row["designation"].'</td>
      </tr>
           '; //Data for display on Web page
          }
          if(mysqli_multi_query($connect, $query)) //Run Mutliple Insert Query
    {
     echo '<h3>Imported JSON Data</h3><br />';
     echo '
      <table class="table table-bordered">
        <tr>
         <th width="45%">Name</th>
         <th width="10%">Gender</th>
         <th width="45%">Designation</th>
        </tr>
     ';
     echo $table_data;  
     echo '</table>';
          }




          ?>
     <br />
         </div>  
      </body>  
 </html>  
