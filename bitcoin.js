//This program retrieves realtime bitcoin prices. The user can input mutiple currencies from the command line. If none are entered, the default currency will be USD, becouse 'merica.

var http = require('http');
 
var arrayOfCurrencies = process.argv.slice(2);

if (arrayOfCurrencies.length === 0){ 
    getBitCoinPrice('USD');
}else{
    arrayOfCurrencies.map(getBitCoinPrice);
}

function getBitCoinPrice(currency){
    currency = currency.toUpperCase();
    var currentBitCoinPrice;
    var apiURL = 'http://api.coindesk.com/v1/bpi/currentprice/'+ currency +'.json';

    //console.log(apiURL);                                                                                     

    http.get(apiURL, function(response){
            if(response.statusCode === 200){
                //print out the price                                                                          
                var apiResponseText = "";
                //console.log('Successfull call to api!');                                                     
                response.on('data', function(chunk){
                        apiResponseText += chunk;
                    });

                response.on('end', function(){
                        //console.dir(apiResponseText);                                                        
                        try{
                            var bitCoinPriceObject = JSON.parse(apiResponseText);
			    //                            var gettingToRate = 'bitCoinPriceObject.bpi.' + currency + '.rate';
                            console.log('The current price in ' + currency + ' is '+ bitCoinPriceObject.bpi[currency].rate + ' as of ' + bitCoinPriceObject.time.updated)
			}catch(error){
                            console.log(error.message);
                        }
                    });

            }else{
                console.error('there seems to be a problem captain processing the request for:' + currency)                                                               
            }
        });
}
