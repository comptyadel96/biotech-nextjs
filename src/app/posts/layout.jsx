import SideBar from "../ui/sideBar"

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-gray-100 py-10">
      <SideBar />
      <div className="lg:ml-10 w-full">{children}</div>
    </div>
  )
}
