const roomOptions = {
    'building1': ['1401', '1402', '1403', '1404', '1405', '1406'],
    'building5': ['5701', '5702', '5703', '5704', '5705', '5706'],
    'building7': ['7901', '7902', '7903'],
};

export default function SelectRoom({ building, value, onChange }) {
    const rooms = roomOptions[building] || [];

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={!building}
            className="select w-full bg-white text-[#2A2A48] text-md font-bold rounded-2xl h-12 px-5 border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7670AC] disabled:opacity-50"
        >
            <option value="">เลือกห้อง</option>
            {rooms.map((room) => (
                <option key={room} value={room}>
                    {room}
                </option>
            ))}
        </select>
    );
}