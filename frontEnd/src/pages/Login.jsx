import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  async function onSubmit(data) {
    try {
      const res = await axios.post("http://localhost:3000/login", data);
    toast.success("Đăng nhập thành công");
    setTimeout(() => {
      navigate("/")
    }, 800)
    localStorage.setItem("token", res.data.accessToken);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Email hoặc mật khẩu không đúng!");
    }
    
  }
  return (
    <div>
      <h1 className="text-center my-2">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("email")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            {...register("password")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
