function buildPageRequestUrl(site, pageType) {
  singularPage = pageType.split('')
  singularPage.pop()
  singularPage = singularPage.join('')
  return `https://joplin${site}.herokuapp.com/api/graphql/?query=
    {__type(name:"${singularPage}Node")
      {
        name
        fields {
          name
          type {
            name
            kind
          }
        }
      }
      all${singularPage}s {
        edges {
          node {
            title
            id
          }
        }
      }
    }`
}

let fieldsList = "" // To be filled in showFields()
function buildPagesRequestUrl(site, pageType, id) {
  console.log("site, pageType, id :", site, pageType, id)
  console.log("fieldsList :", fieldsList)
  const query = `https://joplin${site}.herokuapp.com/api/graphql/?query=
    {
      ${pageType}(id:"${id}") {
        edges {
          node {
             ${fieldsList}
          }
        }
      }
    }`
  console.log("query :", query)
  return query
}





//
//
//
//
// const url_head = "https://joplin"
// const url_tail = ".herokuapp.com/api/graphql/?query="
//
// const pagesRequestStructure = `
//   {
//     name
//     fields {
//       name
//       type {
//         name
//         kind
//       }
//     }
//   }
//   allInformationPages {
//     edges {
//       node {
//         title
//         id
//       }
//     }
//   }
// }`
//
// const allFields = `
//   {
//     name
//     fields {
//       name
//       type {
//         name
//         kind
//       }
//     }
//   }
// `
//
// const allPages = `
//   {
//     edges {
//       node {
//         title
//         id
//       }
//     }
//   }
// `



// const requests = {
//   allInformationPages: '{__type(name: "InformationPageNode")' + pagesRequestStructure,
//   // allInformationPages: '%7B%0A%20%20__type(name%3A%20%22InformationPageNode%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20fields%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20type%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20allInformationPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
//   // allInformationPages: '%7B%0A%20%20allInformationPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
//   allServicePages: '%7B%0A%20%20allServicePages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
//   allDepartmentPages: '%7B%0A%20%20allDepartmentPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
//   allTopics: '%7B%0A%20%20allTopics%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
//   allTopicCollections: '%7B%0A%20%20allTopicCollections%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
//   allLocationPages: '%7B%0A%20%20allLocationPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
//   allFormContainers: '%7B%0A%20%20allFormContainers%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
//   allOfficialDocumentPages: '%7B%0A%20%20allOfficialDocumentPages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
//   allGuidePages: '%7B%0A%20%20allGuidePages%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
//   pageHead: '%7B%0A%20%20',
//   pageTail: '")%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20id%2C%0A%20%20%20%20%20%20%20%20pageType%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A'
// }
