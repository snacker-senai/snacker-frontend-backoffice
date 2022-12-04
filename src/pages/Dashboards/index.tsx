/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css'
import { useEffect, useRef, useState } from 'react';

import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import { ProductsFilterDashboard } from '../../services/product/Models';
import { ProductService } from '../../services/product/ProductService';
import { Loading } from '../../components/Loading';
import { Toast } from 'primereact/toast';
import { DashboardCard } from '../../components/DashboardCard';
import { ImCancelCircle } from 'react-icons/im'
import { MdOutlineDoneOutline } from 'react-icons/md'
import { FiInbox } from 'react-icons/fi'
import LayoutEmpty from '../../components/LayoutEmpty';


interface informationCharData {
    labels: string[]
    datasets: {
        data: number[]
        backgroundColor: string[]
        hoverBackgroundColor: string[]
    }[]
}

const backgroundColorsDashboard = [
    "#307C63",
    "#355679",
    "#BB8D48",
    "#BB6F48",
    "#7FB5A3",
    "#8199B2",
    "#FFE0B2",
    "#FFCCB2",
    "#B0E0E6",
    "#156047",
    "#1A3B5E",
    "#90631F",
    "#90451F"
]

export const Dashboards = () => {
    const [rangeFilters, setRangeFilters] =
        useState<Date | Date[] | undefined>(undefined);
    const [productsDashboard, setProductsDashboard] = useState<ProductsFilterDashboard[]>([])
    const [informationCharData, setInformationCharData] = useState<informationCharData>()
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null)

    useEffect(() => {
        if (!rangeFilters) {
            const previuysYear = new Date().getFullYear() - 1
            const month = new Date().getMonth()
            const day = new Date().getDay()

            setRangeFilters([
                new Date(previuysYear, month, day),
                new Date()
            ])

            ProductService
                .filterProdutctsDashboard(
                    new Date(previuysYear, month, day),
                    new Date())
                .then(products => setProductsDashboard(products))
        }

        buildDashboard()
    }, [productsDashboard])

    const getLabels = () => {
        let labels: string[] = []

        productsDashboard.forEach(product => labels.push(product.name))

        return labels
    }

    const getData = () => {
        let data: number[] = []
        productsDashboard.forEach(product => data.push(product.quantity))

        return data
    }

    const filtersBackgroundColors = () => {
        let backgroundColorsFilter: string[] = []
        for (let i = 0; i < productsDashboard.length; i++) {
            backgroundColorsFilter.push(backgroundColorsDashboard[i])
        }

        return backgroundColorsFilter
    }

    const buildDashboard = () => {
        const labels = getLabels()
        const data = getData()
        const backgroundColors = filtersBackgroundColors()

        setInformationCharData({
            labels: labels,
            datasets: [{
                backgroundColor: backgroundColors,
                data: data,
                hoverBackgroundColor: backgroundColorsDashboard
            }]
        })
    }

    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#000000'
                }
            }
        }
    });

    const invokeFilter = async (data: Date | Date[] | undefined) => {
        setShowSpinnerLoading(true)

        const range = data as Date[]
        if (range.length === 2) {
            if (range[0] !== null && range[1] !== null) {
                const valuesDashboard = await ProductService.filterProdutctsDashboard(range[0], range[1])
                setProductsDashboard(valuesDashboard)

                if (valuesDashboard.length === 0) {
                    showSuccess('Nenhum produto encontrado nesse período!', '')
                }
            }
        }

        setShowSpinnerLoading(false)
    }

    const showSuccess = (sumary, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    return (
        <div className="container-dashboards">
            <Loading visible={showSpinnerLoading} />
            <Toast ref={toast} />



            <Calendar
                id="range"
                value={rangeFilters}
                onChange={async (e) => {
                    setRangeFilters(e.value)
                    await invokeFilter(e.value)
                }}
                selectionMode="range"
                readOnlyInput
                onMonthChange={() => { }}
                className="p-inputtext-sm block mb-2"
                placeholder='Filtre...'
                dateFormat="dd/mm/yy"
                showIcon
            />
            <br />

            {!showSpinnerLoading && productsDashboard.length === 0 ? (
                <LayoutEmpty title='Não há dados a serem exibidos' />
            ) :
                <>
                    <div className="cards">
                        <DashboardCard
                            title="Pedidos cancelados"
                            value="56"
                            icon={<ImCancelCircle />}
                            backgroundColor="#618044"
                        />
                        <DashboardCard
                            title="Pedidos concluídos"
                            value="432"
                            icon={<MdOutlineDoneOutline />}
                            backgroundColor="#49683b"
                        />
                        <DashboardCard
                            title="Pedidos cancelados (%)"
                            value="12%"
                            icon={<ImCancelCircle />}
                            backgroundColor="#34623f"
                        />
                        <DashboardCard
                            title="Quantidade de produtos"
                            value="89"
                            icon={<FiInbox />}
                            backgroundColor="#27412a"
                        />
                    </div>
                    <div className="dashboards">
                        <div className="dashboard-c">
                            <h1 style={{ marginTop: '50px' }}>Produtos mais vendidos</h1>
                            <Chart type="pie" data={informationCharData} options={lightOptions} />
                        </div>
                        <div className="dashboard-c">
                            <h1 style={{ marginTop: '50px' }}>Categorias mais vendidas</h1>
                            <Chart type="pie" data={informationCharData} options={lightOptions} />
                        </div>
                    </div>
                </>
            }
        </div >
    )
}