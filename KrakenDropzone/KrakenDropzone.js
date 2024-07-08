import { KrFile } from "../src/index.js";

export class KrDropzone extends HTMLElement {
    constructor() {
        super();
        this.files = [];
    }

    initElement() {
        this.initListener();
    }

    initListener() {
        this.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        let element = this
        this.addEventListener("drop", (event) => {
            event.preventDefault();

            for (let file of event.dataTransfer.files) {
                let f = new KrFile();
                this.files.push(f);
                f.setFile(file).then((r) => {
                    
                    element.after(f.htmlThumbnail());
                    console.log(JSON.stringify(f.record))
                });
            }
        });
    }

    connectedCallback() {
        this.initElement();
    }
}

customElements.define("kr-dropzone", KrDropzone);

function process_files(event) {
    /*
        manages files being dropped

    */

    let records = [];

    if (event.dataTransfer.items) {
        [...event.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                records.push(kraken_file_processor(file));
            }
        });
    } else {
        // Use DataTransfer interface to access the file(s)
        [...event.dataTransfer.files].forEach((file, i) => {
            records.push(kraken_file_processor(file));
        });
    }

    return records;
}
