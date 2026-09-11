import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FairnessNotice from '../../components/FairnessNotice';

const openDetails = () => userEvent.click(screen.getByRole('button', { name: /어떻게 뽑나요/ }));

describe('FairnessNotice', () => {
  it('shows only the summary line by default', () => {
    render(<FairnessNotice lottery="lotto" />);
    expect(screen.getByText('모든 번호 조합이 똑같은 확률로 나옵니다')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /어떻게 뽑나요/ })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByText('치우침 없이 뽑습니다')).not.toBeInTheDocument();
  });

  it('reveals the details when the trigger is clicked', async () => {
    render(<FairnessNotice lottery="lotto" />);
    await openDetails();
    expect(screen.getByText('치우침 없이 뽑습니다')).toBeVisible();
    expect(screen.getByText(/8,145,060분의 1/)).toBeVisible();
  });

  it('uses pension odds and skips the prize-sharing note for pension', async () => {
    render(<FairnessNotice lottery="pension" />);
    expect(screen.getByText('모든 번호가 똑같은 확률로 나옵니다')).toBeInTheDocument();
    await openDetails();
    expect(screen.getByText(/5,000,000분의 1/)).toBeVisible();
    expect(screen.queryByText(/나눌 가능성/)).not.toBeInTheDocument();
  });
});
