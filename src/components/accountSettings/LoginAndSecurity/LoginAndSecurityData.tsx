import Button from "../../ui/Button";

function LoginAndSecurityData() {
  return (
    <div className="flex-[2]">
      <div>
        <h2 className="text-stone-700 font-bold text-2xl border-b pb-6">
          Login
        </h2>
      </div>
      <div className="border-b pb-8 pt-4 flex justify-between">
        <div>
          <h2 className="font-bold">Password</h2>
          <p className=" text-secondary text-lg">Last updated a day ago</p>
        </div>
        <div>
          <Button className="text-primary text-xl font-medium">
            <span>Update</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginAndSecurityData;
