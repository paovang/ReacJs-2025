import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../store"
import { IUser } from "../interfaces/user.interface"
import { useEffect } from "react"
import { deleteUser, fetchUsers, updatePagination } from "../reducers/userSlice"
import { Divider, Popconfirm, Space, Table, TableProps, GetProp, Button } from 'antd';

const UserLists = () => {
    const users = useSelector<RootState, IUser[]>((state) => 
        Array.isArray(state.user?.users) ? (state.user.users as IUser[]) : []
    );
    const pagination = useSelector((state: RootState) => state.user.pagination);
    const loading = useSelector((state: RootState) => state.user.loading);
    const error = useSelector((state: RootState) => state.user.error);
    const dispatch = useDispatch<AppDispatch>();

    interface DataType {
        id?: number;
        name: string;
        email: string;
        phone_number: string;
    }

    type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
    type ColumnsType<T extends object = object> = TableProps<T>['columns'];

    useEffect(() => {
        dispatch(fetchUsers({ page: pagination.currentPage, limit: pagination.pageSize }));
    }, [dispatch, pagination]);
    
    const columns: ColumnsType<DataType> = [
        {
          title: 'ຊື່ຜູ້ໃຊ້',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'ອີເມວ',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'ເບີໂທຕິດຕໍ່',
          dataIndex: 'phone_number',
          key: 'phone_number',
        },
        {
            title: 'ການກະທຳ',
            dataIndex: 'operation',
            render: (_, record) =>
                users.length >= 1 ? (
                    <Space>
                        <Popconfirm 
                            title="Sure to delete?" 
                            onConfirm={() => {
                                if (record.id !== undefined) {
                                    handleDelete(record.id);
                                }
                            }}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <Link to={`/edit/${record.id}`}>
                            Edit
                        </Link>
                    </Space>
              ) : null,
        },
    ];

    const handleDelete = (id: number) => {
        dispatch(deleteUser(id)); // Just pass the id here
    };

    const handleTableChange: TableProps<DataType>['onChange'] = async (pagination: TablePaginationConfig) => {
        const page = pagination.current ?? 1; 
        const limit = pagination.pageSize ?? 10;

        dispatch(updatePagination({ currentPage: page, pageSize: limit }));
        dispatch(fetchUsers({ page, limit }));
    }

    const navigate = useNavigate();
    const toggleButton = (
        <div style={{ textAlign: "right" }}>
            <Button type="primary" onClick={() => navigate('/create')}>
                Create User
            </Button>
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">ລາຍການ ຜູ້ໃຊ້ລະບົບ</h3>
                {users.length > 0 && toggleButton}
            </div>

            <Divider/>
            {loading && <p>Loading...</p>}
            {error && <p>Erro: {error}</p>}
            <Table<DataType>
                columns={columns} 
                dataSource={users} 
                rowKey="id"
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default UserLists