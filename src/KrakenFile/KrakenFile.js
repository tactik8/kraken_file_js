const API_URL = "https://cdn.krknapi.com/";
//const API_URL = 'https://931bba76-1b26-4445-ad26-d2c9d201d0e2-00-lpy51ddmv2p2.janeway.replit.dev/'
const API_PATH = "krakenFileJs/test1" //"test4";

import {getHtmlThumbnailImage} from './htmlParts/htmlThumbnailImage.js'
import {getHtmlThumbnailVideo} from './htmlParts/htmlThumbnailVideo.js'
import { getCard } from './htmlParts/htmlCard.js'
import { getVideoCover } from './helpers/videoHelpers.js'


export class KrFile {
    constructor() {
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
        this.setFile(value)
    }

    async setFile(value){
        this._file = value;
        let r = await this.extractFromFile();
        return this
    }

    async extractFromFile() {
        this._record.name = this._file.name;
        this.extractSize();
        this.extractFormat();
        this.extractType();
        let r1 = await this.extractThumbnail();
        let r = await this.post();
        return r
    }

    extractSize() {
        this._record.size = {
            "@type": "QuantitativeValue",
            "@id": String(crypto.randomUUID()),
            unitText: "bytes",
            value: this._file.size,
        };
    }

    extractFormat() {
        this._record.encodingFormat = this.file.type;
    }

    extractType() {
        switch (this._record.encodingFormat) {
                
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

    async extractThumbnail(){

        
        switch (this._record['@type']) {

            case "ImageObject":
                
                break;
            case "VideoObject":
                //console.log('thumbnail start')
                //let thumbnail = new KrFile()
                //let videoCover = await getVideoCover(this.file, 1.5)
                //let r = await thumbnail.setFile(videoCover)
                //this._record["thumbnailUrl"] = thumbnail.record?.contentUrl;
                //console.log('thumbnail end', this._record["thumbnailUrl"])
                break;
            case "application/pdf":
                
                break;
            default:
                
                break;
            }
           
    }

    async post() {
        let apiEndpoint = API_URL + API_PATH;

        // Append file
        const formData = new FormData();
        formData.append("file", this._file);

        // Append record
        let record = this.record;
        for (var key in record) {
          //  formData.append(key, record[key]);
        }

        let headers = {
            //"Content-Type": "application/json",
            //Authorization: "bob",
        };

        try {
            const response = await fetch(apiEndpoint, {
                method: "post",
                body: formData,
                //headers: headers,
                //mode: "no-cors",
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
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
            throw error;
        }
    }


    // -----------------------------------------------------
    //  html 
    // -----------------------------------------------------

    htmlThumbnail(){

        let element = document.createElement('div')
        let record_type = this._record['@type'] 
        if(record_type == 'ImageObject'){
            let mediaContent = getHtmlThumbnailImage(this.record)
            let content = getCard(this.record, mediaContent)
            element.innerHTML = content
        }
        if(record_type == 'VideoObject'){
            let mediaContent = getHtmlThumbnailVideo(this.record)
            let content = getCard(this.record, mediaContent)
            element.innerHTML = content
           

        }
        
        return element
        
    }


    
    
    
}
