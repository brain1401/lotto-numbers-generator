import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameCountSelector from '../../components/GameCountSelector';

describe('GameCountSelector', () => {
  it('renders the current count', () => {
    render(<GameCountSelector count={5} onChange={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onChange with count + 1 when + is clicked', async () => {
    const onChange = vi.fn();
    render(<GameCountSelector count={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '게임 수 증가' }));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('calls onChange with count - 1 when - is clicked', async () => {
    const onChange = vi.fn();
    render(<GameCountSelector count={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '게임 수 감소' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('- button is disabled when count is 1', () => {
    render(<GameCountSelector count={1} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: '게임 수 감소' })).toBeDisabled();
  });

  it('+ button is disabled when count is 10', () => {
    render(<GameCountSelector count={10} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: '게임 수 증가' })).toBeDisabled();
  });
});
