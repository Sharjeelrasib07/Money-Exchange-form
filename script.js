var select = document.querySelectorAll(".currency"),
input_currency = document.getElementById('input_currency'),
output_currency = document.getElementById('output_currency'),
fee = document.getElementById('fee'),
total_amount = document.getElementById('total_amount');

fetch(`https://api.frankfurter.app/currencies`)
  .then((data) => data.json())
  .then((data) => {
    const entries = Object.entries(data);
    console.log(data);
    for (var i = 0; i < entries.length; i++) {
      select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][1]}</option>`;
      select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][1]}</option>`;
    }
});

function convert(){
  var input_currency_val = input_currency.value;
  if(select[0].value != select[1].value ){
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${input_currency_val}&from=${select[0].value}&to=${select[1].value}`)
      .then((val) => val.json())
      .then((val) => {
        var converted_amount = Object.values(val.rates)[0];
        output_currency.value = converted_amount;

        var calculated_fee = (converted_amount * 0.05).toFixed(2);
        fee.value = calculated_fee;

        var total = (converted_amount - calculated_fee).toFixed(2);
        total_amount.value = total;

        console.log(`Converted Amount: ${converted_amount}, Fee: ${calculated_fee}, Total Amount: ${total}`);
      });
  } else {
    alert("Please select two different currencies");
  }
}
