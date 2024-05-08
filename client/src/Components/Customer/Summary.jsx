import React, { useEffect, useState } from 'react'
import useAuth from "../Hooks/useAuth";
import { useGetBasketsUserQuery } from "../../Store/basketApiSlice";
import { OrderList } from 'primereact/orderlist';


const Summary = ({ shipping }) => {

    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0)
    const { _id } = useAuth()
    const { data, error, isLoading } = useGetBasketsUserQuery(_id);

    useEffect(() => {
        if (data) {
            let sum = 0;
            const filteredProducts = [];

            data.items.forEach(product => {
                if (product.furniture.stock > 0) {
                    sum += (product.furniture.price) * (product.quantity);
                    filteredProducts.push(product);
                }
            });

            setProducts(filteredProducts);
            setPrice(sum);
        }
    }, [data]);



    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`http://localhost:6789/uploads/${item.furniture?.image?.split("\\")[2]}`} />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.furniture.description}</span>
                    <div className="flex align-items-center gap-2">
                        <span>כמות: {item.quantity}</span>
                    </div>
                </div>
                <span className="font-bold text-900">₪{(item.furniture.price) * (item.quantity)}</span>
            </div>
        );
    };


    return (
        <>
            <div id="summary">
                <h1>סיכום הזמנה</h1>
                <hr />
                <div className="flexDiv">
                    <span>סכום ביניים</span>
                    <span>{price} ₪</span>
                </div>

                <div className="flexDiv">
                    <span>משלוח</span>
                    <span>{shipping ? 30 : 0} ₪</span>
                </div>
                <br /><br />
                <hr />
                <div className="flexDiv">
                    <b><span>סה"כ לתשלום</span></b>
                    <span>{shipping ? price + 30 : price} ₪</span>
                </div>
                <br /><br />

                <OrderList className="no-move-buttons" dataKey="id" value={products} onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} header="מוצרים בהזמנה" />

            </div>
        </>
    )
}

export default Summary