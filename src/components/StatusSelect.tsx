"use client";

import { Status, STATUSES } from "@/lib/statuses";

const statusColor: Record<Status, string> = {
  saved: "text-blue-400",
  applied: "text-green-400",
  interview: "text-yellow-500",
  rejected: "text-red-500",
};

const StatusSelect = ({ current }: { current: Status }) => {
  return (
    <select
      name="status"
      defaultValue={current}
      className={`italic text-xs cursor-pointer transition-colors duration-200
                hover:text-blue-300 px-2 py-1 rounded-2xl ${statusColor[current]}`}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default StatusSelect;
