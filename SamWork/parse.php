<?php
if (file_exists('file.xml')) {
    $xmlstr = simplexml_load_file('file.xml');
 
    print_r($xmstrl);
} else {
    exit('Failed to open test.xml.');
}


?>
