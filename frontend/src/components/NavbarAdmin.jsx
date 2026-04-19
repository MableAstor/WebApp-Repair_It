import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavbarAdmin({ title = "Admin", children }) {
  const navigate = useNavigate();

  return (
    <div className="drawer lg:drawer-open bg-[#CDBCDB] min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ส่วนเนื้อหาด้านขวา (Navbar + Cards) */}
      <div className="drawer-content flex flex-col w-full min-h-screen">
        {/* Navbar */}
        <nav className="w-full bg-[#433D8B] shadow-sm py-4 flex items-center px-4 sticky top-0 z-10">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost border-none hover:bg-[#635d94] lg:hidden"
          >
            <svg
              className="w-[24px] h-[24px] text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 6H6m12 4H6m12 4H6m12 4H6"
              />
            </svg>
          </label>
          <div className="flex-1 text-white text-3xl font-serif tracking-widest text-center pr-12 lg:pr-0">
            {title}
          </div>
        </nav>

        {/* พื้นที่แสดงการ์ด จัดกึ่งกลาง จำกัดความกว้าง*/}
        <main className="flex-1 w-full flex justify-center p-6">
          <div className="w-full max-w-md flex flex-col">{children}</div>
        </main>
      </div>

      {/* Sidebar เมนูทางซ้าย */}
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-screen flex-col items-start bg-[#433D8B] w-64 border-r border-[#342f6d]">
          <ul className="menu w-full grow px-4 py-6 text-white gap-2">
            <li>
              <button
                onClick={() => navigate("/pending")}
                className="hover:bg-[#635d94] text-lg font-bold py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-hourglass-split w-5 h-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                </svg>
                งานที่รอซ่อม
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/process")}
                className="hover:bg-[#635d94] text-lg font-bold py-3"
              >
                <svg
                  className="bi bi-gear w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                </svg>
                งานที่รับ
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/finished")}
                className="hover:bg-[#635d94] text-lg font-bold py-3"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                    clipRule="evenodd"
                  />
                </svg>
                งานที่เสร็จ
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
