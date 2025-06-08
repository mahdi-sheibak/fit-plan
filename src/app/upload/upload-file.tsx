'use client';
import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { uploadFileAction } from './upload-file.action';

export function UploadFile() {
  const [fileName, formAction] = useActionState(uploadFileAction, null);

  return (
    <form className="flex flex-col gap-3">
      <Input multiple={false} name="file" type="file" />
      {fileName && <p>upload file: {fileName}</p>}
      <Button formAction={formAction}>submit</Button>
    </form>
  );
}
