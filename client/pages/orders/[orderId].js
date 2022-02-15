import Router from "next/router";
import { useEffect, useState } from "react";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: () => Router.push('/orders')
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        // call it once for the first time
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        // end useEffect when navigating out of it
        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if (timeLeft < 0) {
        return (<div>Order Expierd</div>);
    }

    return (
        <div>
            Time left to pay: {timeLeft} seconds.
            <div>For user with email: {currentUser.email}</div>
            <button className="btn btn-secondary" onClick={() => doRequest('fake-token')}>Fake Pay</button>
            {errors}
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
}

export default OrderShow;