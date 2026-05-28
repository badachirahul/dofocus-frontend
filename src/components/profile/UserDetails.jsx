import { UserOutlined } from "@ant-design/icons";

const UserDetails = ({ user }) => {
  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="bg-[#111111] p-6 sm:p-7 rounded-2xl border border-white/[0.08] fade-in-up">
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-white text-black flex items-center justify-center text-2xl sm:text-3xl font-semibold tracking-tight shrink-0">
          {initial !== "U" ? initial : <UserOutlined />}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium m-0">
            Profile
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight m-0 mt-1 truncate">
            {user?.name || "—"}
          </h2>
          <p className="text-neutral-400 text-sm m-0 mt-1 break-all">
            {user?.email || "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
