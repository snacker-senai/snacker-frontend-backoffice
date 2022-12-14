/* eslint-disable react-hooks/exhaustive-deps */
import { FiSearch } from 'react-icons/fi'
import { BsCartCheck } from 'react-icons/bs'
import { useState, useEffect, useRef, useMemo } from 'react'
import { CategoryWithProducts } from '../../services/request/Models'
import { RequestService } from '../../services/request/RequestService'
import Cart from '../../components/Cart'
import ModalRequesterProduct from '../../components/ModalRequesterProduct'
import { Product } from '../../services/product/Models'
import { Loading } from '../../components/Loading'

import './styles.css'
import { ProductsWithQuantity } from '../../services/order/Models'
import { OrderService } from '../../services/order/OrderService'
import { Toast } from 'primereact/toast'
import { getPriceFormat } from '../../util/price'
import { Table } from '../../services/table/Models'
import { TableService } from '../../services/table/TableService'
import LayoutEmpty from '../../components/LayoutEmpty'

const Request = () => {
    const [isFilteringProducts, setIsFilteringProducts] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [requesterProductsSelected, setRequesterProductsSelected] = useState<ProductsWithQuantity[]>([])
    const [tables, setTables] = useState<Table[]>([])
    const [productBuy, setProductBuy] = useState<Product | null>(null)
    const [visibleCart, setVisibleCart] = useState(false)
    const [visibleModalProduct, setVisibleModalProduct] = useState(false)
    const [categoryWithPrducts, setCategoryWithPrducts] = useState<CategoryWithProducts[]>([])
    const [categoryWithProductsFiltered, setCategoryWithProductsFiltered] = useState<CategoryWithProducts[]>([])
    const toast = useRef<any>(null);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true)

            await RequestService.get().then(products => setCategoryWithPrducts(products))
            await TableService.getAll().then(tables => setTables(tables))
        }

        fetch().then(() => setIsLoading(false))
    }, [])

    const productsFiltered = useMemo(() =>
        (isFilteringProducts && categoryWithProductsFiltered) || categoryWithPrducts,
        [isFilteringProducts, categoryWithPrducts, categoryWithProductsFiltered])

    const productsAll = useMemo(() =>
        productsFiltered?.filter((category) => category.products.length > 0), [productsFiltered])


    const getPriceBuy = useMemo(() => {
        let value = 0

        requesterProductsSelected.map((product) => value += product.price * product.quantity)

        return value
    }, [requesterProductsSelected])

    const handleSubmitProductBuy = (value: number, quantity: number, comment: string) => {
        if (productBuy && productBuy !== null) {
            setRequesterProductsSelected([...requesterProductsSelected, {
                details: comment,
                quantity: quantity,
                productId: productBuy.id ? productBuy.id : 0,
                price: productBuy.price,
                productName: productBuy.name,
            }])

            showSuccess(`Adicionado o produto ${productBuy.name} no carrinho`, 'Confira o carrinho quando quiser!')
        }

        setVisibleModalProduct(false)
    }

    const onClickProduct = (product: Product) => {
        setProductBuy(product)
        setVisibleModalProduct(true)
    }

    const showSuccess = (sumary: string, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    const showError = (sumary: string, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    const handleSubmitCart = async (tableId: number) => {
        setIsLoading(true)
        setVisibleModalProduct(false)

        try {
            await OrderService.setOrder(tableId, requesterProductsSelected)
            showSuccess('Pedido realizado com sucesso!', '')
            setRequesterProductsSelected([])
        } catch (error) {
            console.log(error)
            showError('Falha ao realizar pedido!', '')
        }

        setIsLoading(false)
    }

    const handleClickExclued = (productExclued: ProductsWithQuantity) => {
        setRequesterProductsSelected(requesterProductsSelected.filter((product) => product !== productExclued))
        showSuccess('Excluído do carrinho com sucesso!', '')
    }

    const filterProducts = (text: string) => {
        if (!text) {
            setIsFilteringProducts(false)
            setCategoryWithProductsFiltered([])
        } else {
            setIsFilteringProducts(true)

            const regex = new RegExp(text.toLowerCase())
            const categoriesMapped = categoryWithPrducts.map((category) => ({
                id: category.id,
                name: category.name,
                products: category.products?.filter((product) => regex.test(product.name.toLowerCase()))
            }))

            setCategoryWithProductsFiltered(categoriesMapped)
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <Cart tables={tables} onClickExclued={handleClickExclued} onClickSubmit={handleSubmitCart} onClickBack={() => setVisibleCart(false)} isVisible={visibleCart} products={requesterProductsSelected} />
            <ModalRequesterProduct onClose={() => setVisibleModalProduct(false)} product={productBuy} onClickBuy={handleSubmitProductBuy} visible={visibleModalProduct} />
            <Loading visible={isLoading}></Loading>
            <div className="request-container">
                <div className="header">
                    <div className="input-container">
                        <input type="text" placeholder="Busque pelo produto" onChange={(e) => filterProducts(e.target.value)} />
                        <FiSearch />
                    </div>
                    <div className="header-cart" onClick={() => setVisibleCart(true)}>
                        <BsCartCheck className='header-icon' />
                        <p>{getPriceFormat(getPriceBuy)}</p>
                    </div>
                </div>

                {!isLoading && productsAll?.length === 0 ? <LayoutEmpty title='Não há produtos para seleção' /> : (
                    <div className="content">
                        {productsAll?.map((category: CategoryWithProducts, index: number) => (
                            <div key={`category-id-${category?.id}-index-${index + 1}`}>
                                <h2>{category?.name}</h2>
                                <div className='group-products' >
                                    {category?.products?.map((product, index) => (
                                        <div onClick={() => onClickProduct(product)}
                                            className='product'
                                            key={`products-id-${product?.id}-${index}`}>
                                            <div className="content-left">
                                                <p className='title'>{product.name}</p>
                                                <p className="description">{product.description}</p>
                                                <p className="price">{getPriceFormat(product.price)}</p>
                                            </div>
                                            <div className="content-right">
                                                <img src={product.image} alt="" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )

}
export default Request