/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css'
import { useEffect, useRef, useState } from 'react';

import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import { ProductsFilterDashboard } from '../../services/product/Models';
import { ProductService } from '../../services/product/ProductService';
import { Loading } from '../../components/Loading';
import { Toast } from 'primereact/toast';

interface informationCharData {
    labels: string[]
    datasets: {
        data: number[]
        backgroundColor: string[]
        hoverBackgroundColor: string[]
    }[]
}

const backgroundColorsDashboard = [
    "#f078f0",
    "#0000CD",
    "#778899",
    "#00CED1",
    "#00FF7F",
    "#00FF00",
    "#7B68EE",
    "#8B008B",
    "#B0E0E6",
    "#F0E68C",
]

const hoverBackgroundColorsDashboard = [
    "#f078f0",
    "#0000CD",
    "#778899",
    "#00CED1",
    "#00FF7F",
    "#00FF00",
    "#7B68EE",
    "#8B008B",
    "#B0E0E6",
    "#F0E68C",
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

    const filterHouverBackgroundColors = () => {
        let houveBackgroundColorsFilter: string[] = []
        for (let i = 0; i < productsDashboard.length; i++) {
            houveBackgroundColorsFilter.push(hoverBackgroundColorsDashboard[i])
        }

        return houveBackgroundColorsFilter
    }

    const buildDashboard = () => {
        const labels = getLabels()
        const data = getData()
        const backgroundColors = filtersBackgroundColors()
        const houverbackgroundColors = filterHouverBackgroundColors()

        setInformationCharData({
            labels: labels,
            datasets: [{
                backgroundColor: backgroundColors,
                data: data,
                hoverBackgroundColor: houverbackgroundColors
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
            <h1>Dashboards - Produtos vendidos</h1>
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
            <div className="dashboards-content">
                <Chart type="doughnut" data={informationCharData} options={lightOptions} />
            </div>
        </div >
    )
}