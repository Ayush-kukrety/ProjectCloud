'use client'
import Image from "next/image";
import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone, FileRejection, Accept } from "react-dropzone";
import toast from "react-hot-toast";
import { FaFile, FaUpload } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

interface Props {
    className: string;
    group: boolean;
    maxFiles: number;
    filetype: string;
    files: FileWithPreview[];
    setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
}

interface FileWithPreview extends File {
    preview?: string;
}

const DropZone = ({ className, group, maxFiles, filetype, files, setFiles }: Props) => {

    const acceptedFileType = (filetype: string): Accept => {
        switch (filetype) {
            case 'img':
                return {
                    'image/*': ['.png', '.jpeg', '.jpg'],
                };
            case 'doc':
                return {
                    'application/msword': ['.doc', '.docx', '.pptx', '.pdf', '.pptx', '.xls', '.xlsx'],
                };
            default:
                return {};
        }
    };

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            const validFiles = acceptedFiles.slice(0, maxFiles - files.length);

            const filesWithPreview: FileWithPreview[] = validFiles.map(file => {
                const fileWithPreview = file as FileWithPreview;
                fileWithPreview.preview = URL.createObjectURL(file);
                return fileWithPreview;
            });

            setFiles(prevFiles => [...prevFiles, ...filesWithPreview]);

            if (fileRejections.length > 0) {
                toast.error("Some files were rejected:");
                // Optionally, display an error message to the user
            }

            // Clean up previews when component unmounts or files change
            return () => {
                filesWithPreview.forEach(file => {
                    if (file.preview) {
                        URL.revokeObjectURL(file.preview);
                    }
                });
            };
        },
        [maxFiles, files.length, setFiles]
    );

    const removeFile = (name: string) => {
        setFiles(files => files.filter(file => file.name !== name));
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop, 
        accept: acceptedFileType(filetype),
        multiple: group
    });

    return (
        <div className="space-y-4">
            <div 
                {...getRootProps({ 
                    className: `${className} transition-all duration-300 ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : ''}` 
                })}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <FaUpload className="text-3xl mb-2" />
                    {isDragActive ? (
                        <p>Drop {group ? 'the files' : 'the file'} here ...</p>
                    ) : (
                        <p>Drag & Drop or Click to {group ? 'Select Files' : 'Select a File'}</p>
                    )}
                    <p className="text-sm mt-2">
                        {group ? `Max ${maxFiles} files` : ''} ({filetype === 'img' ? 'Images' : 'Documents'})
                    </p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {files.map((file, i) => (
                        <div key={i} className="relative group">
                            <div className="w-full h-40 border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                {file.type.startsWith('image/') ? (
                                    file.preview ? (
                                        <Image className="w-full h-full object-contain" src={file.preview} alt="Preview" height={300} width={600} />
                                    ) : null
                                ) : (
                                    <div className="text-center p-4">
                                        <FaFile className="text-4xl mx-auto mb-2 text-gray-400" />
                                        <p className="text-sm truncate">{file.name}</p>
                                    </div>
                                )}
                            </div>
                            <button
                                type='button'
                                className='absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                                onClick={() => removeFile(file.name)}
                            >
                                <FaXmark className='w-5 h-5' />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropZone;
