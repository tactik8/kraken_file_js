export function getHtmlThumbnailImage(record){

    let modalID = 'Modal_' + String(crypto.randomUUID())
    let content = `

    <a type="button" class="" data-bs-toggle="modal" data-bs-target="#${modalID}">
        <img style="max-width: 200px" class="img-thumbnail" src="${record.contentUrl || record.contentUrl}">
    </a>
    <div class="modal" id="${modalID}" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${record.name || ''}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img class="img-fluid" src="${record.contentUrl}">
          </div>

        </div>
      </div>
    </div>
    `
return content

}