import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUser, updateUser } from "../../reducers/userSlice";
import { IUser } from "../../interfaces/user.interface";

const FormUpdateUser = () => {
    const [userData, setUserData] = useState<IUser>({
        name: '',
        email: '',
        phone_number: ''
    })
    const currentUser = useSelector<RootState, IUser>((state) => state.user?.currentUser as IUser);
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            dispatch(fetchUser(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if (currentUser && currentUser.id) { 
            setUserData(currentUser)
        }
    }, [currentUser])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleUpdate = async () => {
        if (id) {
            await dispatch(updateUser(userData))
        } else {
            await dispatch(createUser(userData))
        }
    }
    
    return (
        <div className="container mx-auto p-4">
            <input 
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="please enter name..."
                className="mb-2 w-full rounded border p-2"
            />
            <input 
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="please enter email..."
                className="mb-2 w-full rounded border p-2"
            />
            <input 
                type="text"
                name="phone_number"
                value={userData.phone_number}
                onChange={handleChange}
                placeholder="please enter phone number..."
                className="mb-2 w-full rounded border p-2"
            />
            <button  className={`mr-2 rounded px-3 py-1 text-lime-50 ${id ? 'bg-yellow-500' : 'bg-green-500'}`} onClick={handleUpdate}>
                {id ? 'Update User' : 'Create User'}
            </button>
        </div>
    )
}

export default FormUpdateUser