import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../../components/Header';

describe('Header', () => {
  it('renders an h1 heading', () => {
    render(<Header activeTab="lotto" onTabChange={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('로또와 연금복권 탭이 렌더링된다', () => {
    render(<Header activeTab="lotto" onTabChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: '로또 6/45' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '연금복권 720+' })).toBeInTheDocument();
  });

  it('activeTab에 따라 활성 탭이 강조된다', () => {
    render(<Header activeTab="pension" onTabChange={vi.fn()} />);
    const pensionBtn = screen.getByRole('button', { name: '연금복권 720+' });
    expect(pensionBtn).toHaveAttribute('aria-current', 'page');
  });

  it('탭 클릭 시 onTabChange가 호출된다', () => {
    const onTabChange = vi.fn();
    render(<Header activeTab="lotto" onTabChange={onTabChange} />);
    fireEvent.click(screen.getByRole('button', { name: '연금복권 720+' }));
    expect(onTabChange).toHaveBeenCalledWith('pension');
  });
});
