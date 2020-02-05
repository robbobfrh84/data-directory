function fieldFormats( key, value ){

  formatted = value

  // if (typeof value === "object") {
  //   console.log("🔥is an object: key, value", key, value)
  // }

  if (key === 'urlPath') {
    // const site = siteUrls[currentSite] + value.split('/home').join(currentLanguage)
    const site = value.split('/home')[1]
    formatted = /*html*/`
      <a href=${site} target="_blank">${site}</a>
      <em class="lightNote"> * in ${currentSite} </em>
    `
  }

  else if ([
    "locationpagerelatedservicesSet",
    "informationpagerelateddepartmentsSet",
    "servicepagerelateddepartmentsSet",
    "guidepagerelateddepartmentsSet",
    // "officialdocumentpagerelateddepartmentsSet", // ?
    "eventpagerelateddepartmentsSet"
  ].includes(key)) {
    formatted = ""
    value.edges.map( node => {
      const pageType = "all"+node.node.__typename.split("RelatedDepartmentsNode")[0]
      formatted += /*html*/`
        <br>&nbsp; &nbsp; &bull; ${showPagesHTML({ pageType,page: node.node.page})}
      `
    })
    formatted += `<br><br>`
  }

  return formatted
}
