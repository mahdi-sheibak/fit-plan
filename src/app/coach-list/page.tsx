import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CoachListPage() {
  return (
    <div className="flex flex-col items-center my-4 gap-6">
      <h3 className="text-lg font-semibold">لیست مربی ها</h3>
      <div className="flex gap-3">
        <Input placeholder="جستجو بر اساس نام مربی" />
        <Button>جستجو</Button>
      </div>
    </div>
  );
}
