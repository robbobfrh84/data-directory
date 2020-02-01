let currentLanguage = "en"
let currentSite = document.querySelector('input[type=radio]:checked').value

const siteUrls = {
  production: "https://alpha.austin.gov/",
  staging: "https://janis.austintexas.io/",
  local: "localhost:3000/",
}
