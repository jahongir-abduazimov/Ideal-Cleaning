export interface GetParams {
    limit: number,
    page: number,
    owner_id: string | undefined,
}
export interface post {
    name: string;
    owner_email: string;
    price: number;
}
export interface Request {
    get_services: (params: GetParams) => any
    post_services: (params: post) => any
    delete_services: (id:number) => any
}