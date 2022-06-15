import React, { useEffect, useState } from 'react'
import { OrderCard } from '../../components/OrderCard'
import { OrderWithProducts } from '../../services/order/Models'
import { OrderService } from '../../services/order/OrderService'

import './styles.css'

export const Orders = () => {
    const [orders, setOrders] = useState<OrderWithProducts[]>([])

    const getOrders = async () => {
        const orders = await OrderService.getOrderByStatusId(1)
        setOrders(orders)
    }

    const finishOrder = async (orderId: number) => {
        try {
            await OrderService.setOrderStatusByOrderId(orderId, 2)
            const filteredOrders = orders.filter(order => order.id !== orderId)
            setOrders(filteredOrders)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getOrders()

        setInterval(() => {
            getOrders()
        }, 5000)
    }, [])

    return (
        <div className="container-orders">
            {orders.map(order => (
                <OrderCard
                    buttonLabel="Finalizar"
                    handleButtonClick={() => finishOrder(order.id)}
                    table={order.table}
                    time={order.createdAt}
                    products={order.productsWithQuantity}
                />
            ))}
        </div>
    )
}
