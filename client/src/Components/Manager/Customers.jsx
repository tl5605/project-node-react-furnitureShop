
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useGetAllUsersQuery} from "../../Store/userApiSlice";
import '../../CSS/Orders.css';
import { InputText } from 'primereact/inputtext';

const Customers = () => {
    const { data, isLoading } = useGetAllUsersQuery();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState()

    const filterUsers = () => {
        let filterUser;        
        if (search) {
            filterUser = users.filter(user => user._id.includes(search))
        }
        if(filterUser?.length){
            setUsers(filterUser)
        }
        else{
            setUsers(data)
        }
    }

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);

    useEffect(() => {
        filterUsers()
    }, [search])

    if (isLoading) {
        return <div className='message'>Loading...</div>;
    } else if (!data || data.length === 0) {
        return <h3 className='message'>אופס משהו השתבש...</h3>;
    }

    const idBodyTemplate = (rowData) => {
        return <span>{rowData._id}</span>;
    };

    const nameBodyTemplate = (rowData) => {
        return <span>{rowData.userName}</span>;
    };

    const mailBodyTemplate = (rowData) => {
        if(rowData.mail){
            return <span>₪{rowData.mail}</span>;
        }
        else{
            return <span>לא קיים</span>;
        }
    };


    return (
        <div className='dataTableDiv'>
             <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className='inputSearch' type="search" placeholder="...חיפוש קוד לקוח" onChange={(e) => {
                            setSearch(e.target.value)
                        }} />
            </span>
            <DataTable
                value={users}
                dataKey="_id"
                tableStyle={{ minWidth: '60rem' }}>
                <Column field="date" header="מייל"   body={mailBodyTemplate}/>
                <Column field="_id" header="שם לקוח" sortable body={nameBodyTemplate} />
                <Column field="user" header="קוד לקוח" sortable body={idBodyTemplate} />
                
            </DataTable>
        </div>
    );
};

export default Customers;
