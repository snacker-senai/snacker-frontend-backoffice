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
import { MdOutlineDoneOutline } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { FiInbox } from 'react-icons/fi'
import LayoutEmpty from '../../components/LayoutEmpty';
import { Requester } from '../../services/configuration-proxy/ConfigurationProxy';
import moment from 'moment';


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
        useState<Date | Date[] | undefined>(getDefaultRangeFilters());
    const [productsDashboard, setProductsDashboard] = useState<ProductsFilterDashboard[]>([])
    const [informationCharData, setInformationCharData] = useState<informationCharData>()
    const [informationCharData2, setInformationCharData2] = useState<informationCharData>()
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const [usersCount, setUsersCount] = useState()
    const [finishedOrders, setFinishedOrders] = useState()
    const [topSellingCategories, setTopSellingCategories] = useState([])
    const [topSellingCategory, setTopSellingCategory] = useState("")
    const [activeProductsCount, setActiveProductsCount] = useState()
    const toast = useRef<any>(null)

    useEffect(() => {
        const onLoad = async () => {
            const getProducts = async () => {
                const products = await ProductService.filterProdutctsDashboard(
                    rangeFilters![0],
                    rangeFilters![1]
                )

                setProductsDashboard(products)

                return products
            }

            const [products, categories] = await Promise.all([
                getProducts(),
                getTopSellingCategories(rangeFilters![0], rangeFilters![1]),
                getUsersCount(),
                getFinishedOrders(),
                getActiveProductsCount()
            ])

            buildDashboards(products, categories.topSellingCategories)
        }

        onLoad()
    }, [])

    function getDefaultRangeFilters () {
        const previuysYear = new Date().getFullYear()
        const month = new Date().getMonth() - 6
        const day = new Date().getDay()

        return [new Date(previuysYear, month, day), new Date()]
    }

    const getLabels = (products: any) => {
        let labels: string[] = []

        products.forEach(product => labels.push(product.name))

        return labels
    }

    const getTopSellingCategoriesLabels = (categories: any) => {
        let labels: string[] = []

        categories.forEach((category: any) => labels.push(category.name))

        return labels
    }

    const getData = (products: any) => {
        let data: number[] = []
        products.forEach(product => data.push(product.quantity))

        return data
    }

    const getTopSellingCategoriesData = (categories: any) => {
        let data: number[] = []
        categories.forEach((category: any) => data.push(category.quantity))

        return data
    }

    const getUsersCount = async () => {
        const response = await Requester.get('/user/count')
        setUsersCount(response.data)

        return response.data
    }

    const getFinishedOrders = async () => {
        const response = await Requester.get('/order/finished')
        setFinishedOrders(response.data)

        return response.data
    }

    const getActiveProductsCount = async () => {
        const response = await Requester.get('/product/actives')
        setActiveProductsCount(response.data)

        return response.data
    }

    const getTopSellingCategories = async (initialDate: Date, finalDate: Date) => {
        const initialDateFormat = moment(initialDate).format().toString()
        const finalDateFormat = moment(finalDate).format().toString()

        const { data } = await Requester.get(`/productcategory/topselling?initialDate=${initialDateFormat}&finalDate=${finalDateFormat}`)
        
        const topSellingCategories = data.map(item => {
            let quantity = 0

            item.forEach(category => {
                quantity += category.quantity
            })

            return {
                name: item[0].name,
                quantity
            }
        })

        setTopSellingCategory(topSellingCategories[0].name)

        setTopSellingCategories(topSellingCategories)

        return {
            topSellingCategories,
            topSellingCategory: topSellingCategories[0].name
        }
    }

    const filtersBackgroundColors = (products: any) => {
        let backgroundColorsFilter: string[] = []
        for (let i = 0; i < products.length; i++) {
            backgroundColorsFilter.push(backgroundColorsDashboard[i])
        }

        return backgroundColorsFilter
    }

    const buildDashboards = (products: any, categories: any) => {
        const labels = getLabels(products)
        const data = getData(products)
        const backgroundColors = filtersBackgroundColors(products)
        console.log(backgroundColors)

        setInformationCharData({
            labels: labels,
            datasets: [{
                backgroundColor: backgroundColors,
                data: data,
                hoverBackgroundColor: backgroundColorsDashboard
            }]
        })

        const backgroundColors2 = filtersBackgroundColors(categories)
        const topSellingCategoriesLabels = getTopSellingCategoriesLabels(categories)
        const topSellingCategoriesData = getTopSellingCategoriesData(categories)

        setInformationCharData2({
            labels: topSellingCategoriesLabels,
            datasets: [{
                backgroundColor: backgroundColors2,
                data: topSellingCategoriesData,
                hoverBackgroundColor: backgroundColors2
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

                getTopSellingCategories(range[0], range[1])

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
                    console.log(e.value)
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
                            title="Quantidade de funcionários"
                            value={String(usersCount)}
                            icon={<AiOutlineUser />}
                        />
                        <DashboardCard
                            title="Pedidos concluídos"
                            value={String(finishedOrders)}
                            icon={<MdOutlineDoneOutline />}
                        />
                        <DashboardCard
                            title="Categoria mais vendida"
                            value={topSellingCategory}
                            icon={<FiInbox />}
                        />
                        <DashboardCard
                            title="Quantidade de produtos ativos"
                            value={String(activeProductsCount)}
                            icon={<FiInbox />}
                        />
                    </div>
                    <div className="dashboards">
                        <div className="dashboard-c">
                            <h1 style={{ marginTop: '50px' }}>Produtos mais vendidos</h1>
                            <Chart type="pie" data={informationCharData} options={lightOptions} />
                        </div>
                        <div className="dashboard-c">
                            <h1 style={{ marginTop: '50px' }}>Categorias mais vendidas</h1>
                            <Chart type="pie" data={informationCharData2} options={lightOptions} />
                        </div>
                    </div>
                </>
            }
        </div >
    )
}