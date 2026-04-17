export default function Select({ category, setCategory }) {
    return (
        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select
            w-full bg-white text-[#2A2A48] text-md font-bold rounded-2xl h-12 px-5 border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7670AC]"
        >
            <option value="">เลือกปัญหา</option>
            <option value="AIR_CONDITIONER">เครื่องปรับอากาศ</option>
            <option value="ELECTRICAL_PROJECTOR">โปรเจ็คเตอร์</option>
            <option value="ELECTRICAL_LIGHT">หลอดไฟ</option>
            <option value="WATER_PIPE">ท่อน้ำ</option>
            <option value="WATER_SINK">อ่างล้างมือ</option>
            <option value="WATER_TOILET">ชักโครก</option>
            <option value="FURNITURE">โต๊ะเล็กเก้าอี้</option>
            <option value="NETWORK">คอมพิวเตอร์</option>
            <option value="CLEANING">งานทำความสะอาด</option>
            <option value="OTHER">อื่น ๆ</option>
        </select>
    );
}