
const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: 'Basic $BASE64_ENCODED_ID_AND_SECRET',
      'content-type': 'application/json'
    },
    body: JSON.stringify({grant_type: '"authorization_code"'})
  };
  
  fetch('https://api.notion.com/v1/oauth/token', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));