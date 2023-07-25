import { render, screen, fireEvent } from '@testing-library/react';
import Account from './Account';

describe('Account', () => {
  beforeEach(() => {
    render(<Account />);
  });

  it('should have initial balance of 0', () => {
    const balanceText = screen.getByText(/Balance: \$0.00/);
    expect(balanceText).toBeInTheDocument();
  });

  it('should deposit money correctly', () => {
    const depositButton = screen.getByText('Deposit $1000');
    fireEvent.click(depositButton);
    const balanceText = screen.getByText(/Balance: \$1000.00/);
    expect(balanceText).toBeInTheDocument();
  });
    
  it('should withdraw money correctly if balance is sufficient', () => {
    const depositButton = screen.getByText('Deposit $1000');
    fireEvent.click(depositButton);
    const withdrawButton = screen.getByText('Withdraw $1000');
    fireEvent.click(withdrawButton);
    const balanceText = screen.getByText(/Balance: \$0.00/);
    expect(balanceText).toBeInTheDocument();
  });
  it('should not withdraw money if balance is insufficient', () => {
    const mockAlert = jest.spyOn(window, 'alert');
    mockAlert.mockImplementation(() => {});
    const depositButton = screen.getByText('Deposit $1000');
    fireEvent.click(depositButton);
    const withdrawButton = screen.getByText('Withdraw $1000');
    fireEvent.click(withdrawButton);
    fireEvent.click(withdrawButton);
    expect(mockAlert).toHaveBeenCalledWith('Insufficient funds.');
    const balanceText = screen.getByText(/Balance: \$0.00/);
    expect(balanceText).toBeInTheDocument();
  });



});

