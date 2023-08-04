import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlus,
} from "react-icons/ai";
import Addtask from "./AddTask";
import { state } from "./AddTask";
import { subscribe, useSnapshot } from "valtio";

interface Task {
  id: string | number;
  icon: string;
  title: string;
  date: Date | number;
  time: string;
  startTime: string;
  endTime: string;
  details: readonly string[];
  pinned: boolean;
  images: string[];
  color: string;
  personal: boolean;
  formToggle: boolean;
  setFormToggle: React.Dispatch<React.SetStateAction<boolean>>;
  editTaskId: number | null;
}

const Second: React.FC = () => {
  const [formToggle, setformToggle] = useState(false);
  const [filterTasks, setFilterTasks] = useState<Task[]>([]);
  const snapshot = useSnapshot(state);
  // const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [selectDate, setSelectDate] = useState(new Date());

  useEffect(() => {
    setFilterTasks(snapshot.arrData);
  }, [state.arrData, snapshot]);

  useEffect(() => {
    const unsubscribe = subscribe(state, () => {
        if (state.calenderDate) {
            setSelectDate(state.calenderDate);
        } else {
            setSelectDate(new Date());
        }
    });
    return () => unsubscribe();
}, [state.calenderDate]);


useEffect(() => {
    const unsubscr = subscribe(state, () => {
        if (state.formToggle) {
            setShowForm(state.formToggle);
        } else {
            setShowForm(false);
        }
    });
    return () => unsubscr();
}, [state.formToggle]);


  // const toggleForm = () => {
  //   setformToggle((prev) => !prev);
  // };

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

  const handleChangeDate = (view: number) => {
    const changeDate = new Date(selectDate);
    changeDate.setDate(changeDate.getDate() + view);
    setSelectDate(changeDate);
};
const filteredData = [...snapshot.arrData].filter((task) => {
  return new Date(task.date).toLocaleDateString() === selectDate.toLocaleDateString()
}).sort((a, b) => {
  if (a.pinned && !b.pinned) return -1;
  if (!a.pinned && b.pinned) return 1;
  return 0;
});
  // const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // useEffect(() => {
  //   // Assuming each task has a "date" property to represent the day
  //   // Filter the tasks based on the selected day index
  //   const selectedDayTasks = state.arrData.filter(
  //     (task) => task.date === snapshot.arrData[selectedDayIndex].date
  //   );
  //   setFilterTasks(selectedDayTasks);
  // }, [selectedDayIndex, state.arrData, snapshot]);

  // ... (handleDelete, handlePinToggle, and handleEdit functions)

  // // Function to handle navigation to the previous day
  // const handlePrevDay = () => {
  //   setSelectedDayIndex((prevIndex) =>
  //     prevIndex === 0 ? prevIndex : prevIndex - 1
  //   );
  // };

  // // Function to handle navigation to the next day
  // const handleNextDay = () => {
  //   setSelectedDayIndex((prevIndex) =>
  //     prevIndex === snapshot.arrData.length - 1 ? prevIndex : prevIndex + 1
  //   );
  // };

  return (
    <div className="w-full md:max-w-[768px] px-10 relative">
      {/* {today} */}
      <div className="flex justify-between  pt-10 ">
        <p className="text-5xl font-normal">Today's schedule</p>
        
        <div
          className=" bg-yellow-500 logobox w-[3rem] h-[3rem] flex justify-center items-center "
          onClick={() => setformToggle(!formToggle)}
          // onFocus={()=>setformToggle(true)}

          // onBlur={()=>setformToggle(false)}
        >
          <AiOutlinePlus className="text-white" size={25} />
        </div>
      </div>
      <aside className="flex items-center gap-4  mt-3">
                        <h1 className="text-3xl leading-[50px] tracking-wide text-[#f5bd6c] md:text-2xl lg:text-4xl  w-52 lg:w-64">
                            {selectDate.toLocaleDateString(undefined, {
                                weekday: 'long',
                                day: 'numeric',
                            })}
                        </h1>
                        <a className="material-symbols-outlined bg-[#edeff3] cursor-pointer select-none w-6 h-6 rounded-full text-lg font-semibold flex items-center justify-center md:text-base md:w-5 md:h-5 lg:w-6 lg:h-6 lg:text-lg "
                            onClick={() => handleChangeDate(-1)}>
                            arrow_back
                        </a>
                        <a className="material-symbols-outlined bg-[#edeff3] cursor-pointer select-none w-6 h-6 rounded-full text-lg font-semibold flex items-center justify-center md:text-base md:w-5 md:h-5 lg:w-6 lg:h-6 lg:text-lg "
                            onClick={() => handleChangeDate(+1)}>
                            arrow_forward
                        </a>
                    </aside>
      <div
        className="z-30 absolute top-[7rem] left-[17rem]  h-10 "
        id="addTaskPopup"
      >
        {formToggle && <Addtask />}
      </div>

      <div className="py-1 flex gap-3 items-center pb-16">
        {/* Show the selected day's date */}
        {/* <p className="text-5xl font-normal text-yellow-500">
          {snapshot.arrData[selectedDayIndex].date}
        </p> */}
        {/* Button to navigate to the previous day */}
        {/* <button
          className="bg-slate-400 rounded-full p-1 h-max"
          onClick={handlePrevDay}
        >
          <AiOutlineArrowLeft size={15} />
        </button> */}
        {/* Button to navigate to the next day */}
        {/* <button
          className="bg-slate-400 rounded-full p-1 h-max"
          onClick={handleNextDay}
        >
          <AiOutlineArrowRight size={15} />
        </button> */}
      </div>

      {/* ------------------------------------------------------- */}

      <div className="flex flex-col ">
        {filteredData.map((data) => (
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

      {/* <div className="z-30 absolute top-[7rem] left-[17rem] h-10"> */}
      {/* Show Addtask component for adding/editing tasks based on formToggle and editTaskId */}
      {/* {formToggle && <Addtask/>} */}
      {/* </div> */}
      {/* {thursday} */}

      {/* <div className=" py-1 flex gap-3 items-center pb-16">
        <p className="text-5xl font-normal text-yellow-500"> Thursday 11</p>
        <button className="bg-slate-400 rounded-full p-1 h-max">
          <AiOutlineArrowLeft size={15} />
        </button>
        <button className="bg-slate-400 rounded-full p-1 h-max">
          <AiOutlineArrowRight size={15} />
        </button>
      </div> */}

      {/* {content} */}

      {/* <div className="flex gap-4 w-full">
        <input type="checkbox" className="w-5 h-5 mt-8" />
        <div className="bg-yellow-500 w-full flex py-6 rounded-xl px-2 gap-3 items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="bg-white w-10 h-10 flex items-center justify-center rounded-xl">
              ⏰
            </p>
            <p className="text-xl font-medium">Wake up Buddy</p>
          </div>
          <div className="text-lg font-normal ">
            <p>7:00 AM</p>
          </div>
        </div>
      </div> */}

      {/* {morning} */}

      {/* <div className="flex gap-4 w-full mt-5">
        <input type="checkbox" className="w-5 h-5 mt-8" />
        <div className="bg-yellow-500 w-full flex py-6 rounded-xl px-2 gap-3 items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="bg-white w-10 h-10 flex items-center justify-center rounded-xl">
              ⏰
            </p>
            <p className="text-xl font-medium">Morning Yoga</p>
          </div>
          <div className="text-lg font-normal ">
            <p>8:30 AM</p>
          </div>
        </div>
      </div> */}

      {/* {daily workout} */}

      {/* <div className="flex w-full mt-5 gap-4">
        <input type="checkbox" className="w-5 h-5 mt-8" />
        <div className="bg-slate-200 rounded-xl w-full flex shadow-xl justify-between">
          <div className="flex flex-row py-2 gap-5">
            <div className="flex py-2  px-2">
              <p className="bg-white w-10 h-10 flex items-center justify-center rounded-xl">
                🏋️‍♂️
              </p>
            </div>
            <div className="  pl-7 flex flex-col items-start ">
              <h3 className="text-xl font-medium items-start">Daily workout</h3>
              <ul className="list-disc list-outside mt-5 font-medium text-base opacity-70">
                <li> Squat 10*3</li>
                <li> Push up 10*3</li>
                <li>Push up 10*3</li>
              </ul>
            </div>
          </div>
          <div className="p-5 text-lg font-normal">
            <p>9:00 AM</p>
          </div>
        </div>
      </div> */}

      {/* {shift project} */}

      {/* <div className="flex w-full mt-5 gap-4">
      <input type="checkbox" className="w-5 h-5 mt-8" />
        <div className="bg-slate-200 rounded-xl w-full flex shadow-xl justify-between">
          <div className="flex flex-row py-2 gap-5">
            <div className="flex py-2  px-2">
              <p className="bg-white w-10 h-10 flex items-center justify-center rounded-xl">
                👨‍💻
              </p>
            </div>
            <div className="  pl-7 flex flex-col items-start ">
              <h3 className="text-xl font-medium items-start">Shift project kick off pt.1</h3>
              <p className="py-2 font-medium text-sm opacity-75">Zoom call,kick off with Elena <br />and jordan from shift</p>
              <div className="flex py-4">
                <img src="../assets/animated1.png" alt="" className="w-10 h-10 rounded-full" />
                <img src="../assets/animated2.jpeg" alt="" className="w-10 h-10 rounded-full"/>
                <img src="../assets/animated3.png" alt="" className="w-10 h-10 rounded-full"/>
                <p>+3 attendees</p>
              </div>
            </div>
          </div>
          <div className="p-5 text-lg font-normal">
            <p>10:00 AM</p>
            <p>11:00 AM</p>
          </div>
        </div>
      </div> */}

      {/* {skype} */}

      {/* <div className="flex w-full mt-5 gap-4">
      <input type="checkbox" className="w-5 h-5 mt-8" />
        <div className="bg-slate-200 rounded-xl w-full flex shadow-xl justify-between">
          <div className="flex flex-row py-2 gap-5">
            <div className="flex py-2  px-2">
              <p className="bg-white w-10 h-10 flex items-center justify-center rounded-xl">
                🪂
              </p>
            </div>
            <div className="  pl-7 flex flex-col items-start ">
              <h3 className="text-xl font-medium items-start">Skype Sushi</h3>
              <p className="py-2 font-medium text-sm opacity-75">Lunch with Ally ,fight this <br />quarantie with humor!</p>
             
            </div>
          </div>
          <div className="p-5 text-lg font-normal">
            <p>12:30 AM</p>
          </div>
        </div>
      </div> */}

      {/* {dribble shot} */}

      {/* <div className="flex w-full mt-5 gap-4">
      <input type="checkbox" className="w-5 h-5 mt-8" />
        <div className="bg-slate-200 rounded-xl w-full flex shadow-xl justify-between">
          <div className="flex flex-row py-2 gap-5">
            <div className="flex py-2  px-2">
              <p className="bg-white w-10 h-10 flex items-center justify-center rounded-xl">
              👨‍💻
              </p>
            </div>
            <div className="  pl-7 flex flex-col items-start ">
              <h3 className="text-xl font-medium items-start">Dribble Shot</h3>
              <p className="py-2 font-medium text-sm opacity-75">Lunch with Ally ,fight this <br />quarantie with humor!</p>
             
            </div>
          </div>
          <div className="p-5 text-lg font-normal">
            <p>2:00 AM</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Second;
function setSelectDate(arg0: Date) {
  throw new Error("Function not implemented.");
}

function setShowForm(formToggle: boolean) {
  throw new Error("Function not implemented.");
}

