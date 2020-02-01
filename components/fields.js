function showFieldsHTML(name){
  fieldsContainer.innerHTML += /*html*/`
    <div
      id="fieldName-${name}"
      class="fieldContainer"
    >
      <div class="fieldName">• ${name}</div>
    </div>
  `
}

function showAllPageFieldsHTML({ field, key, value }) {
  field.innerHTML = /*html*/`
    <none class='fieldName'>• ${key}:</none>
    <none class='fieldValue'>${value}</none>
  `
}
