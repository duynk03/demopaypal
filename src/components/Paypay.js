import {useEffect, useRef} from 'react'
import  axios  from 'axios';

export default function Paypal () {

    const paypal = useRef();

    useEffect(()=> {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                        address: "Hem 51, Ninh Kieu, Can Tho",
                        amount: {
                            currrency_code: "CAD",
                            value: Math.floor(10000000/24000)
                        }
                    }]
                })
            },
            onApprove: async(data, actions) => {
                const order = await actions.order.capture();
                await axios.post("http://localhost:8086/api/paypal/orders", {
                    name: "Nguyen Khanh Duy",
                    phone: "03223828723",
                    gender: "male",
                    address: "Hem 51, Ninh Kieu, Can Tho",
                    total: 10000000,
                    state: "Chờ xác nhận",
                    payments: "Thanh toán qua Paypal",
                    createdAt: new Date(),
                    modified_at: null

                }).then((response) => {
                    console.log(response);
                }).catch((err) => {
                    if (axios.isAxiosError(err)) {
                        console.log("Loi axios post method", err);
                    }
                })
                console.log("Thanh toan thanh cong")
                console.log("Order", order);
            },
            onError: (err) => {
                console.log("Error: " + err);
            }
        })
        .render(paypal.current);
    }, [])

    return (
        <div>
            <p>Ten: Nguyen Khanh Duy</p>
            <p>sdt: 0363323989</p>
            <p>Gioi tinh: Nam</p>
            <p>Dia chi: Hem 51, Ninh Kieu, Can Tho</p>
            <p>Tong tien: 1000$</p>
            <div ref={paypal}></div>
        </div>
    )
}