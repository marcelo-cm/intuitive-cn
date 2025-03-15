'use client';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button onClick={() => toast.success('Hello')}>Toast</Button>
        </div>
      </main>
    </div>
  );
}
