<?php 
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];

	$to = 'aleague888@gmail.com';
	$subject = 'Message from Portfolio';
	$msg = "Message from portfolio site \n . "==========" . $message";

	mail($to, $subject, $msg, 'From' . $email);
 ?>