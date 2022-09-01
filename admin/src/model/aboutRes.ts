/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-30 00:08:02
 * @LastEditTime: 2022-08-30 00:12:30
 */
interface IImage {
    _id?: string;
    imgUrl?: string;
    link?: string;
    icon?: string;
    showAdd?: boolean;
    showReduce?: boolean;
}
export interface About {
    msg: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: Object;
    tags: string;
    createTime: string;
    updateTime: string;
    showResume: boolean;
    _id: string;
    desc: string;
    imgs: Array<IImage>;
    code: string;
}