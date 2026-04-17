import { useRef } from 'react';

export default function Btnupload({ onChange }) {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <button
                type="button"
                onClick={handleButtonClick}
                className="btn btn-circle bg-[#433D8B] border-none shadow-sm hover:bg-[#433D8B]/90 focus:outline-none focus:ring-2 focus:ring-[#7670AC]"
            >
                <img src="/upload.svg" alt="Upload Icon" className="w-7 h-7" />
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onChange}
                className="hidden"
            />
        </>
    );
}