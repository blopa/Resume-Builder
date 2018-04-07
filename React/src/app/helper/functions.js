export function fetchData(url, f, ef) {
  fetch(url)
    .then(r => {
      if (!r.ok) {
        throw Error('Network request failed');
      }
      return r;
    })
    .then(d => d.json())
    .then(f, ef);
}

export function postData(url, data, f, ef) {
  const postObj = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  };
  fetch(url, postObj)
    .then(r => {
      if (!r.ok) {
        throw Error('Network request failed');
      }
      return r;
    })
    .then(d => d.json())
    .then(f, ef);
}

export function excerpt(string, size) {
  if (string.length <= size) {
    return string;
  }

  return `${string.substr(0, size)}...`;
}
