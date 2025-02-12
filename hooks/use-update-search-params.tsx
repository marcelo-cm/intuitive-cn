import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    params: Record<string, string | number | boolean | null | undefined>,
  ) => {
    if (!searchParams) return;

    const nextSearchParams = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(params)) {
      if (value == null) {
        nextSearchParams.delete(key);
      } else {
        nextSearchParams.set(key, String(value));
      }
    }

    router.replace(`${pathname}?${nextSearchParams.toString()}`, {
      scroll: false,
    });
  };
};
