export default function Select({ value, onChange }) {
    return (
        <select value={value}
                onChange={(e) => onChange(e.target.value)}
                className="select w-full bg-white text-[#2A2A48] text-md font-bold rounded-2xl h-12 px-5 border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7670AC]">
            <option value="">เลือกปัญหา</option>
            <option value="AIR">เครื่องปรับอากาศ</option>
            <option value="PROJECTOR">โปรเจ็คเตอร์</option>
            <option value="LIGHT">หลอดไฟ</option>
            <option value="TOILET">ชักโครก</option>
            <option value="SINK">อ่างล้างมือ</option>
            <option value="WATER">ตู้กดน้ำ</option>
            <option value="TABLE">โต๊ะเล็คเชอร์</option>
            <option value="COMPUTER">คอมพิวเตอร์</option>
        </select>
    );
}
