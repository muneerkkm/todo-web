import { AiOutlinePlus } from "react-icons/ai";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Addtask from "./AddTask";
import { state } from "./AddTask";
import { useSnapshot } from "valtio";
import { useState } from "react";

interface Task {
  id:string | number;
  icon: string;
  title: string;
  date: Date | number;
  time: string;
  startTime: string;
  endTime: string;
  details:readonly string[];
  pinned: boolean;
  images: string[];
  color: string;
  personal: boolean;
  formToggle: boolean;
  setFormToggle: React.Dispatch<React.SetStateAction<boolean>>;
  editTaskId: number | null;

}


const First = () => {
  // const [filters, setFilter] = useState<Task[]>([]);
  const snapshot = useSnapshot(state);
  const [formToggle, setformToggle] = useState(false);
  const [calenderDate, setCalenderDate] = useState<Date | Date[] | undefined>();



  // useEffect(() => {
  //   setFilter(snapshot.arrData);
  // }, [state.arrData, snapshot]);

  const handleDelete = (id: number) => {
    // Use the Valtio state updater function to delete the task from the state
    state.arrData = state.arrData.filter((task) => task.id !== id);
  };
  const handlePinToggle = (id: number) => {
    // Find the task with the given id
    const task = state.arrData.find((t) => t.id === id);
    if (task) {
      // Toggle the "pinned" property of the task
      task.pinned = !task.pinned;
      // Update the task in the state with the modified one
      state.arrData = [...state.arrData];
    }
  };
        
  const handleEdit = (data: Task[]) => {
    state.editArray = data;

    setformToggle(!formToggle);
  };
  const handleCalendarChange = (date: Date | Date[]) => {
    setCalenderDate(date);
    state.calenderDate = date; // Update the shared calenderDate when the calendar changes
};

  const filters = snapshot.arrData.filter((data)=>data.pinned);

  return (
    <div className="w-full md:max-w-[576px]  bg-slate-200 px-8 ">
        {/* {top} */}
      <div className="flex w-full gap-3 py-10">
        <div className=" bg-yellow-500 logobox w-[2.2rem] flex justify-center items-center ">
          <AiOutlinePlus className="text-white" size={25} />
        </div>
        <h2 className="flex font-bold text-2xl">TodoNinja</h2>
      </div>
      {/* {weekly} */}
      <div className="w-full text-xl font-normal flex justify-between items-center py-9">
        <p className="">weekly Pinned</p>
        <p className="font-medium text-sm text-yellow-600 ">view all</p>
      </div>
      {/* {call doctor} */}
      {/* map */}
      <div className="flex flex-col ">
        {filters.map((data) => (
          <div className="flex w-full mt-5 gap-4">
          <input type="checkbox" className="w-5 h-5 mt-8" />
          <div
            className={`bg-slate-200 rounded-xl w-full flex shadow-xl justify-between overflow-hidden${
              data.pinned ? "border-4 bg-yellow-500" : ""
            }`}
          >
            <div className="flex flex-row py-2 gap-5">
              <div className="flex py-2  px-2">
                {data.icon && (
                  <p className="bg-white w-10 h-10 flex items-center justify-center rounded-xl">
                    {data.icon}
                  </p>
                )}
              </div>
              <div className="  pl-7 flex flex-col items-start ">
                <h3 className="text-xl font-medium items-start">
                  {data.title}
                </h3>
                <ul className=" list-outside mt-5 font-medium text-base opacity-70">
                  <li> {data.details}</li>
                </ul>
              </div>
            </div>

            <div className="p-5 text-lg font-normal">
              <span
                className="material-symbols-outlined m text-red-600 "
                onClick={() => handleDelete(data.id)}
              >
                delete
              </span>
              <span
                className="material-symbols-outlined text-green-600"
                onClick={() => handlePinToggle(data.id)}
              >
                push_pin
              </span>

              <span
                className="material-symbols-outlined"
                onClick={() => handleEdit(data)}
              >
                edit_note
              </span>

              {data.time && <p>Time : {data.time}</p>}
              {data.startTime && data.endTime && (
                <span>
                  <p>start time : {data.startTime}</p>
                  <p>end time : {data.endTime}</p>
                </span>
              )}
            </div>
          </div>
        </div>
        ))}
      </div>
      {/* <div className="w-full bg-white rounded-xl shadow-2xl flex py-5 px-2 gap-3">
        
         <p className="flex justify-center w-[2.5rem] h-[2.2rem] items-center bg-yellow-500 rounded-lg mx-2">👨‍⚕️</p>
         
         <div className=" flex gap flex-col">
              <p className="font-bold text-lg">call doctor for tests </p>
              <p>15 Mar 2020 - 9.00 AM</p>
             
              <button className="bg-yellow-500 rounded-xl text-white  font-medium font-sarif my-4 w-max p-1 px-2"> Personal</button>
              
              <p className="font-medium text-sm">Ask for blood tests and GYM <br />certificate</p>

         </div>
      </div> */}
      {/* {dbay} */}
      <div className="bg-white my-5 py-4 rounded-xl shadow-xl px-1 flex item-center gap-3 ">
           <p className="w-[2.5rem] h-[2rem] bg-yellow-500 rounded-xl flex items-center justify-center mx-2">👸</p>
           <p className="font-semibold ">Muneer bday <span className="font-normal text-lg mx-5">6 may 1999</span></p>

      </div>
      {/* {pin} */}
      <div className="bg-white my-5 py-4 rounded-xl shadow-xl px-4 flex item-center gap-6 ">
         <div className=" bg-yellow-500 p-1 flex justify-center items-center rounded">
            <AiOutlinePlus className="text-white" size={25} />
         </div>
           <p className="font-semibold">Add new weekly pin</p>
      </div>
      {/* {calender} */}
      <div className="bg-white rounded-xl ">
      <Calendar className="w-full" vvalue={calenderDate} onChange={handleCalendarChange}/>
      </div>
    </div>
  );
};

export default First;




