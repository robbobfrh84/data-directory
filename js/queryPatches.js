function queryPatches(field){
  let args = ""

  if (field === "steps") args += `
    {
      id
      value
      stepType
    }
  `
  else if (field === "sections") args += `
    {
      id
      value
      heading
    }
  `

  else if ([
    "liveRevision",
    "image",
    "theme",
    "physicalLocationPhoto",
  ].includes(field)) args +=  `
    {
      id
      __typename
    }
  `

  else if ([
    "relatedDepartments",
    "topics",
    "contacts",
    // "locationpagerelatedservicesSet",
    // "informationpagerelateddepartmentsSet",
    // "servicepagerelateddepartmentsSet",
    // "guidepagerelateddepartmentsSet",
    "officialdocumentpagerelateddepartmentsSet", // ?
    "departmentDirectors",
    "topPages",
    "relatedPages",
    "formcontainerrelateddepartmentsSet", // ?
    "topiccollections",
    "relatedServices",
    "officialDocuments",
    // "eventpagerelateddepartmentsSet"
  ].includes(field)) args += `
    {
      edges {
        node {
          id
          __typename
        }
      }
    }
  `
  // Refactore to share this bit with queries.js
  else if ([
    "locationpagerelatedservicesSet",
    "informationpagerelateddepartmentsSet",
    "servicepagerelateddepartmentsSet",
    "guidepagerelateddepartmentsSet",
    // "officialdocumentpagerelateddepartmentsSet",
    "eventpagerelateddepartmentsSet"
  ].includes(field)) args += `
    {
      edges {
        node {
          id,
          __typename
          page {
            id
            title
            live
            __typename
          }
        }
      }
    }
  `

  return args // ? args : ",\n"
}
