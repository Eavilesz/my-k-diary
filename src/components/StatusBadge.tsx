import { Status } from "@/lib/posts";

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyle = (status: Status) => {
    switch (status) {
      case "Finalizado":
        return "bg-green-100 text-green-700";
      case "Viendo":
        return "bg-yellow-100 text-yellow-700";
      case "Abandonado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
}
