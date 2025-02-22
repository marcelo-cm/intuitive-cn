import { act, renderHook } from '@testing-library/react';
import { toast } from 'sonner';

import { useGlobalLoading } from '@/hooks/use-global-loading';

import useServerAction from '../use-server-action';

// Mock dependencies
jest.mock('sonner');
jest.mock('@/hooks/use-global-loading');
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe('useServerAction', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    (useGlobalLoading as jest.Mock).mockReturnValue({
      setLoading: jest.fn(),
    });
  });

  // Test successful action with basic response
  it('should handle successful action with basic response', async () => {
    const mockAction = jest.fn().mockResolvedValue({
      status: 'success',
      data: { foo: 'bar' },
      error: null,
    });

    const onSuccess = {
      title: 'Success',
      message: 'Action completed',
    };

    const { result } = renderHook(() =>
      useServerAction({
        action: mockAction,
        onSuccess,
        onError: { title: 'Error' },
      }),
    );

    const [clientAction, executing] = result.current;

    expect(executing).toBe(false);

    let actionResult;
    await act(async () => {
      actionResult = await clientAction();
    });

    expect(actionResult).toEqual({ foo: 'bar' });
    expect(toast.success).toHaveBeenCalledWith('Success', {
      description: 'Action completed',
      closeButton: true,
    });
  });

  // Test action with multiple parameters
  it('should handle action with multiple parameters', async () => {
    const mockAction = jest.fn().mockResolvedValue({
      status: 'success',
      data: { foo: 'bar' },
      error: null,
    });

    const { result } = renderHook(() =>
      useServerAction({
        action: mockAction,
        onError: { title: 'Error' },
      }),
    );

    const [clientAction] = result.current;

    let actionResult;
    await act(async () => {
      actionResult = await clientAction('param1', 123, { key: 'value' });
    });

    expect(actionResult).toEqual({ foo: 'bar' });
    expect(mockAction).toHaveBeenCalledWith('param1', 123, { key: 'value' });

    expect(toast.success).not.toHaveBeenCalled();
  });

  // Test void return type
  it('should handle action returning void', async () => {
    const mockAction = jest.fn().mockResolvedValue({
      status: 'success',
      data: undefined,
      error: null,
    });

    const { result } = renderHook(() =>
      useServerAction({
        action: mockAction,
        onError: { title: 'Error' },
      }),
    );

    const [clientAction] = result.current;

    await act(async () => {
      const result = await clientAction();
      expect(result).toBeUndefined();
    });
  });

  // Test loading state
  it('should manage loading state correctly', async () => {
    const setLoading = jest.fn();
    (useGlobalLoading as jest.Mock).mockReturnValue({ setLoading });

    const mockAction = jest
      .fn()
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve({ status: 'success', data: null, error: null }),
              100,
            ),
          ),
      );

    const { result } = renderHook(() =>
      useServerAction({
        action: mockAction,
        onError: { title: 'Error' },
      }),
    );

    const [clientAction] = result.current;

    await act(async () => {
      const actionPromise = clientAction();
      expect(setLoading).toHaveBeenCalledWith(true);
      await actionPromise;
    });

    expect(setLoading).toHaveBeenCalledWith(false);
  });

  // Test error handling
  it('should handle errors correctly', async () => {
    const mockAction = jest.fn().mockResolvedValue({
      status: 'error',
      error: { message: 'Test error' },
      data: null,
    });

    const onError = {
      title: 'Error Title',
      message: 'Error Message',
    };

    const { result } = renderHook(() =>
      useServerAction({
        action: mockAction,
        onError,
      }),
    );

    const [clientAction] = result.current;

    await act(async () => {
      await clientAction();
    });

    expect(toast.error).toHaveBeenCalledWith('Error Title', {
      description: 'Error Message',
      closeButton: true,
    });
  });
});
