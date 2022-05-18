var form = localStorage.getItem("form");

if(form) {
var formObj = JSON.parse(form);
  const keys = Object.keys(formObj );
  keys.forEach((key, index) => {
    if(key !== 'imgInp') {
    document.querySelector('#' + key ).value = formObj[key];  
    }else{
      document.querySelector('#blah').src = formObj[key];
    }
    
});
}




function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            var blah = document.querySelector('#blah');
            blah.src = e.target.result;
            updateTotals();
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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
weeklycheck = document.querySelector('#isweekly');
weeklycheck.addEventListener('change', toggleWeekly );
imgInp.addEventListener('change', function(e) {readURL(e.currentTarget); });
qtyInp.addEventListener('keyup', updateTotals );
qtyInp.addEventListener('change', updateTotals );
iniInp.addEventListener('keyup', updateTotals );
iniInp.addEventListener('change', updateTotals );
currInp.addEventListener('keyup', updateTotals );
currInp.addEventListener('change', updateTotals );
tckrInp.addEventListener('keyup', function(e) { document.querySelector('#ticker').innerHTML = e.currentTarget.value; saveChanges() });
posInp.addEventListener('keyup', function(e) { document.querySelector('#positionRatio #percent2').innerHTML = e.currentTarget.value; saveChanges() });
posInp.addEventListener('change', function(e) { document.querySelector('#positionRatio #percent2').innerHTML = e.currentTarget.value; saveChanges() });
stkeInp.addEventListener('keyup', function(e) { document.querySelector('#strike #number').innerHTML = numberWithCommas(e.currentTarget.value); saveChanges() });
dteInp.addEventListener('change', function(e) { let b = e.currentTarget.value.split(/\D/), thedate = new Date(b[0], --b[1], b[2]), formatdate = thedate.toString("dd MMM yy"); document.querySelector('#date').innerHTML = formatdate;
let diff = Math.round((thedate-new Date())/(1000*60*60*24));
if(diff <= 3) {
    document.querySelector('#clock').classList.add('weekly');
}else{
    document.querySelector('#clock').classList.remove('weekly');
}
saveChanges()
});
optInp.addEventListener('change', function(e) { document.querySelector('#option').innerHTML = e.currentTarget.value; saveChanges() });


/* set defaults */
var evt = document.createEvent("HTMLEvents");
evt.initEvent("keyup", false, true);
qtyInp.dispatchEvent(evt);
tckrInp.dispatchEvent(evt);
stkeInp.dispatchEvent(evt);
posInp.dispatchEvent(evt);

/* set date default */
// Variables
if(form === null) {
var date = new Date();
	// Remove attributes
	dteInp.removeAttribute('pattern');
	dteInp.removeAttribute('placeholder');
var nextFriday = nextFriday();
// Set the value
dteInp.value = nextFriday.getFullYear().toString() + '-' + (nextFriday.getMonth() + 1).toString().padStart(2, 0) +
    '-' + nextFriday.getDate().toString().padStart(2, 0);
}
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    dteInp.dispatchEvent(evt);
    optInp.dispatchEvent(evt);


function toggleWeekly(e) {
  let weekly = document.querySelector('#weekly');
  if(weeklycheck.checked) {
    weekly.style.display = "inline-block";
  }else{
    weekly.style.display = "none";
  }
}

function updateTotals(e) {

let qtyInp = document.querySelector('#qty'),
quantity = document.querySelector('#quantity'),
iniInp = document.querySelector('#initialprice'),
currInp = document.querySelector('#currentprice'),
avgPrice = document.querySelector('#averagePrice'),
marketValue = document.querySelector('#marketValue'),
profitLossWrap = document.querySelector('#profitLoss'),
profitLoss = profitLossWrap.querySelector('#money'),
profitLossPercent = document.querySelector('#profitLoss #percent'),
daysProfitLossWrap = document.querySelector('#daysProfitLoss'),
daysprofitLossPercent = document.querySelector('#percent3'),
daysProfitLoss = daysProfitLossWrap.querySelector('#money2');

quantity.innerHTML = qtyInp.value;
marketValue.innerHTML = formatMoney( ((qtyInp.value * 100) * iniInp.value) + (((currInp.value - iniInp.value) * 100) * qtyInp.value)  ).replace('$','');

if(Number(currInp.value) > Number(iniInp.value)) {
profitLoss.innerHTML =  '+' + formatMoney( ((currInp.value - iniInp.value) * 100) * qtyInp.value ).replace('$','');
profitLossPercent.innerHTML = ' +' + numberWithCommas(((currInp.value-iniInp.value)/iniInp.value * 100).toFixed(2));
daysProfitLoss.innerHTML = '+' + formatMoney(Number(profitLoss.innerHTML.replace(/[^0-9.-]+/g,"")) - (qtyInp.value * 0.169).toFixed(2)).replace('$','');
daysprofitLossPercent.innerHTML = profitLossPercent.innerHTML;
profitLossWrap.classList.remove('red');
daysProfitLossWrap.classList.remove('red');
}else{
  profitLoss.innerHTML = '-' + formatMoney( ((iniInp.value - currInp.value) * 100) * qtyInp.value ).replace('$','');
  profitLossPercent.innerHTML =  ((currInp.value-iniInp.value)/iniInp.value * 100).toFixed(2);
  daysprofitLossPercent.innerHTML = ((currInp.value-iniInp.value)/iniInp.value * 100).toFixed(2);
  daysProfitLoss.innerHTML = formatMoney(Number(profitLoss.innerHTML.replace(/[^0-9.-]+/g,"")) - (qtyInp.value * 0.169).toFixed(2)).replace('$','');
  profitLossWrap.classList.add('red');
  daysProfitLossWrap.classList.add('red');
}

avgPrice.innerHTML = iniInp.value;
saveChanges();
}


function saveChanges() {
  let formInputs = document.querySelectorAll('form input, form select');
  var data = {};
  [].forEach.call(formInputs, function(input) {
    // do whatever
    if(input.type !== 'file') {
    data[input.id] =  input.value;
    }else{
      data[input.id] =  document.querySelector('#blah').src;
    }
  });
  localStorage.setItem('form', JSON.stringify(data));
}




  function downloadSVGAsPNG2(e){
  var node = document.querySelector('.resizeme');
  var scale = 2.2;
  domtoimage.toBlob(node, {
    width: node.clientWidth * scale,
    height: node.clientHeight * scale,
    style: {
     transform: 'scale('+scale+')',
     transformOrigin: 'top left',
     width: `${node.clientWidth * scale}px`,
     height: `${node.clientHeight * scale}px`
   }})
  .then(function (blob) {
    window.saveAs(blob, 'bull.png');
  });
  }

  const downloadPNG = document.querySelector('#downloadPNG');
downloadPNG.addEventListener('click', downloadSVGAsPNG2);
