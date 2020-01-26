### TO DO(✅):
- ✅refactor
- get pages
- highlight selected
- url link an <a> tag & smaller and lighter in color (opacity)
- alphabetize results
- Loading wheel


### RESOURCES
- https://graphql.org/learn/introspection/


### Saved Notes

const url_string = "abc=foo&def=%5Basf%5D&xyz=5&foo=b%3Dar";
const parsed_url_string = JSON.parse('{"' + decodeURI(joplin_url_string).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
const query = new URLSearchParams(example_params).toString();
