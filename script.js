async function printStatement() {
    const response = await fetch('/print-statement');
    const data = await response.text();
    document.getElementById('output').innerText = data;
  }
  
  async function handleDeposit() {
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const response = await fetch('/deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    const data = await response.text();
    document.getElementById('output').innerText = data;
  }
  
  async function handleWithdraw() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const response = await fetch('/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    const data = await response.text();
    document.getElementById('output').innerText = data;
  }