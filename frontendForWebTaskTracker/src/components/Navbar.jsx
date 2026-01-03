
function Navbar() {
  
  return (
    <div>
          <div className="flex items-center justify-between h-16 w-full px-4 sm:px-6 lg:px-10 border-b border-gray-700">
            <h3 className="text-[25px] sp-text font-bold">Task Tracker</h3>
            <div className="flex items-center text-2xl font-bold gap-3.75">
                <div >Home</div>
                <div >Dashboard</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar