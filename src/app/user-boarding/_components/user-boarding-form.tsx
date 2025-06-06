'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function UserBoardingForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>اطلاعات فردی</CardTitle>
        <CardDescription>این اطلاعات فقط مربی شما برای نوشتن برنامه ای بهتر دردسترس قرار می گیرد.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-4">
            <div className="grid gap-1">
              <Label>جنسیت</Label>
              <RadioGroup className="flex flex-row-reverse justify-between gap-1.5" defaultValue="man">
                <div className="flex items-center gap-1">
                  <RadioGroupItem id="r1" value="man" />
                  <Label htmlFor="r1">مرد</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem id="r2" value="women" />
                  <Label htmlFor="r2">زن</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem id="r3" value="custom" />
                  <Label htmlFor="r3">نامعلوم</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="fullname">نام و نام خانوادگی</Label>
              <Input required id="fullname" type="text" placeholder="نام و نام خانوادگی شما" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="age">سن</Label>
              <Input required id="age" type="number" placeholder="سن شما" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="height">قد</Label>
              <Input required id="height" type="number" placeholder="قد شما به صورت حدودی" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="weight">وزن</Label>
              <Input required id="weight" type="number" placeholder="وزن شما به صورت حدودی" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          // type="submit"
          asChild
          className="w-full"
        >
          <Link href="/">ثبت</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
