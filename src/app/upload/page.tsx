import { UploadFile } from './upload-file';

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-3.5 justify-center items-center">
      <h3>upload page</h3>

      <div className="w-[50%]">
        <UploadFile />
      </div>
    </div>
  );
}
