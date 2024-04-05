function downloadimage() {
  var container = document.getElementById("doc2");

  html2canvas(container, {scrollY: -window.scrollY}, {useCORS:true}).then(function(canvas) {
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "resme.png";
      link.href = canvas.toDataURL();
      link.target = '_blank';
      link.click();
  });
}

function preview_image(event) {
  var reader = new FileReader();
  reader.onload = function() {
      var output = document.getElementById('pic');
      output.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

function showPopup() {
  document.getElementById("popup").style.display = "block";
}

// Function to close the popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.cookie = "popupShown=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

// Check if the popup has been shown before
function checkPopupCookie() {
  var popupShown = document.cookie.replace(/(?:(?:^|.*;\s*)popupShown\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  if (popupShown !== "true") {
      showPopup();
  }
}

window.onload = checkPopupCookie;
