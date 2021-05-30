var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic dWNkazAyYzYteHdnaS1uYjcxOmVqMm0tbmRlMG52M3pibnAx");
myHeaders.append("Content-Type", "text/plain");

var raw = {
    'variant_ids' : [11633],
    'format': 'jpg',    
    'files' : [{
      'placement': 'front',
      'image_url': 'https://lh3.googleusercontent.com/gigFzS5il1W8Q9vgQ3V5h9Jfk5h9GVwQ9QYU6zcx2Sy8J8MLfysdRTEfx7CUS-NTrgMjDpsPusNUxpMuHu_dITmwg-dGVUfkaE4s',
      'position': {
        'area_width': 520,
        'area_height': 202,
        'width': 140,
        'height': 63,
        'top': 77,
        'left': 43
      }
    }
  ]
}


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
