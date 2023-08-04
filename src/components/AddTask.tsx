import React, { useEffect, useState } from 'react';
import { proxy,useSnapshot } from 'valtio';

interface Task {
    id:string | number;
    icon: string;
    title: string;
    date: any | number;
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

const Addtask: React.FC = () => {
   const snapshot = useSnapshot(state)
   

   
    const [id, setAuthorid] = useState('');
    const [icon, setIcon] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [details, setetails] = useState<string[]>([]);
    const [pinned, setPinned] = useState(false);
    const [personal, setPersonal] = useState(false);
    const [images, setImage] = useState<string[]>([]);
    const [colors, setColors] = useState('');

    useEffect(()=>{
        if (snapshot.editArray) {
            setAuthorid(snapshot.editArray.id);
            setTitle(snapshot.editArray.title)
            setIcon(snapshot.editArray.icon)
            setDate(new Date(snapshot.editArray.date).toISOString().split('T')[0])
            setStartTime(snapshot.editArray.startTime)
            setEndTime(snapshot.editArray.endTime)
            setetails([...snapshot.editArray.details])
            setPinned(snapshot.editArray.pinned)
            setPersonal(snapshot.editArray.personal)
            setImage(snapshot.editArray.images)
            setColors(snapshot.editArray.colors)

        }

    },[snapshot.editArray])


    // console.log("🚀 ~ file: Addtask.tsx:34 ~ color:", colors)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsedDate = date ? Date.parse(date) : Date.now();
        const newTask: Task = {
            date: parsedDate,
            icon,
            images,
            title,
            time,
            startTime,
            endTime,
            id,
            details: [...details],
            personal,
            pinned,
            color: colors,
            formToggle: false,
            // setFormToggle: function (value: React.SetStateAction<boolean>): void {
            //     throw new Error('Function not implemented.');
            // },
            editTaskId: null
        };

        state.arrData = ([newTask,...snapshot.arrData]);

        setAuthorid('');
        setIcon('');
        setTitle('');
        setTime('');
        setStartTime('');
        setEndTime('');
        setDate('');
        setetails([]);
        setPinned(false);
        setImage([])
        setColors('')
        setPersonal(false);
    };


    const handlecancel = () => {
        state.formToggle = false;
        state.editArray = null;
        setAuthorid('');
        setIcon('');
        setTitle('');
        setTime('');
        setStartTime('');
        setEndTime('');
        setDate('');
        setetails([]);
        setPinned(false);
        setColors('');
        setPersonal(false);
    };

    const handleEdit = () => {
        if (!snapshot.editArray) return;

        const taskIndex = state.arrData.findIndex((task) => task.id === snapshot.editArray!.id);

        if (taskIndex !== -1) {
            const updatedTask: Task = {
                date: Date.parse(date),
                icon,
                images,
                title,
                time,
                startTime,
                endTime,
                id,
                details: [...details],
                personal,
                pinned,
                color: colors,
                formToggle: false,
                editTaskId: null,
            };

            state.arrData[taskIndex] = updatedTask;
            state.editArray = null;
            state.formToggle = false;

            setAuthorid('');
            setIcon('');
            setTitle('');
            setTime('');
            setStartTime('');
            setEndTime('');
            setDate('');
            setetails([]);
            setPinned(false);
            setColors('');
            setPersonal(false);
        }
    };

    return (
        <div className="bg-purple-400 p-5 z-50 rounded-lg">
            <span className="w-5 h-5 bg-[#f9fbfd]  absolute -top-3 right-1 rotate-45"></span>
            <form onSubmit={handleSubmit}>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="py-2">Date:</td>
                            <td>
                                <input
                                    type="date"

                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">Title:</td>
                            <td>
                                <input
                                    type="text"

                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">Time:</td>
                            <td>
                                <input
                                    type="time"

                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">StartTime:</td>
                            <td>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">EndTime:</td>
                            <td>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2">icon:</td>
                            <td>
                                <input
                                    type="text"
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2">Color:</td>
                            <td>
                                <input
                                    type="color"
                                    value={colors}
                                    onChange={(e) => setColors(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">ID:</td>
                            <td>
                                <input
                                    type="text"
                                    value={id}
                                    required
                                    onChange={(e) => setAuthorid(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr>
                        {/* <tr>
                            <td className="py-2">Image:</td>
                            <td>
                                <input
                                    type="file"
                                    value={images}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                />
                            </td>
                        </tr> */}
                        <tr>
                            <td className="py-2">details:</td>
                            <td>
                                <textarea
                                    value={details.join('\n')}
                                    onChange={(e) => setetails(e.target.value.split('\n'))}
                                    className="w-full px-2 py-1 rounded border border-gray-300"
                                ></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2">Pinned:</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={pinned}
                                    onChange={(e) => setPinned(e.target.checked)}
                                    className="rounded"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">Personal:</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={personal}
                                    onChange={(e) => setPersonal(e.target.checked)}
                                    className="rounded"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {snapshot.editArray ? (
                    <span className="flex gap-5">
                        <button className="bg-[#f5bd6c] text-white px-4 py-2 mt-4 rounded hover:bg-[#f0a742]" onClick={handleEdit}>
                            Save
                        </button>
                        <button className="bg-[#f5bd6c] text-white px-4 py-2 mt-4 rounded hover:bg-[#f0a742]" onClick={handlecancel}>
                            Cancel
                        </button>
                    </span>) : <button
                        type="submit"
                        className="bg-[#f5bd6c] text-white px-4 py-2 mt-4 rounded hover:bg-[#f0a742]"
                    >
                    submit
                </button>}
            </form>
        </div>
    );
};

export default Addtask;
export const state = proxy<{
  calenderDate: any; arrData: Task[]; editArray: Task | null;formToggle: boolean; 
}>({
    arrData: [],
    editArray: null,
    formToggle: false,
  });




