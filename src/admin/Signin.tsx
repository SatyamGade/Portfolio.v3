import { FormEvent, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedIn, themeState, token } from "../assets/store/state";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const darkmode = useRecoilValue(themeState);
  const setIsloggedin = useSetRecoilState(isLoggedIn);
  const setJwtToken = useSetRecoilState(token);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })

      if (res.ok) {
        const data = await res.json();
        setUsername("");
        setPassword("");
        toast.success(data.message);
        localStorage.setItem("portfolioToken", data.token);
        setJwtToken(data.token);
        setIsloggedin(true);
        navigate('/');
      } else {
        const data = await res.text();
        toast.error(data);
      }

    } catch (error) {
      console.log('signin error: ', error);
    }
  }

  return (
    <div className={`py-2 px-4 md:py-4 md:px-8 lg:px-28 w-full h-screen flex justify-center items-center ${darkmode ? "text-Txt bg-bodyBg" : "text-black bg-white"}`}>
      <form className={`w-fit p-6 lg:py-8 lg:px-10 rounded ${darkmode ? "bg-navbarBg text-Txt" : "border"}`} onSubmit={handleSubmit}>
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl">Sign In</h1>
          <p className="text-xs mt-1 font-extralight lg:font-light">as Admin</p>
        </div>
        <div className="mt-8">
          <input required className={`border-b border-solid outline-none transition-all ease-in-out ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="text" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input required className={`border-b border-solid outline-none transition-all ease-in-out mt-3 ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={`text-center py-1 mt-8 cursor-pointer transition ease-in-out active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
          <button type="submit" className="font-medium w-full h-full">Sign In</button>
        </div>
      </form>
    </div>
  )
}

export default Signin
