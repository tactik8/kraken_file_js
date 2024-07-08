export function getHtmlThumbnailVideo(record){

  if (record.contentUrl && record.contentUrl != null){
    return getHtmlThumbnailVideoContent(record)
  }
  if (record.embedUrl && record.embedUrl != null){
    return getHtmlThumbnailVideoEmbed(record)
  }
    
}

export function getHtmlThumbnailVideoContent(record){

    let modalID = 'Modal_' + String(crypto.randomUUID())
    let content = `

    <a type="button" class="" data-bs-toggle="modal" data-bs-target="#${modalID}">
        <div class="ratio ratio-16x9" >
          <video class="object-fit-scale" src="${record.contentUrl }" controls></video>
        </div>
    </a>
    <div class="modal" id="${modalID}" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class=""><small>${record.name || ''}</small></p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-truncate">
            <div class="ratio ratio-16x9" >
              <video class="object-fit-scale" src="${record.contentUrl} " controls></video>
            </div>

          </div>

        </div>
      </div>
    </div>
    `
return content

}


export function getHtmlThumbnailVideoEmbed(record){

    let modalID = 'Modal_' + String(crypto.randomUUID())
    let content = `

    <a type="button" class="" data-bs-toggle="modal" data-bs-target="#${modalID}">
        <div class="ratio ratio-16x9" >
          
           ${record.embedUrl}
        </div>
    </a>
    <div class="modal" id="${modalID}" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class=""><small>${record.name || ''}</small></p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-truncate">
            <div class="ratio ratio-16x9" >
             ${record.embedUrl}
            </div>

          </div>

        </div>
      </div>
    </div>
    `
return content

}