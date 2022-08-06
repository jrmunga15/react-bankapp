function ATMDeposit ({onChange, isDeposit, isValid}) {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge"><br/>
        <p>Please enter the ammount</p>
        <input id="number-input" type="number" width="200" placeholder="$0" onChange={onChange}></input>
        <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
        {/* <input type="reset" value="Reset"></input> */}
      </label>
    );
  };
  
  function Withdraw () {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(100);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState('');
    const [validTransaction, setValidTransaction] = React.useState(false);
    const ctx = React.useContext(UserContext); 
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Balance: $ ${totalState}`);
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    
    function handleChange (event) {
      console.log('=======================');
      console.log((ctx.users[0].balance));
      console.log('current # : ' + Number(event.target.value));
  
      // if ((event.target.value) == NaN) {
      //   alert ('Not a number');
      // }
      if (Number(event.target.value) < 0) {
        alert ('Negative withdraw is not allowed');
        event.target.value = 0;
      }
      if (Number(event.target.value) <= 0) {
        return setValidTransaction(false);
      }
      if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
        setValidTransaction(false);
      } else {
        setValidTransaction(true);
      }
      setDeposit(Number(event.target.value));
    };
    
    function handleSubmit (event) {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      event.preventDefault();
      alert ('Success, withdraw was processed and will be deducted from your Balance');
    };
  
    function handleModeSelect (event) {
      console.log('selection: ' + event.target.value);
      setAtmMode(event.target.value);
      setValidTransaction(false);
      if (event.target.value === 'Deposit') {
        setIsDeposit(true);
      } else {
        setIsDeposit(false);
      }
    };
  
    return (
      <Card
        bgcolor="primary"
        header="Withdraw"
        body={(  
          <>
            
            <form onSubmit={handleSubmit}>
              <>
                <h2 id="total">{status}</h2>
  
                <label>Please confirm your selection</label><br/>
  
                <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
                  <option id="no-selection" value=""></option>
                  {/* <option id="deposit-selection" value="Deposit">
                    Deposit
                  </option> */}
                  <option id="cashback-selection" value="Withdraw">
                    Withdraw
                   </option>
                </select><br/>
  
                {atmMode && (
                  <ATMDeposit
                    onChange={handleChange}
                    isDeposit={isDeposit}
                    isValid={validTransaction}
                  ></ATMDeposit>
                )}
                
              </>
            </form>
          </>
        )}
      />
    )
  };