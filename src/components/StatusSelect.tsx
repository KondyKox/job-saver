"use client";

type Props = {
  statuses: readonly string[];
  current: Status;
  className?: string;
};

type Status = "saved" | "applied" | "interview" | "rejected";

const StatusSelect = ({ statuses, current }: Props) => {
  const statusColor: Record<Status, string> = {
    saved: "text-blue-400",
    applied: "text-green-400",
    interview: "text-yellow-500",
    rejected: "text-red-500",
  };

  return (
    <select
      name="status"
      defaultValue={current}
      className={`italic text-xs cursor-pointer transition-colors duration-200 hover:bg-white/80
                hover:text-black px-2 py-1 rounded-2xl ${statusColor[current]} ...`}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default StatusSelect;
