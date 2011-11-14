<!doctype html>
<!--[if IE 7]><html class="no-js ie7" lang="en"><![endif]-->
<!--[if IE 8]><html class="no-js ie8" lang="en"><![endif]-->
<!--[if IE 9]><html class="no-js ie9" lang="en"><![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>	
    <title><?= (basename($_SERVER['PHP_SELF']) === 'index.php') ? 'Welcome' : ucwords(str_replace(array('.php', '-'), array('', ' '), basename($_SERVER['PHP_SELF']))); ?> | Site Name</title>
    <script src="Assets/Scripts/modernizr.min.js"></script>
    <meta charset="utf-8">
    <meta name="author" content="sirBrad" />
    <link type="text/plain" rel="author" href="humans.txt">
    <link rel="stylesheet" href="Assets/Styles/structure.css" />
    <link rel="stylesheet" href="Assets/Styles/cycle.css" />
    <!--[if IE]>
    	<link rel="stylesheet" href="Assets/Styles/IE.css" />
    <![endif]-->
</head>
<?php flush(); ?>
<body>	
	<div class="contain">
    	<ul id="cycle">
        	<li>
            	<div style="background-color:red;"></div>
            </li>
        	<li>
            	<div style="background-color:blue;"></div>
            </li>
        	<li>
            	<div style="background-color:grey;"></div>
            </li>
        	<li>
            	<div style="background-color:pink;"></div>
            </li>
        	<li>
            	<div style="background-color:green;"></div>
            </li>
        	<li>
            	<div style="background-color:red;"></div>
            </li>
        	<li>
            	<div style="background-color:blue;"></div>
            </li>
        	<li>
            	<div style="background-color:grey;"></div>
            </li>
        	<li>
            	<div style="background-color:pink;"></div>
            </li>
        	<li>
            	<div style="background-color:green;"></div>
            </li>
        </ul>
    </div>
    <script src="Assets/Scripts/jquery.min.js"></script>
    <script src="Assets/Scripts/cycle.js"></script>
</body>
</html>