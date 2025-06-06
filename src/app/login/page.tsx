import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="h-[100dvh] flex justify-center items-center flex-col gap-4">
      <Image height={300} width={300} alt="Logo" className="rounded-2xl" src="/logo.png" priority />
      <Button asChild>
        <Link href="/user-boarding">ورود با گوگل</Link>
      </Button>
    </div>
  );
}
