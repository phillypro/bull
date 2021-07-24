function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            var blah = document.querySelector('#blah');
            blah.src = e.target.result
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

/* find next friday */
function nextFriday()
{
var d = new Date();
switch (d.getDay())
{
case 0: d.setDate(d.getDate() + 5);
break;
case 1: d.setDate(d.getDate() + 4);
break;
case 2: d.setDate(d.getDate() + 3);
break;
case 3: d.setDate(d.getDate() + 2);
break;
case 4: d.setDate(d.getDate() + 1);
break;
case 6: d.setDate(d.getDate() + 6);
break;
}
return d;
}

function formatMoney(money) {
    return new Intl.NumberFormat('en-US', {   style: 'currency',  currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(money);
}


let imgInp = document.querySelector('#imgInp'),
qtyInp = document.querySelector('#qty'),
tckrInp = document.querySelector('#tckr'),
stkeInp = document.querySelector('#stke'),
optInp = document.querySelector('#opt'),
dteInp = document.querySelector('#dte'),
posInp = document.querySelector('#position'),
iniInp = document.querySelector('#initialprice'),
currInp = document.querySelector('#currentprice');
imgInp.addEventListener('change', function(e) {readURL(e.currentTarget); });
qtyInp.addEventListener('keyup', updateTotals );
qtyInp.addEventListener('change', updateTotals );
iniInp.addEventListener('keyup', updateTotals );
iniInp.addEventListener('change', updateTotals );
currInp.addEventListener('keyup', updateTotals );
currInp.addEventListener('change', updateTotals );
tckrInp.addEventListener('keyup', function(e) { document.querySelector('#ticker').innerHTML = e.currentTarget.value; });
posInp.addEventListener('keyup', function(e) { document.querySelector('#positionRatio #percent2').innerHTML = e.currentTarget.value; });
posInp.addEventListener('change', function(e) { document.querySelector('#positionRatio #percent2').innerHTML = e.currentTarget.value; });
stkeInp.addEventListener('keyup', function(e) { document.querySelector('#strike #number').innerHTML = e.currentTarget.value; });
dteInp.addEventListener('change', function(e) { let b = e.currentTarget.value.split(/\D/), thedate = new Date(b[0], --b[1], b[2]), formatdate = thedate.toString("dd MMM yy"); document.querySelector('#date').innerHTML = formatdate;
let diff = Math.round((thedate-new Date())/(1000*60*60*24));
if(diff <= 5) {
    document.querySelector('#clock').classList.add('weekly');
}else{
    document.querySelector('#clock').classList.remove('weekly');
}
});
optInp.addEventListener('change', function(e) { document.querySelector('#option').innerHTML = e.currentTarget.value; });


/* set defaults */
var evt = document.createEvent("HTMLEvents");
evt.initEvent("keyup", false, true);
qtyInp.dispatchEvent(evt);
tckrInp.dispatchEvent(evt);
stkeInp.dispatchEvent(evt);
posInp.dispatchEvent(evt);

/* set date default */
// Variables
var date = new Date();
	// Remove attributes
	dteInp.removeAttribute('pattern');
	dteInp.removeAttribute('placeholder');
var nextFriday = nextFriday();
// Set the value
dteInp.value = nextFriday.getFullYear().toString() + '-' + (nextFriday.getMonth() + 1).toString().padStart(2, 0) +
    '-' + nextFriday.getDate().toString().padStart(2, 0);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    dteInp.dispatchEvent(evt);
    optInp.dispatchEvent(evt);


function updateTotals(e) {
console.log(e.currentTarget.name);

let qtyInp = document.querySelector('#qty'),
quantity = document.querySelector('#quantity'),
iniInp = document.querySelector('#initialprice'),
currInp = document.querySelector('#currentprice'),
avgPrice = document.querySelector('#averagePrice'),
marketValue = document.querySelector('#marketValue'),
profitLoss = document.querySelector('#profitLoss #money'),
profitLossPercent = document.querySelector('#profitLoss #percent'),
daysProfitLossPercent = document.querySelector('#daysProfitLoss #money2');

quantity.innerHTML = qtyInp.value;
marketValue.innerHTML = formatMoney( ((qtyInp.value * 100) * iniInp.value) + (((currInp.value - iniInp.value) * 100) * qtyInp.value)  ).replace('$','');
profitLoss.innerHTML =  formatMoney( ((currInp.value - iniInp.value) * 100) * qtyInp.value ).replace('$','');
profitLossPercent.innerHTML =   ((currInp.value-iniInp.value)/iniInp.value * 100).toFixed(2);
daysProfitLossPercent.innerHTML = formatMoney(Number(profitLoss.innerHTML.replace(/[^0-9.-]+/g,"")) - (qtyInp.value * 0.169).toFixed(2)).replace('$','');
avgPrice.innerHTML = iniInp.value;
}





  function downloadSVGAsPNG2(e){
  var node = document.querySelector('.resizeme');

  domtoimage.toJpeg(node, { quality: 1 })
  .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'my-image-name.jpeg';
      link.href = dataUrl;
      link.click();
  });
  }

  const downloadPNG = document.querySelector('#downloadPNG');
downloadPNG.addEventListener('click', downloadSVGAsPNG2);