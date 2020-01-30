function getPages(pageType) {
  const startTime = Date.now()
  const site = document.querySelector('input[type=radio]:checked').value

  let url = buildPageRequestUrl(site, pageType)
  const encoded_url = encodeQueryString(url)

  graphqlUrl.innerHTML = `Graphql Url: <a href="${encoded_url}">${encoded_url}</a>`

  fetch(url)
    .then(res => res.json())
    .then(data => handlePagesResponse(data.data, startTime, ("all" + pageType) ))
}


function getPage(pageType, id) {
  const startTime = Date.now()
  const site = document.querySelector('input[type=radio]:checked').value;

  const url = buildPagesRequestUrl(site, pageType, id)
  const encoded_url = encodeQueryString(url)

  graphqlUrl.innerHTML = `Graphql Url: <a href="${encoded_url}">${encoded_url}</a>`

  fetch(url)
    .then(res => res.json())
    .then(data => handlePageResponse(data.data, startTime, pageType))
}

componendDidMount(){
 url = 'your query string here' + "your new info from global"
 fetch(url)
   .then(res => res.json())
   .then(data => doSomethingWith2ndResponseData(data)
}


function encodeQueryString(url){
  return encodeURI(url)
}


function handlePagesResponse(data, startTime, page) {
  console.log("data :", data)
  updateInfo(data, page, startTime)
  showPages(data[page].edges, page)
  showFields(data.__type.fields)
}


function handlePageResponse(data, startTime, page) {
  console.log("data :", data)
  for (const key in data[page].edges[0].node) {
    const field = document.getElementById('fieldName-'+key)
    field.innerHTML = /*html*/`
       <none class='fieldName'> • ${key}: </none>
       <none class='fieldValue'> ${data[page].edges[0].node[key]} </none>
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
      >
        ${page.node.title}
        <span class="liveIcon">${page.node.live ? ' | Live 🟢' : ''}</span>
      </div>
    `
  })
  pagesContainer.style.opacity = 1
}


function showFields(fields) {
  fieldsContainer.innerHTML = /*html*/`
    <div class="title"> Fields </div>
  `
  fieldsList = ""
  fields.forEach(field =>{
    fieldsList += field.name
    fieldsList += queryPatches(field.name)
    fieldsList += ","
    fieldsContainer.innerHTML += /*html*/`
      <div id="fieldName-${field.name}"> • ${field.name}: </div>
    `
  })
}
