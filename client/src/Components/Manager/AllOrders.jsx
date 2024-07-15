import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { useGetOrdersQuery, useUpdateStatusMutation} from "../../Store/orderApiSlice";
import '../../CSS/Orders.css';
import { InputText } from 'primereact/inputtext';

const AllOrders = () => {
    const { data, isLoading } = useGetOrdersQuery();
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [statuses, setStatuses] = useState({});
    const [updateStatus] = useUpdateStatusMutation()
    const [search, setSearch] = useState()

    const statusOptions = [
        { name: 'הוזמן', code: 'A' },
        { name: 'בתהליך', code: 'B' },
        { name: 'נשלח', code: 'C' },
        { name: 'נמסר', code: 'D' }
    ];

    const filterOrder = () => {
        let filterOrder;
        if (search) {
            filterOrder = products.filter(order => order._id.includes(search))
        }
        if(filterOrder?.length){
            setProducts(filterOrder)
        }
        else{
            setProducts(data)
        }
    }
    useEffect(() => {
        if (data) {
            setProducts(data);
            const initialStatuses = data.reduce((acc, order) => {
                acc[order._id] = order.status;
                return acc;
            }, {});
            setStatuses(initialStatuses);
        }
    }, [data]);

    useEffect(() => {
        filterOrder()
    }, [search])

    if (isLoading) {
        return <div className='message'>Loading...</div>;
    } else if (!data || data.length === 0) {
        return <h3 className='message'>אופס משהו השתבש...</h3>;
    }


    const handleStatusChange = (orderId, newStatus) => {
        updateStatus({_id: orderId, status: newStatus.name})
        setStatuses(prevStatuses => ({
            ...prevStatuses,
            [orderId]: newStatus
        }));
    };

    const amountBodyTemplate = (rowData) => {
        return <span>{rowData.quantity}</span>;
    };

    const imageBodyTemplate = (rowData) => {
        return <img className='imgOrder' src={`http://localhost:6789/uploads/${rowData.furniture?.image?.split("\\")[2]}`} alt="product" />;
    };

    const userBodyTemplate = (rowData) => {
        return <span>{rowData.user}</span>;
    };

    const addressBodyTemplate = (rowData) => {
        if(rowData.address){
            let address = `${rowData.address.city} ${rowData.address.street} ${rowData.address.num}`
            if(rowData.address.apartment){
                address+=`/${rowData.address.apartment}`
            }
            return <span>{address}</span>;
        }
        return <span>איסוף עצמי</span>;
    };

    const idBodyTemplate = (rowData) => {
        return <span>{rowData._id}</span>;
    };

    const nameBodyTemplate = (rowData) => {
        return <span>{rowData.furniture.description}</span>;
    };

    const priceBodyTemplate = (rowData) => {
        return <span>₪{rowData.price}</span>;
    };

    const furniturePriceBodyTemplate = (rowData) => {
        return <span>₪{rowData.furniture.price}</span>;
    };

    const dateBodyTemplate = (rowData) => {
        return <span>{rowData.dateOrder}</span>;
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <Dropdown
                value={statuses[rowData._id]}
                onChange={(e) => handleStatusChange(rowData._id, e.value)}
                options={statusOptions}
                optionLabel="name"
                placeholder={rowData.status}
                className="dropdown"
            />
        );
    };

    const allowExpansion = (rowData) => {
        return rowData.items.length > 0;
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <DataTable value={data.items}>
                    <Column field="price" header="מחיר" body={furniturePriceBodyTemplate}></Column>
                    <Column field="amount" header="כמות" body={amountBodyTemplate}></Column>
                    <Column field="image" header="תמונה" body={imageBodyTemplate}></Column>
                    <Column field="name" header="שם מוצר" body={nameBodyTemplate}></Column>
                </DataTable>
            </div>
        );
    };

    return (
        <div className='dataTableDiv'>
             <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className='inputSearch' type="search" placeholder="...חיפוש מספר הזמנה" onChange={(e) => {
                            setSearch(e.target.value)
                        }} />
            </span>
            <DataTable
                value={products}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="_id"
                tableStyle={{ minWidth: '60rem' }}>
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="inventoryStatus" header="סטטוס" body={statusBodyTemplate} />
                <Column field="price" header="מחיר" sortable body={priceBodyTemplate} />
                <Column field="address" header="כתובת" body={addressBodyTemplate} />
                <Column field="date" header="תאריך" sortable body={dateBodyTemplate} />
                <Column field="_id" header="מספר הזמנה" body={idBodyTemplate} />
                <Column field="user" header="קוד לקוח" sortable body={userBodyTemplate} />
            </DataTable>
        </div>
    );
};

export default AllOrders;
