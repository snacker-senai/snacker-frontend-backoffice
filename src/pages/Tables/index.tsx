/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { OrdersDialog } from '../../components/Dialogs/OrdersDialog'
import { TablesDialog } from '../../components/Dialogs/TablesDialog'
import { Loading } from '../../components/Loading'
import { AuthService } from '../../services/auth/AuthService'
import { Table } from '../../services/table/Models'
import { TableService } from '../../services/table/TableService'
import './styles.css'

export const Tables = () => {
    const [tables, setTables] = useState<Table[]>([])
    const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false)
    const [isTableModalOpen, setIsTableModalOpen] = useState(false)
    const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false)
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentTable, setCurrentTable] = useState<Table>()
    const [isWaiter, setIsWaiter] = useState(false)

    const TableActions = (data: Table) => (
        <div className="p-d-flex p-jc-end">
            {!isWaiter && <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-mx-2" onClick={() => handleEditTable(data)} />}
            <Button icon="pi pi-qrcode" className="p-button-rounded p-mx-2" onClick={() => getQrCode(data.id)} />
            <Button icon="pi pi-list" className="p-button-rounded p-mx-2" onClick={() => { setCurrentTable(data); setIsOrdersModalOpen(true) }} />
        </div>
    )

    const getQrCode = async (tableId: number) => {
        setIsLoading(true)
        const qrCodeUrl = await TableService.getQrCode(tableId)
        setQrCodeUrl(qrCodeUrl)
        setIsLoading(false)
        setIsQrCodeModalOpen(true)
    }

    const getAuth = async () => {
        const user = await AuthService.getInfoUserLogged()
        
        if (user?.role === 'Garçom') {
            setIsWaiter(true)
        }
    }

    const handleEditTable = (table: Table) => {
        setCurrentTable(table)
        setIsTableModalOpen(true)
    }

    const getTables = async () => {
        const tables = await TableService.getAll()
        setTables(tables)
    }

    const onCreateTable = async (table: Table) => {
        setTables([...tables, table])
    }

    const leftToolbarTemplate = () => {
        return (
            <Button
                label="Adicionar mesa"
                icon="pi pi-plus"
                className="p-button-primary mr-2"
                onClick={() => {
                    setCurrentTable(undefined)
                    setIsTableModalOpen(true)
                }}
            />
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" placeholder="Pesquise a mesa..." />
            </span>
        )
    }

    useEffect(() => {
        getTables()
        getAuth()
    }, [])

    return (
        <div className="container-tables">
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <DataTable 
                value={tables}
                stripedRows
                paginator
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" 
                rows={15}
            >
                <Column field="number" header="Número"></Column>
                <Column header="" body={(data) => TableActions(data)} />
            </DataTable>
            <Dialog
                visible={isQrCodeModalOpen}
                onHide={() => setIsQrCodeModalOpen(false)}
            >
                <QRCode value={qrCodeUrl} size={290} max="100%" />
            </Dialog>
            <OrdersDialog visible={isOrdersModalOpen} onHide={() => setIsOrdersModalOpen(false)} tableId={14} />
            <TablesDialog visible={isTableModalOpen} onHide={() => setIsTableModalOpen(false)} table={currentTable} onCreate={onCreateTable} />
            <Loading visible={isLoading} />
        </div>
    )
}