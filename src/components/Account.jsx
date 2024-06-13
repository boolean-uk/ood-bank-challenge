import { useContext } from 'react'
import { BankingContext } from '../App'

export default function Account() {
    const { 
        startDate, 
        setStartDate, 
        endDate, 
        setEndDate, 
        bankStatement, 
        setBankStatement, 
        bankingSystem, 
        getDate 
    } = useContext(BankingContext)

    const handlePrintStatement = (e) => {
        e.preventDefault()

        try {
            if (startDate.length === 0 && endDate.length === 0) {
                setBankStatement(bankingSystem.printBankStatement())
            } else {
                setBankStatement(bankingSystem.printBankStatementBetweenDates(startDate, endDate))
            }
        } catch (error) {
            alert(error.message)
        }
    }
    
    return (
        <form onSubmit={handlePrintStatement} id="account">
            <h2>Balance: {bankingSystem.balance}&pound;</h2>
            
            <ul>
                <li>
                    <label htmlFor="start">From</label>
                    <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} 
                        min={getDate()} 
                    />
                </li>

                <li>
                    <label htmlFor="end">To</label>
                    <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={getDate(1)} 
                    />
                </li>
            </ul>

            <button>Print bank statement</button>

            {bankStatement && (
                <pre>{bankStatement}</pre>
            )}
        </form>
    )
}
