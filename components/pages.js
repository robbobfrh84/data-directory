function pagesInfoHTML({ name, delay, total }) {
  pagesContainer.innerHTML = /*html*/`
    <div class="pagesTitleContainer">
      <div class="pagesTitle">${name}</div>
      Delay(sec): ${delay / 1000}
      &nbsp; | &nbsp;
      Total Pages: ${total}
    </div>
  `
}

function showPagesHTML({ pageType, page }) {
  pagesContainer.innerHTML += /*html*/`
    <div
      class='pageBtn pageListContaineer'
      onclick="getPage('${pageType}', '${page.id}')"
    >
      <div class="pageListTitle">${page.title}</div>
      <div class="liveIcon">${page.live ? 'Live 🟢' : ''}</div>
    </div>
  `
}
