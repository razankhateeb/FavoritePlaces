const API_KEY = "AIzaSyASbl52_AfOYT1Km68H2P1fAdYeZv8O7AY";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}
    &key=${API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error - failed to fetch Address`);
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
