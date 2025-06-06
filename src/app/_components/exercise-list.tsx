import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ExerciseList() {
  return (
    <div className="flex flex-col justify-center my-10 mx-3 gap-6">
      <div className="flex justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">لیست برنامه ها</h4>
        <Button asChild>
          <Link href="/coach-list">برنامه جدید</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">جلسه 1</h3>
            <div className="flex justify-end">
              <Button>جزییات</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">جلسه 2</h3>
            <div className="flex justify-end">
              <Button>جزییات</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">جلسه 3</h3>
            <div className="flex justify-end">
              <Button>جزییات</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">جلسه 4</h3>
            <div className="flex justify-end">
              <Button>جزییات</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">جلسه 5</h3>
            <div className="flex justify-end">
              <Button>جزییات</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">جلسه 6</h3>
            <div className="flex justify-end">
              <Button>جزییات</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
