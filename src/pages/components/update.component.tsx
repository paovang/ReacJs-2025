import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUser, updateUser } from "../../reducers/userSlice";
import { IUser } from "../../interfaces/user.interface";
import { Button } from "antd";

const FormUpdateUser = () => {
    const [userData, setUserData] = useState<IUser>({
        name: '',
        email: '',
        phone_number: ''
    })
    const currentUser = useSelector<RootState, IUser>((state) => state.user?.currentUser as IUser);
    const [loading, setLoading] = useState(false);
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
        setLoading(true)
        if (id) {
            await dispatch(updateUser(userData))
        } else {
            await dispatch(createUser(userData))
        }
        setLoading(false)
        navigate('/list/users')
    }

    const navigate = useNavigate();
    
    
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
            <Button 
                color="pink"
                variant="solid"
                onClick={handleUpdate}
                loading={loading} 
            >
                {id ? 'Update User' : 'Create User'}
            </Button>
        </div>
    )
}

export default FormUpdateUser