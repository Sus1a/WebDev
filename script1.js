var imgArray = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
var idArray = ["D01","D02","D03","D04","D05","D06","D07","D08","D09","D10","D11","D12","D13","D14","D15"];
var priceArray= ["$10.95","$11.25","$12.50","$13.45","$15.35","$19.15","$14.95","$15.54","$10.95","$11.25","$12.50","$13.45","$15.35","$19.15","$14.95"];
var positionArray = ["First","Second","Third", "Fourth","Fifth","Sixth","Seventh","Eighth", "Ninth","Tenth","Eleventh","Twelveth","Thirteenth", "Fourtheenth","Fifthteenth"];

var dynamic = document.querySelector('.menu-item-tile');    
for(i=imgArray.length-1;i>=0;i--){
   /*if we want to display all the tiles in the last screen*/  
    var fetch = document.querySelector('.menu-item-tile').innerHTML;
    //if(imgArray[i] == img) {
    dynamic.innerHTML = `
        <div class="row">
            <div class="col-sm-5">
                <div class="menu-item-photo">
                    <div id="${idArray[i]}">${idArray[i]}</div>
                    <img class="img-responsive" height="250" src="./images/${imgArray[i]}.jpg" alt="Item">
                </div>
                <div class="menu-item-price">
                    ${priceArray[i]}
                </div>
            </div>
            <div class="menu-item-description col-sm-7">
                <h3 class="menu-item-title">Picture Selected</h3>
                <p class="menu-item-details">${positionArray[i]} picture created.</p>
            </div>
        </div>`+fetch;
        // if(idArray[i] == x){
        //     break;
        // }
    }

    



