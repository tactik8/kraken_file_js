

export function getCard(record, imageContent){

    let content = `
    
    <div class="card" style="max-width: 16rem" >
      ${imageContent}
      <div class="card-body">
        <p class=""><small>${record.name}</small></p>
       
      </div>
    </div>
    
    `
    return content

        
}