'use server';
import fs from 'node:fs/promises';

export async function uploadFileAction(previousState: string | null, formData: FormData) {
  const file = formData.get('file') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const fileName = `${new Date().toDateString().replaceAll(' ', '-')}-${file.name.replace(' ', '-')}`.toLowerCase();
  await fs.writeFile(`./public/uploads/${fileName}`, buffer);

  return fileName || null;
}
