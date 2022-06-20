import { useEffect, useRef, useState } from 'react';
import './styles.css';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { ProductDialog } from '../../components/Dialogs/ProductDialog';
import { Loading } from '../../components/Loading';
import { Product } from '../../services/product/Models';
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

    const handleProductClick = (product: Product) => {
        setProductCurrent(product)
        setVisibleDialog(true)
    }

    const rightToolbar = () => {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    className="p-inputtext-sm block mb-2"
                    placeholder="Pesquise..."
                />
            </span>
        )
    }

    const leftToolbar = () => {
        return (
            <Button
                label="Adicionar produto"
                icon="pi pi-plus"
                className="p-button-success mr-2"
                onClick={() => {
                    setProductCurrent(undefined)
                    setVisibleDialog(true)
                }}
            />
        )
    }

    const header = <Toolbar className="p-mb-2 p-px-5" left={leftToolbar} right={rightToolbar}></Toolbar>


    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    return (
        <div className="container-products">
            <Loading visible={showSpinnerLoading} />
            <Toast ref={toast} />
            <ProductDialog onHide={() => loadingAndSetVisibleDialog(false)} visible={visibleDialog} product={productCurrent} />
            <h1>Listagem de produtos</h1>
            {header}
            <div className="products-list">
                {products.map(product => (
                    <div className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            <Button 
                                className="p-button-rounded edit-button" 
                                icon="pi pi-pencil" 
                                onClick={() => handleProductClick(product)} 
                            />
                        </div>
                        <div className="product-info">
                            <p className="product-category">{product.productCategory.name}</p>
                            <p className="product-name">{product.name}</p>
                            <p className="product-description">{product.description}</p>
                            <div className="p-d-flex p-justify-between p-mt-4">
                                <p className="product-price">R$ {product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
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