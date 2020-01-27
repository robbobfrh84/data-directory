function getPages(pageType) {
  const startTime = Date.now()
  const site = document.querySelector('input[type=radio]:checked').value;
  const url = buildPageRequestUrl(site, pageType)

  graphqlUrl.innerHTML = `Graphql Url: <a href="${url}">${url}</a>`

  fetch(url)
    .then(res => res.json())
    .then(data => handlePagesResponse(data.data, startTime, ("all" + pageType) ))
}

function getPage(pageType, id) {
  const startTime = Date.now()
  const site = document.querySelector('input[type=radio]:checked').value;

  const url = buildPagesRequestUrl(site, pageType, id)

  graphqlUrl.innerHTML = `Graphql Url: <a href="${url}">${url}</a>`

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
  fieldsList = ""
  fields.forEach(field =>{
    // fieldsList += field.name + ","

    //
    //
    fieldsList += field.name
    if (field.name === "liveRevision") fieldsList += '{id}'
    if (field.name === "steps") fieldsList += '{value,stepType}'
    if ([
      "relatedDepartments",
      "topics",
      "contacts",
      "locationpagerelatedservicesSet",
    ].includes(field.name)) fieldsList += '{edges{node{id}}}'
    fieldsList += ","
    //
    //

    fieldsContainer.innerHTML += /*html*/`
      <div id="fieldName-${field.name}"> • ${field.name}: </div>
    `
  })
}
