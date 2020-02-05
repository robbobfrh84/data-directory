### TO DO(✅):

refactor:
- Organize API functions
- 'events/clickedPageType.js'
- 'events/clickedPage.js'

---
- ✅Make Fields response.
- Finish getting all departmentPage info.
- Make global storage object pageTypes: {fields: {...}, pages {...}}
  - That means, when all pages are clicked, no more pages quires.
- Handle department page clicking a related page. Use pageTypes object

Options...
- Update page return data like pages list to have  delay, title etc...
- Get all  
- Add [Copy as graphql query btn]
- Store locally (add refresh btn)
- make fields a table. (color/bold to highlight)
- highlight selected pageType and page.
- alphabetize results
- Loading wheel
- Add "download all as json" Option

Nice to Have
- actually query all the top level queirs and have a "list" of our sites "pages" to show like we have now. THat way adding a new dept. type will just be adding the name to that list.

### Questions to solve.
- Urls unrelated to this structure. HOWEVER, (sitestructure is a graphiql query. what does that look like).

### WHY? What could this be good for / helpful
- Looking up links to pages,
- If having problems with janin/joplin prod or staging... you can check api status here.
- See what's live
- See what's published
- See what data is available.


### RESOURCES
- https://graphql.org/learn/introspection/

### Saved Notes
