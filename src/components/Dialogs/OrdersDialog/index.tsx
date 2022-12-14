/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from 'react'
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { useEffect, useState } from "react"
import { OrderWithProducts } from "../../../services/order/Models"
import { OrderService } from "../../../services/order/OrderService"
import './styles.css'
import { Toast } from 'primereact/toast'
import { Loading } from '../../Loading'

interface IProductWithQuantity {
  productId: number
  productName: string
  quantity: number
  price: number
}

interface IOrderStatus {
  id: number
  name: string
}

interface OrdersDialogProps {
  tableId?: number
  visible: boolean
  onHide(): void
}

export const OrdersDialog = ({ tableId, visible, onHide }: OrdersDialogProps) => {
  const [orders, setOrders] = useState<OrderWithProducts[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const toast = useRef<any>(null)

  const getOrders = async () => {
    setIsLoading(true)
    const orders = await OrderService.getOrdersByTableId(tableId!)
    setOrders(orders)
    setIsLoading(false)
  }

  useEffect(() => {
    if (tableId) {
      getOrders()
    }
  }, [tableId])

  const getTotalPrice = () => {
    let totalPrice = 0

    orders.forEach(order => {
      order.productsWithQuantity.forEach(product => totalPrice += product.price * product.quantity)
    })

    return totalPrice
  }

  const renderBillProducts = (products: IProductWithQuantity[], orderStatus: IOrderStatus) => {
    let subtotal = 0

    products.forEach(product => subtotal += product.price * product.quantity)

    return (
      <div className="order-card">
        {products.map((product) => (
          <div className="product-info" key={`product-${product.productId}`}>
            <div className="product-name">{product.quantity}x {product.productName}</div>
            <div className="product-price">R$ {product.price * product.quantity}</div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px' }}>
          <div className={`order-status status-${orderStatus.id}`}>{orderStatus.name}</div>
          <div className="subtotal">Subtotal R$ {subtotal}</div>
        </div>
      </div>
    )
  }

  const showSuccess = (sumary, detail: string) => {
    toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
  }

  const showError = (sumary, detail: string) => {
    toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
  }

  const closeBill = async () => {
    setIsLoading(true)

    try {
      await OrderService.closeBillByTableId(tableId!)
      onHide()
      showSuccess('Conta finalizado com sucesso', '')
    } catch (error) {
      console.log(error)
      showError('Erro ao finalizar a conta!', 'Contate o Administrador do Sistema!')
    }

    setIsLoading(false)
  }

  return (

    <>
      <Toast ref={toast} />
      {isLoading && <Loading visible={isLoading} />}
      <Dialog visible={visible} onHide={onHide} style={{ width: '60%' }} header="Lista de pedidos">
        {orders.length > 0 && (
          <>
            <div className="content">
              {orders.map(order => renderBillProducts(order.productsWithQuantity, order.orderStatus))}
            </div>
            <div className="totalPrice">
              Total: R$ {(getTotalPrice())}
            </div>
            <div className="p-d-flex p-jc-end p-mt-3">
              <Button label="Fechar conta" onClick={closeBill} />
            </div>
          </>
        )}

        {orders.length === 0 && (
          <div className="p-d-flex p-jc-center p-my-6">
            <span style={{ fontSize: '1.15em' }}>Nenhum pedido realizado</span>
          </div>
        )}

      </Dialog>
    </>
  )
}