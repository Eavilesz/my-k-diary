import { FaCheckCircle, FaPlayCircle, FaStopCircle } from "react-icons/fa";

type Status = "Viendo" | "Finalizado" | "Abandonado";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig = {
  Viendo: {
    icon: FaPlayCircle,
    color: "text-[#ff8ba7]",
  },
  Finalizado: {
    icon: FaCheckCircle,
    color: "text-[#ff8ba7]",
  },
  Abandonado: {
    icon: FaStopCircle,
    color: "text-[#ff8ba7]",
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { icon: Icon, color } = statusConfig[status];

  return (
    <div className="flex items-center gap-2 text-lg">
      <Icon className={`${color} text-xl`} />
      <span className="text-gray-700">{status}</span>
    </div>
  );
};

export default StatusBadge;
