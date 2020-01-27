function queryPatches (field){
  let args = ""

  if (field === "steps") args += `
    {
      value,
      stepType,
    }
  `
  else if (field === "sections") args += `
    {value,heading}
  `

  else if ([
    "liveRevision",
    "image",
    "theme",
    "physicalLocationPhoto",
  ].includes(field)) args +=  `
    {id}
  `

  else if ([
    "relatedDepartments",
    "topics",
    "contacts",
    "locationpagerelatedservicesSet",
    "informationpagerelateddepartmentsSet",
    "servicepagerelateddepartmentsSet",
    "guidepagerelateddepartmentsSet",
    "officialdocumentpagerelateddepartmentsSet",
    "departmentDirectors",
    "topPages",
    "relatedPages",
    "formcontainerrelateddepartmentsSet",
    "topiccollections",
    "relatedServices",
    "officialDocuments",
  ].includes(field)) args += `
    {
      edges {
        node{id}
      }
    }
  `

  return args
}
