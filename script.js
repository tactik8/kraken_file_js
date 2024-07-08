//import { KrThing } from 'https://tactik8.github.io/kraken_thing_js/kraken_thing/kraken_thing.js';

import { KrDropzone } from './KrakenDropzone/KrakenDropzone.js'
import {KrFile} from './src/index.js'

//let k = new KrThing('Thing')


function test1(){

     //let k = new KrThing('Thing')

     let div = document.getElementById('test1')

     let element = document.createElement('div')

     let record1 = {"@type":"ImageObject","@id":"51ad42ae-0291-4043-b7c0-3a085a9a6147","name":"Screenshot 2024-07-08 at 9.47.14â¯AM.png","size":{"@type":"QuantitativeValue","@id":"5562da87-d415-4b16-8dde-240fdd3f711e","unitText":"bytes","unitCode":"B10","value":"256688"},"contentUrl":"https://storage.googleapis.com/kraken-cdn/test3%2FkrakenFileJs%2Ftest1%2Fbbf0874ae511159d9f6f82592463d2725c9508104d81e7fa91d777f42a2ec2e8.47"}

     let f = new KrFile()
     f.record = record1
     div.appendChild(f.htmlThumbnail())

   
  

     
}


test1()
