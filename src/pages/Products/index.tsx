/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import './styles.css'

import { Toast } from 'primereact/toast';
import { Product } from '../../services/product/Models';
import { ProductDialog } from '../../components/Dialogs/ProductDialog';
import { Loading } from '../../components/Loading';
import { ProductService } from '../../services/product/ProductService';

export const Products = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [productCurrent, setProductCurrent] = useState<Product | undefined>(undefined)
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);

    useEffect(() => {
        buildProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const buildProducts = async () => {
        setShowSpinnerLoading(true)

        try {
            await ProductService.get().then((data: Product[]) => setProducts(data))
        } catch (error: any) {
            console.log(error)
            showError("Erro ao buscar os produtos!", `Erro: ${error.message}`)
        }

        setShowSpinnerLoading(false)
    }

    const loadingAndSetVisibleDialog = (visible: boolean) => {
        setVisibleDialog(visible)
        buildProducts()
    }

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    return (
        <div className="container-products">
            <Loading visible={showSpinnerLoading} />
            <Toast ref={toast} />
            <ProductDialog onHide={() => loadingAndSetVisibleDialog(false)} visible={visibleDialog} product={productCurrent} />
            <div className="products-list">
                {products.map(product => (
                    <div className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <p className="product-category">{product.productCategory.name}</p>
                            <p className="product-name">{product.name}</p>
                            <p className="product-description">{product.description}</p>
                            <div className="p-d-flex p-justify-between p-mt-4">
                                <p className="product-price">R$ {product.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                                {product.active
                                    ? <p className="product-active">Ativo</p>
                                    : <p className="product-inactive">Inativo</p>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}