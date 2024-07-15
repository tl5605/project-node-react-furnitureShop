import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import useAuth from "../Hooks/useAuth";
import { useGetOrdersOfUserQuery } from "../../Store/orderApiSlice";
import '../../CSS/Orders.css'

const MyOrders = () => {

    const { _id } = useAuth()
    const { data, isLoading } = useGetOrdersOfUserQuery(_id)
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);

    useEffect(() => {
        setProducts(data);
    }, [data]);

    if (isLoading) {
        return <div className='message'>Loading...</div>;
    }
    else {
        if (!data || data.length === 0) {
            return <h3 className='message'>עדיין אין לך הזמנות...</h3>
        }
    }

    const amountBodyTemplate = (rowData) => {
        return <span>{rowData.quantity}</span>
    };


    const imageBodyTemplate = (rowData) => {
        return <img className='imgOrder' src={`http://localhost:6789/uploads/${rowData.furniture?.image?.split("\\")[2]}`} />;
    };

    const idBodyTemplate = (rowData) => {
        return <span>{rowData._id}</span>
    };

    const nameBodyTemplate = (rowData) => {
        return <span>{rowData.furniture.description}</span>
    };

    const priceBodyTemplate = (rowData) => {
        return <span>₪{rowData.price}</span>
    };

    const furniturePriceBodyTemplate = (rowData) => {
        return <span>₪{rowData.furniture.price}</span>
    };

    const dateBodyTemplate = (rowData) => {
        return <span>{rowData.dateOrder}</span>
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag>{rowData.status}</Tag>;
    };



    const allowExpansion = (rowData) => {
        return rowData.items.length > 0;
    };

    const rowExpansionTemplate = (data) => {

        return (
            <div className="p-3">
                <DataTable value={data.items}>
                    <Column field="price" header="מחיר" body={furniturePriceBodyTemplate}></Column>
                    <Column field="amount" header="כמות" body={amountBodyTemplate} ></Column>
                    <Column field="image" header="תמונה" body={imageBodyTemplate} ></Column>
                    <Column field="name" header="שם מוצר" body={nameBodyTemplate}></Column>
                </DataTable>
            </div>
        );
    };


    return (
        <div className='dataTableDiv'>
            <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="_id" tableStyle={{ minWidth: '60rem' }}>
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="inventoryStatus" header="סטטוס" body={statusBodyTemplate} />
                <Column field="price" header="מחיר" sortable body={priceBodyTemplate} />
                <Column field="date" header="תאריך" sortable body={dateBodyTemplate} />
                <Column field="_id" header="מספר הזמנה" body={idBodyTemplate} />
            </DataTable>
        </div>
    );
}

export default MyOrders