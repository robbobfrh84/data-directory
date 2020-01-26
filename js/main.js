const url = "http://joplin.herokuapp.com/api/graphql/?query="
const url_head = "http://joplin"
const url_tail = ".herokuapp.com/api/graphql/?query="

const requests = {
  allInformationPages: '%7B%0A%20%20__type(name%3A%20%22InformationPageNode%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20fields%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20type%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20allInformationPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  // allInformationPages: '%7B%0A%20%20allInformationPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allServicePages: '%7B%0A%20%20allServicePages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allDepartmentPages: '%7B%0A%20%20allDepartmentPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allTopics: '%7B%0A%20%20allTopics%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allTopicCollections: '%7B%0A%20%20allTopicCollections%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allLocationPages: '%7B%0A%20%20allLocationPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allFormContainers: '%7B%0A%20%20allFormContainers%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allOfficialDocumentPages: '%7B%0A%20%20allOfficialDocumentPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allGuidePages: '%7B%0A%20%20allGuidePages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A'
}

function get(page) {
  const startTime = Date.now()
  const site = document.querySelector('input[type=radio]:checked').value;
  graphqlUrl.innerHTML = "Graphql Url: "+ url_head + site + url_tail + requests[page]
  fetch(url_head + site + url_tail + requests[page])
    .then(res => res.json())
    .then(data => handleResponse(data.data, startTime, page))
}

function handleResponse(data, startTime, page) {
  console.log(data)
  updateInfo(data, page, startTime)
  showPages(data[page].edges)
  showFields(data.__type.fields)
}

function updateInfo(data, page, startTime){
  const btn = document.getElementById(page+"Btn")
  btn.innerHTML = btn.name+"("+data[page].edges.length+")"
  const endTime = Date.now()
  pagesContainer.innerHTML = `
    <div class="titleContainer">
      <div class="title"> ${btn.name} </div>
      Delay(sec): ${(endTime-startTime) / 1000}
      &nbsp; | &nbsp;
      Total Pages: ${data[page].edges.length}
    </div>
  `
}

function showPages(pages) {
  pages.forEach(page => {
    console.log("page.node.id :", page.node.id)
    pagesContainer.innerHTML += `
      <div class='pageBtn'>${page.node.title}</div>
    `
  })
  pagesContainer.style.opacity = 1
}

function showFields(fields) {
  fieldsContainer.innerHTML = `
    <div class="title"> Fields </div>
  `
  fields.forEach(field =>{
    fieldsContainer.innerHTML += `
      <div> • ${field.name} </div>
    `
  })
}
