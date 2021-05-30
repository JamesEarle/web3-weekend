var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic dWNkazAyYzYteHdnaS1uYjcxOmVqMm0tbmRlMG52M3pibnAx");
myHeaders.append("Content-Type", "text/plain");

var raw = "{\r\n    \"variant_ids\" : [11633],\r\n    \"format\": \"jpg\",\r\n    \"files\" : [\r\n        {\r\n            \"placement\": \"front\",\r\n            \"image_url\": \"https://lh3.googleusercontent.com/gigFzS5il1W8Q9vgQ3V5h9Jfk5h9GVwQ9QYU6zcx2Sy8J8MLfysdRTEfx7CUS-NTrgMjDpsPusNUxpMuHu_dITmwg-dGVUfkaE4s\",\r\n            \"position\": {\r\n                \"area_width\": 520,\r\n                \"area_height\": 202,\r\n                \"width\": 140,\r\n                \"height\": 63,\r\n                \"top\": 77,\r\n                \"left\": 43\r\n            }\r\n        }\r\n    ]\r\n}";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.printful.com/mockup-generator/create-task/442", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
