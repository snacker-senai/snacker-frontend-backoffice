import React, { useEffect, useState } from 'react'
import { OrderCard } from '../../components/OrderCard'
import { OrderWithProducts } from '../../services/order/Models'
import { OrderService } from '../../services/order/OrderService'

import './styles.css'

export const Deliveries = () => {
    const [orders, setOrders] = useState<OrderWithProducts[]>([])

    const getOrders = async () => {
        const orders = await OrderService.getOrderByStatusId(2)
        setOrders(orders)
    }

    const deliverOrder = async (orderId: number) => {
        try {
            await OrderService.setOrderStatusByOrderId(orderId, 3)
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
        <div className="container-deliveries">
            <h1>Listagem de entregas</h1>
            {orders.map(order => (
                <OrderCard
                    buttonLabel="Entregar"
                    handleButtonClick={() => deliverOrder(order.id)}
                    table={order.table}
                    time={order.createdAt}
                    products={order.productsWithQuantity}
                />
            ))}
        </div>
    )
}
