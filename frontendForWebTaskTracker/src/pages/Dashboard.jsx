import { useState,useEffect } from 'react'
import api from "../utils/api";

function Dashboard() {
    const [items, setItems] = useState([]);
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [editItem,setEditItem]=useState(false);
    const [fetch,setFetch]=useState(true);
    const [dueDate,setDueDate]=useState("");
    const [priority,setPriority]=useState("low");
    const [status,setStatus]=useState("pending");
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
    api.get("/tasks")
        .then(res => setItems(res.data))
        .catch(console.error);
    }, [items]);

    const createTask=async (e)=>{
        e.preventDefault();
        if(!title || !dueDate){
        alert("fill title atleast");
        return;
        }
        const res=await api.post("/tasks",{
            title,
            description,
            dueDate,
            priority,
            status
        });
        setItems([...items,res.data]);
        resetForm();
    }
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("low");
        setStatus("pending");
        setEditItem(false);
        setCurrentId(null);
    };
    const updateTask=async (e)=>{
        e.preventDefault();
        const res=await api.put(`/tasks/${currentId}`,{title,description,dueDate,priority,status});
        setItems(prev =>
            prev.map(it => it._id === currentId ? res.data : it)
        );
        resetForm();
    }
    const discardChange=(e)=>{
        e.preventDefault();
        resetForm();
    }
    const deleteTask=async (id)=>{
         if (!confirm("Delete this item?")) return;
        await api.delete(`/tasks/${id}`);
        setItems(items.filter((it) => it.id !== id));
    }
    const editTask=(item)=>{
        setEditItem(true);
        setCurrentId(item._id);
        setTitle(item.title);
        setDescription(item.description);
        setDueDate(item.dueDate);
        setPriority(item.priority);
        setStatus(item.status);
    }
    
  return (
    <>
    <div className='upper flex flex-col md:flex-row justify-center items-center border-2 border-gray-400 m-2 p-4 w-full'>
        <h5 className='text-2xl'>CRUD on Tasks</h5>
        <input type="text" className='m-2 p-2 w-full border border-gray-400 rounded-lg text-black font-bold ' value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder='Title'/>
        <textarea name=" description" className='m-2 h-30 w-full p-2 border border-gray-400 rounded-lg' value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='description' ></textarea>
        <div className='flex flex-row justify-around w-full '> 
            <div className='m-2 p-2 w-[1/3]'>
                <label >Due Date : </label>
                <input type="date" className='m-1 p-1 border border-gray-400 rounded-lg text-black ' value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
            </div> 
            <div className='m-2 p-2 w-[1/3]'>
            <label >Priority : </label>
            <select name="priority" className='m-1 p-1 border border-gray-400 rounded-lg text-black' value={priority}
  onChange={(e) => setPriority(e.target.value)}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
            </div>
            <div className='m-2 p-2 w-[1/3]'>
                <label >Status : </label>
                <select name="priority" className='m-1 p-1 border border-gray-400 rounded-lg text-black' value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value="pending">pending</option>
                <option value="complete">complete</option>
                </select>
            </div>
        </div>
        {
            (!editItem)?
            <div className='flex flex-wrap gap-1'>
                <button onClick={createTask} className='hover:opacity-50 hover:cursor-pointer m-1 p-1 px-3 border-2 border-gray-400 rounded-lg text-black font-bold'>create</button>
                <button onClick={()=>setFetch(true)} className='hover:opacity-50 hover:cursor-pointer m-1 p-1 px-3  border-2 border-gray-400 rounded-lg text-black font-bold'>fetch</button>
                </div>
            :<div className='flex flex-wrap gap-3'>
                <button onClick={updateTask} className='hover:opacity-50 hover:cursor-pointer m-1 p-1 px-3 border-2 border-gray-400 rounded-lg text-black font-bold'>update</button>
                <button onClick={discardChange} className='hover:opacity-50 hover:cursor-pointer m-1 p-1 px-3 border-2 border-gray-400 rounded-lg text-black font-bold'>discard</button>
            </div>
        }
        
        
    </div>
    {

    fetch?
    <div className='lower overflow-x-auto flex flex-col justify-center items-center border-2 border-gray-400 m-2 p-4 w-full'>
        <h5 className='text-xl md:text-2xl font-bold'>Tasks List</h5>
        <table className='border border-gray-300 min-w-full '>
            <thead className=' '>
                <tr className='flex text-2xl font-bold justify-between m-0.5 p-2'>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>priority</th>
                <th>status</th>
                <th>options</th>
                </tr>
            </thead>
            <tbody className=''>
                {
                items.map((it)=>(<tr key={it._id} className='flex text-base md:text-2xl flex-wrap-col font-bold justify-between m-0.5 p-2'>
                    <td className='max-w-8'>{it.title}</td>
                    <td className='max-w-8'>{it.description}</td>
                    <td>{new Date(it.dueDate).toLocaleDateString()}</td>
                    <td>{it.priority}</td>
                    <td>{it.status}</td>
                    <td><div className='flex flex-wrap gap-2'>
                        <button onClick={()=>editTask(it)} className='p-1 hover:opacity-50 hover:cursor-pointer border border-gray-400 rounded-lg text-black font-bold'>edit</button>
                        <button onClick={()=>deleteTask(it._id)} className='p-1 hover:opacity-50 hover:cursor-pointer border border-gray-400 rounded-lg text-black font-bold'>delete</button>
                        </div>
                    </td>
                    </tr>
                ))
                }
                
            </tbody>
        </table>
    </div>:<div></div>
    }
    </>
  )
}

export default Dashboard