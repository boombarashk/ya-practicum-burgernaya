export const fetchRequestJSON = (url, opts = {}) => fetch(url, opts).then(res => {
    if (!res.ok) {
      throw new Error(`Oops ${res.status}`);
    } 
    return res.json();
  }).then(data => {
    if (data.success) return data?.data ?? data
  })