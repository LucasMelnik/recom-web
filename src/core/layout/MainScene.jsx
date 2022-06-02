import { useContext } from "react"
import { Context } from "../../context/AuthContext"
import Login from "../../pages/login/Login"
import Routes from "../../Routes"
import Header from "./menu/Header"

export default function MainScene() {
  const { authenticated } = useContext(Context)

  if (authenticated) {
    return (
      <>
      <Header />
      <div className='body'>
        <Routes />
      </div>
      </>
    )
  } else {
    return (
      <div style={{ backgroundColor: '#1dc8f7', height: '100vw', paddingTop: '100px'}}>
        <Login />
      </div>
    )
  }
}
