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


function encodeQueryString(url){
  return encodeURI(url)
}


function handlePagesResponse(data, startTime, page) {
  console.log("data :", data)
  updatePagesInfo(data, page, startTime)
  showPages(data[page].edges, page)
  showFields(data.__type.fields)
}


function handlePageResponse(data, startTime, page) {
  console.log("data :", data)
  for (const key in data[page].edges[0].node) {
    const field = document.getElementById('fieldName-'+key)
    field.innerHTML = /*html*/`
      <div>
        <none class='fieldName'>• ${key}:</none>
        <none class='fieldValue'>${data[page].edges[0].node[key]}</none>
      </div>
    `
  }
}


function updatePagesInfo(data, page, startTime){
  const btn = document.getElementById(page+"Btn")
  btn.innerHTML = btn.name+"("+data[page].edges.length+")"
  pagesInfoHTML({
    name: btn.name,
    delay: Date.now()-startTime,
    total: data[page].edges.length
  })
}


function showPages(pages, pageType) {
  pages.forEach(page => {
    showPagesHTML({
      pageType,
      page: page.node
    })
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
      <div
        id="fieldName-${field.name}"
        class="fieldContainer"
      >
        <div class="fieldName">• ${field.name}</div>
      </div>
    `
  })
}
