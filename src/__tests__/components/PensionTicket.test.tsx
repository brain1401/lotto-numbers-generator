import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PensionTicket from '../../components/PensionTicket';

describe('PensionTicket', () => {
  it('조 번호를 표시한다', () => {
    render(<PensionTicket group={3} digits="472891" />);
    expect(screen.getByText('3조')).toBeInTheDocument();
  });

  it('6자리 숫자를 각 자리별로 표시한다', () => {
    render(<PensionTicket group={1} digits="123456" />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('앞자리 0도 표시된다', () => {
    render(<PensionTicket group={2} digits="001234" />);
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThanOrEqual(2);
  });

  it('label prop이 있으면 표시한다', () => {
    render(<PensionTicket group={1} digits="000000" label="게임 A" />);
    expect(screen.getByText('게임 A')).toBeInTheDocument();
  });
});
