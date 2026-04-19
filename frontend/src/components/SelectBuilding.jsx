export default function SelectBuilding({ value, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="select w-full bg-white text-[#2A2A48] text-md font-bold rounded-2xl h-12 px-5 border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7670AC]"
        >
            <option value="">เลือกอาคาร</option>
            <option value="building1">อาคาร 1</option>
            <option value="building5">อาคาร 5</option>
            <option value="building7">อาคาร 7</option>
        </select>
    );
}