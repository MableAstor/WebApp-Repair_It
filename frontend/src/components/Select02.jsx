export default function Select02() {
    return (
        <div className="mt-4 ">
            <select defaultValue="เลือกปัญหา" className="select
            w-full bg-white text-[#2A2A48] text-md font-bold rounded-2xl h-12 px-5 border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7670AC]">
                <option disabled={true}>เลือกปัญหา</option>
                <option>พื้น</option>
                <option>เพดาน</option>
                <option>กำแพง</option>
                <option>ประตู</option>
                <option>ลิฟต์</option>
                <option>บันได</option>
                <option>หน้าต่าง</option>
            </select>
        </div>
    );
}
