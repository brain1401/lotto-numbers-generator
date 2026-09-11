import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

beforeEach(() => {
  localStorage.clear();
});

describe('App', () => {
  it('keeps the just-generated lotto games out of the history list', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '번호 생성' }));
    expect(screen.getByText('기록에 저장됨')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /이전 기록/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '번호 생성' }));
    expect(screen.getByRole('button', { name: /이전 기록 1개/ })).toBeInTheDocument();
  });

  it('keeps the just-generated pension games out of the history list', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '연금복권 720+' }));

    await user.click(screen.getByRole('button', { name: '번호 생성' }));
    expect(screen.getByText('기록에 저장됨')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /이전 기록/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '번호 생성' }));
    expect(screen.getByRole('button', { name: /이전 기록 1개/ })).toBeInTheDocument();
  });
});
