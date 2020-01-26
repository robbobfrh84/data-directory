const url = "http://joplin.herokuapp.com/api/graphql/?query="
const url_head = "http://joplin"
const url_tail = ".herokuapp.com/api/graphql/?query="
const fields = {}

const pagesRequestStructure = "{name,fields{name,type{name,kind}}}allInformationPages{edges{node{title,id}}}}"

const requests = {
  allInformationPages: '{__type(name: "InformationPageNode")' + pagesRequestStructure,
  // allInformationPages: '%7B%0A%20%20__type(name%3A%20%22InformationPageNode%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20fields%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20type%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20allInformationPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  // allInformationPages: '%7B%0A%20%20allInformationPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allServicePages: '%7B%0A%20%20allServicePages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allDepartmentPages: '%7B%0A%20%20allDepartmentPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allTopics: '%7B%0A%20%20allTopics%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allTopicCollections: '%7B%0A%20%20allTopicCollections%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allLocationPages: '%7B%0A%20%20allLocationPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allFormContainers: '%7B%0A%20%20allFormContainers%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allOfficialDocumentPages: '%7B%0A%20%20allOfficialDocumentPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  allGuidePages: '%7B%0A%20%20allGuidePages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
  pageHead: '%7B%0A%20%20',
  pageTail: '")%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%2C%0A%20%20%20%20%20%20%20%20pageType%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A'
}

function getPages(pageType) {
  const startTime = Date.now()
  const site = document.querySelector('input[type=radio]:checked').value;
  const url = url_head + site + url_tail + requests[pageType]
  graphqlUrl.innerHTML = "Graphql Url: " + url
  fetch(url)
    .then(res => res.json())
    .then(data => handlePagesResponse(data.data, startTime, pageType))
}

function getPage(pageType, id) {
  const startTime = Date.now()
  const site = document.querySelector('input[type=radio]:checked').value;
  const url = url_head + site + url_tail + requests.pageHead + pageType + '(id:"' + id + requests.pageTail
  // graphqlUrl.innerHTML = "Graphql Url: " + url
  console.log(pageType, id)
  fetch(url)
    .then(res => res.json())
    .then(data => handlePageResponse(data.data, startTime, pageType))
}

function handlePagesResponse(data, startTime, page) {
  console.log(data)
  updateInfo(data, page, startTime)
  showPages(data[page].edges, page)
  showFields(data.__type.fields)
}

function handlePageResponse(data, startTime, page) {
  console.log("data, startTime, page: ", data, startTime, page)
  console.log(data[page].edges[0].node)
  for (const key in data[page].edges[0].node) {
    console.log(key)
    const field = document.getElementById('fieldName-'+key)
    field.innerHTML = /*html*/`
       • ${key}: ${data[page].edges[0].node[key]}
    `
  }
}

function updateInfo(data, page, startTime){
  const btn = document.getElementById(page+"Btn")
  btn.innerHTML = btn.name+"("+data[page].edges.length+")"
  const endTime = Date.now()
  pagesContainer.innerHTML = /*html*/`
    <div class="titleContainer">
      <div class="title"> ${btn.name} </div>
      Delay(sec): ${(endTime-startTime) / 1000}
      &nbsp; | &nbsp;
      Total Pages: ${data[page].edges.length}
    </div>
  `
}

function showPages(pages, pageType) {
  pages.forEach(page => {
    pagesContainer.innerHTML += /*html*/`
      <div
        class='pageBtn'
        onclick="getPage('${pageType}', '${page.node.id}')"
      >${page.node.title}</div>
    `
  })
  pagesContainer.style.opacity = 1
}

function showFields(fields) {
  fieldsContainer.innerHTML = /*html*/`
    <div class="title"> Fields </div>
  `
  fields.forEach(field =>{
    fieldsContainer.innerHTML += /*html*/`
      <div id="fieldName-${field.name}"> • ${field.name}: </div>
    `
  })
}
