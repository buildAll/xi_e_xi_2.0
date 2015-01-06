<?php
require_once 'database.php';

header("content-type:text/html;charset=utf8");

$ak = "6xwkGTSHyYoo2KjuWQGupuvM";
$pagesize = 20;
$pagenum = 0;//$argv[1];
$query_text = "Ï´ÒÂ";
$query = urlencode($query_text);
$region = urlencode("ÄÏ¾©");

$url = sprintf("http://api.map.baidu.com/place/v2/search?ak=%s&output=json&query=%s&page_size=%d&page_num=%d&scope=2&region=%s",
		$ak,
		$query,
		$pagesize,
		$pagenum,
		$region);

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

$data = curl_exec($curl);
curl_close($curl);

$data_json = json_decode($data, true);

$status = $data_json["status"];
$message = $data_json["message"];
$total = $data_json["total"];
$results = $data_json["results"];


$names = array();
$info = array();
foreach($results as $result) {
	if ( isset($result["name"]) ) {
		$info["name"] = $result["name"] ;
	} else {
		$info["name"] = "not found" ;
	}
	
	if ( isset($result["address"]) ) {
		$info["address"] = $result["address"] ;
	} else {
		$info["address"] = "not found" ;
	}
	
	if ( isset($result["telephone"]) ) {
		$info["telephone"] = $result["telephone"] ;
	} else {
		$info["telephone"] = "not found" ;
	}
	
	if ( isset($result["uid"]) ) {
		$info["uid"] = $result["uid"] ;
	} else {
		$info["uid"] = "not found" ;
	}
	$names[] = $info;
}

var_dump($names);
$mysqli->autocommit(false);
foreach($names as $name) {
	$sql = sprintf("INSERT INTO basic(name,address,telephone,uid,key) VALUES('$s','$s','$s','$s','$s')",
			$name["name"],
			$name["address"],
			$name["telephone"],
			$name["uid"],
			$query_text));
	echo $sql;
// 	$mysqli->query($sql);
}



// $mysqli->commit();
		



