const UserDetails = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200  shadow-sm">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>

      <div className="space-y-2">
        <p className="">
          <span className="font-semibold ">Name:</span> {user?.Name}
        </p>

        <p className=" break-all">
          <span className="font-semibold">Email:</span> {user?.Email}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
