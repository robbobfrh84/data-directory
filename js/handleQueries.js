function getPages(pageType, justData) {
  const startTime = Date.now()
  const site = document.querySelector('input[type=radio]:checked').value
  currentSite = site === "" ? "production" : site

  let url = buildPageRequestUrl(site, pageType)
  const encoded_url = encodeQueryString(url)

  graphqlUrl.innerHTML = `Graphql Url: <a href="${encoded_url}">${encoded_url}</a>`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!justData) {
        handlePagesResponse(data.data, startTime, ("all" + pageType) )
      }
    })
}


function getPage(pageType, id) {
  const startTime = Date.now()
  const site = document.querySelector('input[type=radio]:checked').value
  currentSite = site === "" ? "production" : site

  const url = buildPagesRequestUrl(site, pageType, id)
  console.log("url :", url)
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
  updatePagesInfo(data, page, startTime)
  showPages(data[page].edges, page)
  showFields(data.__type.fields)
}


function handlePageResponse(data, startTime, page) {
  for (const key in data[page].edges[0].node) {
    const field = document.getElementById('fieldName-'+key)
    const rawValue = data[page].edges[0].node[key]
    const value = fieldFormats(key, rawValue)
    showAllPageFieldsHTML({ field, key, value })
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
    pagesContainer.innerHTML += showPagesHTML({
      pageType,
      page: page.node,
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
    showFieldsHTML(field.name)
  })
}
