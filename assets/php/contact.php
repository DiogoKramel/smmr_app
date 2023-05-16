<?php

require '../../vendor/autoload.php';

if(isset($_post['submit']))
{
	$name = $_post['name'];
	$email_id = $_post['email'];
	$subject = $_post['subject'];
	$message = $_post['message'];

	$email = new \SendGrid\Mail\Mail(); 
	$email->setFrom("diogo.kramel@gmail.com", "Diogo Kramel");
	$email->setSubject($subject);
	$email->addTo($email_id, $name);
	$email->addContent("text/plain", $message);

	$sendgrid = new \SendGrid($API_KEY);
	
	if($sendgrid->send($email));
	{
		echo "Message sent successfully";
	}
}

?>
