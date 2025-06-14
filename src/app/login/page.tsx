'use client';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { signIn, useSession } from '@/lib/auth-client';

export default function LoginPage() {
  const { data } = useSession();

  const onClick = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: '/user-boarding',
    });
    console.log({ data });
  };

  console.log({ data });

  return (
    <div className="h-[100dvh] flex justify-center items-center flex-col gap-4">
      <Image height={300} width={300} alt="Logo" className="rounded-2xl" src="/logo.png" priority />
      <Button onClick={onClick}>ورود با گوگل</Button>
    </div>
  );
}
