//const API_URL = "https://cdn.krknapi.com/";
function $1aa97cf4c51c1bcb$export$854bf7e726926d04(record) {
    let modalID = "Modal_" + String(crypto.randomUUID());
    let content = `

    <a type="button" class="" data-bs-toggle="modal" data-bs-target="#${modalID}">
        <img style="max-width: 200px" class="img-thumbnail" src="${record.contentUrl || record.contentUrl}">
    </a>
    <div class="modal" id="${modalID}" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${record.name || ""}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img class="img-fluid" src="${record.contentUrl}">
          </div>

        </div>
      </div>
    </div>
    `;
    return content;
}


function $344ba33f98e0a480$export$bae8c2eef7f84b1a(record) {
    if (record.contentUrl && record.contentUrl != null) return $344ba33f98e0a480$export$be0bca2917de2f9(record);
    if (record.embedUrl && record.embedUrl != null) return $344ba33f98e0a480$export$fec9778a88f3c5f2(record);
}
function $344ba33f98e0a480$export$be0bca2917de2f9(record) {
    let modalID = "Modal_" + String(crypto.randomUUID());
    let content = `

    <a type="button" class="" data-bs-toggle="modal" data-bs-target="#${modalID}">
        <div class="ratio ratio-16x9" >
          <video class="object-fit-scale" src="${record.contentUrl}" controls></video>
        </div>
    </a>
    <div class="modal" id="${modalID}" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class=""><small>${record.name || ""}</small></p>
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
    `;
    return content;
}
function $344ba33f98e0a480$export$fec9778a88f3c5f2(record) {
    let modalID = "Modal_" + String(crypto.randomUUID());
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
            <p class=""><small>${record.name || ""}</small></p>
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
    `;
    return content;
}


function $94cb5d21d04f1474$export$574ca6466190d4b4(record, imageContent) {
    let content = `
    
    <div class="card" style="max-width: 16rem" >
      ${imageContent}
      <div class="card-body">
        <p class=""><small>${record.name}</small></p>
       
      </div>
    </div>
    
    `;
    return content;
}


function $ad091aed34136047$export$d3db32922728ba8d(file, seekTo = 0.0) {
    //console.log("getting video cover for file: ", file);
    return new Promise((resolve, reject)=>{
        // load the file to a video player
        const videoPlayer = document.createElement("video");
        videoPlayer.setAttribute("src", URL.createObjectURL(file));
        videoPlayer.load();
        videoPlayer.addEventListener("error", (ex)=>{
            reject("error when loading video file", ex);
        });
        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener("loadedmetadata", ()=>{
            // seek to user defined timestamp (in seconds) if possible
            if (videoPlayer.duration < seekTo) {
                reject("video is too short.");
                return;
            }
            // delay seeking or else 'seeked' event won't fire on Safari
            setTimeout(()=>{
                videoPlayer.currentTime = seekTo;
            }, 200);
            // extract video thumbnail once seeking is complete
            videoPlayer.addEventListener("seeked", ()=>{
                //console.log('video is now paused at %ss.', seekTo);
                // define a canvas to have the same dimension as the video
                const canvas = document.createElement("canvas");
                canvas.width = videoPlayer.videoWidth;
                canvas.height = videoPlayer.videoHeight;
                // draw the video frame to canvas
                const ctx = canvas.getContext("2d");
                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                // return the canvas image as a blob
                ctx.canvas.toBlob((blob)=>{
                    resolve(blob);
                }, "image/jpeg", 0.75 /* quality */ );
            });
        });
    });
}


const $0d11bf43a650f0b4$var$API_URL = "https://931bba76-1b26-4445-ad26-d2c9d201d0e2-00-lpy51ddmv2p2.janeway.replit.dev/";
const $0d11bf43a650f0b4$var$API_PATH = "krakenFileJs/test1" //"test4";
;
class $0d11bf43a650f0b4$export$df9d79df60a0d8e5 {
    constructor(){
        this._file = null;
        this._record = {};
        this._record["@type"] = "DigitalDocument";
        this._record["@id"] = String(crypto.randomUUID());
    }
    get record() {
        return this._record;
    }
    set record(value) {
        this._record = value;
    }
    get file() {
        return this._file;
    }
    set file(value) {
        this.setFile(value);
    }
    async setFile(value) {
        this._file = value;
        let r = await this.extractFromFile();
        return this;
    }
    async extractFromFile() {
        this._record.name = this._file.name;
        this.extractSize();
        this.extractFormat();
        this.extractType();
        let r1 = await this.extractThumbnail();
        let r = await this.post();
        return r;
    }
    extractSize() {
        this._record.size = {
            "@type": "QuantitativeValue",
            "@id": String(crypto.randomUUID()),
            unitText: "bytes",
            value: this._file.size
        };
    }
    extractFormat() {
        this._record.encodingFormat = this.file.type;
    }
    extractType() {
        switch(this._record.encodingFormat){
            case "video/mp4":
                this._record["@type"] = "VideoObject";
                break;
            case "image/png":
                this._record["@type"] = "ImageObject";
                break;
            case "application/pdf":
                this._record["@type"] = "DigitalDocument";
                break;
            default:
                this._record["@type"] = "DigitalDocument";
                break;
        }
    }
    async extractThumbnail() {
        this._record["@type"];
    }
    async post() {
        let apiEndpoint = $0d11bf43a650f0b4$var$API_URL + $0d11bf43a650f0b4$var$API_PATH;
        // Append file
        const formData = new FormData();
        formData.append("file", this._file);
        // Append record
        let record = this.record;
        for(var key in record);
        let headers = {
        };
        try {
            const response = await fetch(apiEndpoint, {
                method: "post",
                body: formData
            });
            //console.log('s', response.status)
            const t = await response.headers;
            const data = await response.json();
            this.record.encodingFormat = data.encodingformat;
            this.record.size = data.size;
            this.record.contentUrl = data.contentUrl;
            this.record.name = data.name;
            return;
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            throw error;
        }
    }
    // -----------------------------------------------------
    //  html 
    // -----------------------------------------------------
    htmlThumbnail() {
        let element = document.createElement("div");
        let record_type = this._record["@type"];
        if (record_type == "ImageObject") {
            let mediaContent = (0, $1aa97cf4c51c1bcb$export$854bf7e726926d04)(this.record);
            let content = (0, $94cb5d21d04f1474$export$574ca6466190d4b4)(this.record, mediaContent);
            element.innerHTML = content;
        }
        if (record_type == "VideoObject") {
            let mediaContent = (0, $344ba33f98e0a480$export$bae8c2eef7f84b1a)(this.record);
            let content = (0, $94cb5d21d04f1474$export$574ca6466190d4b4)(this.record, mediaContent);
            element.innerHTML = content;
        }
        return element;
    }
}


const $cf838c15c8b009ba$export$df9d79df60a0d8e5 = (0, $0d11bf43a650f0b4$export$df9d79df60a0d8e5);


export {$cf838c15c8b009ba$export$df9d79df60a0d8e5 as KrFile};
//# sourceMappingURL=main.js.map
