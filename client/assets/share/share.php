<?php
  if ($_SERVER["HTTP_USER_AGENT"] != "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)") {
      redirect('http://52.33.157.27/#/blog/1/post/' . $_GET['id'], 302);
  }
  function redirect($url, $type=302) {
      if ($type == 301) header("HTTP/1.1 301 Moved Permanently");
      header("Location: $url");
      die();
  }
?>

<html>
	<head>
		<meta property="og:url"           content="http://52.33.157.27/assets/facebook/share.php?id=<?php echo $_GET['id']; ?>&amp;title=<?php echo $_GET['title']; ?>&amp;description=<?php echo $_GET['description']; ?>&amp;image=<?php echo $_GET['image']; ?>" />
		<meta property="og:type"          content="website" />
		<meta property="og:title"         content="<?php echo $_GET['title']; ?>" />
		<meta property="og:description"   content="<?php echo $_GET['description']; ?>" />
		<meta property="og:image"         content="<?php echo $_GET['image']; ?>" />
		<meta property="og:image:type" 		content="image/png" />
		<meta property="og:image:width" 	content="1260" />
		<meta property="og:image:height" 	content="660" />
		<meta property="fb:app_id"				content="960453240736059" />
	</head>
</html>
