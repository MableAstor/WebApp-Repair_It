export default function Select02({ category, setCategory }) {
    return (
        <div className="mt-4">
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select w-full bg-white text-[#2A2A48] text-md font-bold rounded-2xl h-12 px-5 border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7670AC]"
            >
                <option value="">เลือกปัญหา</option>
                <option value="OTHER_FLOOR">พื้น</option>
                <option value="OTHER_CEILING">เพดาน</option>
                <option value="OTHER_WALL">กำแพง</option>
                <option value="OTHER_DOOR">ประตู</option>
                <option value="OTHER_ELEVATOR">ลิฟต์</option>
                <option value="OTHER_STAIRS">บันได</option>
                <option value="OTHER_WINDOW">หน้าต่าง</option>
            </select>
        </div>
    );
}