var request = require('request');
var cheerio = require('cheerio');

var sku = "RH-1406-3";
var baseUrl = "http://www.interiorsky.com/"
var produtNum
var produrl = 'http://www.interiorsky.com/product-view.php?proid=';

function extractdata(obj){
      var rx = "\=(.*)";
      var arr = obj.match(rx)
    produtNum = arr[1];
    console.log(arr[1]);
    getProduct(produtNum);
}

function getProduct(prdnum){

  if(typeof(prdnum) !== NaN ) {
          request(produrl+prdnum, function(error, response, html){
              if(!error & response.statusCode == 200){
                  var $ = cheerio.load(html)
                  var el = [];
                  $('#nr3 img').map(function(){
                      el.push(baseUrl+$(this).attr('src'));
                    })

                    el.push(baseUrl+$('div#bigpicarea img').attr('src'));
                    var prod = {
                                    name:  $('p.probt').text(),
                                    prodid: prdnum,
                                    imgUrl: el
                                  };
                                  console.log(prod);
                              }
                        })
                }
        }


request('http://www.interiorsky.com/search.php?key=' + sku + '&Submit=', function (error, response, html) {
  if(!error & response.statusCode == 200){
//console.log(html);
    var $ = cheerio.load(html);
      $('div.ryzz a').each(function(i, element){

          var obj = $(this).attr('href');
          console.log(obj);

              extractdata(obj);


      //  console.log(produtNum);
      })
    }
})

if(produtNum != undefined){

    console.log(produtNum);

}
