export interface ModalProps {
    open: boolean,
    handleClose: () => void,
}

interface Header {
    title: string,
    value: string,
}

interface BodyItem {
    id: number
    [key:string]: any
}

export interface TableProps {
    headers: Header[],
    body: BodyItem[],
    isLoading: boolean,
    getData: () => void,
    
}