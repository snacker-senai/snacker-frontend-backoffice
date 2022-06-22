import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import { Loading } from '../../components/Loading'
import { OrderCard } from '../../components/OrderCard'
import { OrderWithProducts } from '../../services/order/Models'
import { OrderService } from '../../services/order/OrderService'

import './styles.css'

export const Orders = () => {
    const [orders, setOrders] = useState<OrderWithProducts[]>([])
    const [showSpinnerLoading, setShowSpinnerLoading] = useState<boolean>(false)
    const toast = useRef<any>(null);

    const getOrders = async () => {
        const orders = await OrderService.getOrderByStatusId(1)
        setOrders(orders)
    }

    const finishOrder = async (orderId: number) => {
        setShowSpinnerLoading(true)

        try {
            await OrderService.setOrderStatusByOrderId(orderId, 2)
            const filteredOrders = orders.filter(order => order.id !== orderId)
            setOrders(filteredOrders)
            showSuccess('Atualizado pedido com sucesso', '')
        } catch (error: any) {
            showError('Erro ao atualizar pedido!', 'Erro: ' + error.message)
        }
        setShowSpinnerLoading(false)
    }

    useEffect(() => {
        setShowSpinnerLoading(true)

        getOrders()

        setInterval(() => {
            getOrders()
        }, 5000)

        setShowSpinnerLoading(false)
    }, [])

    const showSuccess = (sumary, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    return (
        <div className="container-orders">
            <Loading visible={showSpinnerLoading} />
            <Toast ref={toast} />
            <h1>Listagem de pedidos</h1>
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
