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

});

