import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function CoachListPage() {
  return (
    <main className="flex flex-col items-center my-4 gap-6">
      <h3 className="text-lg font-semibold">لیست مربی ها</h3>
      <div className="flex gap-3">
        <Input placeholder="جستجو بر اساس نام مربی" />
        <Button>جستجو</Button>
      </div>
      <section>
        <Card>
          <CardHeader className="flex items-center">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <CardTitle>محمود موسوی</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>سابقه 10 سال فینتس و برنده مدال طلا فیزیک بدن و 6 دوره حضور در مستر المپیا</CardDescription>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
