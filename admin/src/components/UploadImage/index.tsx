/*
 * @Description: 介绍图片管理组件
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-29 03:26:21
 * @LastEditTime: 2022-08-29 23:34:55
 */
import React, { useEffect, useState } from 'react';
import Item from './Item';

interface IImage {
    _id?: string;
    imgUrl?: string;
    link?: string;
    icon?: string;
    showAdd?: boolean;
    showReduce?: boolean;
}

const initImgs: Array<IImage> = [
    {
        _id: '',
        imgUrl: '',
        link: '',
        icon: '',
    },
];

const UploadImage = (props) => {
    const {
        value,
        onChange,
        max,
        showImg = true,
        showLink = true,
        showIcon = false,
        showAction = true,
    } = props;
    const [imgsArr, setImgsArr] = useState<Array<IImage>>(() => {
        return value ? value : initImgs;
    });

    useEffect(() => {
        if (!value) {
            setImgsArr(initImgs);
        } else {
            const length = value.length;
            value.map((item, index) => {
                if (length < max) {
                    item.showReduce = length != 1;
                    item.showAdd = length - 1 === index;
                } else {
                    item.showReduce = true; // 可以删除
                    item.showAdd = false;
                }
            });
            setImgsArr(value);
        }
    }, [value]);

    const onItemChange = (data) => {
        // console.log(data);
        imgsArr.forEach((item, index) => {
            if (index === data?.index) {
                item[data.field] = data.value;
            }
        });
        onChange(imgsArr);
    };

    const onAdd = () => {
        if (imgsArr.length < max) {
            imgsArr.push({
                imgUrl: '',
                link: '',
                icon: '',
            });
            onChange(imgsArr);
        }
    };

    const onRemove = (index) => {
        if (imgsArr.length > 1) {
            imgsArr.splice(index, 1);
            onChange(imgsArr);
        }
    };

    return (
        <>
            {imgsArr?.map((item, index) => (
                <Item
                    key={index}
                    {...item}
                    index={index}
                    onChange={onItemChange}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    showImg={showImg}
                    showIcon={showIcon}
                    showLink={showLink}
                    showAction={showAction}
                />
            ))}
        </>
    );
};

export default UploadImage;
