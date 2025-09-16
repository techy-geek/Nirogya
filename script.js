
function getLocation() {
  const output = document.getElementById("location-message");
  const cards = document.getElementById("cards-container");

  if (!navigator.geolocation) {
    output.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  output.textContent = "Fetching your location...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    fetch(url, {
      headers: {
        "User-Agent": "NirogkaayaHealthApp/1.0"
      }
    })
      .then(response => response.json())
      .then(data => {
        const address = data.display_name;
        output.innerHTML = `Location:<br>${address}<br><br>`;
        cards.style.display = "flex";

        const city = data.address.city || data.address.town || data.address.village;
        const state = data.address.state;

        let language = null;
        if (city === "Silchar" || state === "Assam") {
          language = "bn";
        } else if (city === "Patna" || state === "Bihar") {
          language = "bh";
        } else if (city === "Patiala" || state === "Punjab") {
          language = "pa";
        }

        if (language) {
          translatePage(language);
        }
      })
      .catch(() => {
        output.textContent = "Could not fetch address.";
      });
  }

  function error() {
    output.textContent = "Permission denied or unable to retrieve location.";
  }
  
}
const images = [
"./resource/Dr1.jpg",
"./resource/Dr2.jpg",
"./resource/Dr4.jpg",
];

let currentIndex = 0;
const imgElement = document.getElementById("slideshow-img");

function showNextImage() {
currentIndex = (currentIndex + 1) % images.length;
imgElement.style.opacity = 0;
setTimeout(() => {
  imgElement.src = images[currentIndex];
  imgElement.style.opacity = 1;
}, 500); // fade-out time
}

setInterval(showNextImage, 3000); // Change image every 3 seconds

function translatePage(language) {
const translation = translations[language];
if (!translation) {
  return;
}

for (const id in translation) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = translation[id];
  }
}
}
