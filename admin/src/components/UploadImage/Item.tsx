/*
 * @Description: 介绍图片Item
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-29 03:36:50
 * @LastEditTime: 2022-08-29 23:56:34
 */
import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Message,
    Modal,
    Spin,
    Upload,
} from '@arco-design/web-react';
import { IconDelete, IconEdit, IconPlus } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import { imagesType } from '@/utils/utils';
import { upload } from '@/api/request/common';

const Item = (props) => {
    const {
        onChange,
        onRemove,
        onAdd,
        index = 0,
        showImg,
        showLink,
        showIcon,
        showAction,
        showAdd = true,
        showReduce = false,
        imgUrl,
        link,
        icon,
    } = props;
    const [imageUrl, setImageUrl] = useState<string>(imgUrl || '');
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    useEffect(() => {
        setImageUrl(imgUrl);
        form.setFieldsValue({
            imgUrl,
        });
    }, [imgUrl]);

    /**
     * @name: 确认修改图片链接
     * @msg:
     * @return {*}
     */
    const onOk = async () => {
        await form.validate();
        const values = await form.getFields();
        onChange({
            index,
            field: 'imgUrl',
            value: values.imgUrl,
        });
        onChange();
    };
    /**
     * @name: 取消
     * @msg:
     * @return {*}
     */
    const onCancel = () => {
        form.resetFields();
        setVisible(false);
    };

    /**
     * @name: 改变链接
     * @msg:
     * @param {string} value
     * @return {*}
     */
    const handleChangeLink = (value: string) => {
        onChange({
            index,
            field: 'link',
            value,
        });
    };
    /**
     * @name: 改变图标
     * @msg:
     * @param {string} value
     * @return {*}
     */
    const handleChangeIcon = (value: string) => {
        onChange({
            index,
            field: 'icon',
            value,
        });
    };

    const beforeUpload = async (file) => {
        const isImage = imagesType.includes(file.type);
        if (!isImage) {
            return Message.warning('请上传jpg,jpeg,webp,png,gif格式图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            return Message.warning('请上传2MB以内的图片');
        }

        setLoading(true);
        setImageUrl('');
        const formData = new FormData();
        formData.append('file', file);
        // const res = await upload(formData);
        const res = [
            {
                "hash":"FgOETQ8j4Zpygl6WWpZQ_75N20Sf",
                "key":"3a4e66a577cde9b8e8c5550dc51aaaba.png",
                "url":"http://img.nevergiveupt.top/3a4e66a577cde9b8e8c5550dc51aaaba.png"
            }
        ]
        if (res) {
            setImageUrl(res[0].url);
            onChange({
                index,
                field: 'imgUrl',
                value: res[0].url,
            });
            setLoading(false);
        }
        return false;
    };

    const uploadButton = (
        <div className="arco-upload-trigger-picture">
            <div className="arco-upload-trigger-picture-text">
                {loading ? <Spin /> : <IconPlus />}
            </div>
        </div>
    );

    return (
        <div className={styles['item']}>
            <div className={styles['item-content']}>
                {showImg && (
                    <div className={styles['upload-wrapper']}>
                        <Upload
                            showUploadList={false}
                            name="file"
                            listType="picture-card"
                            beforeUpload={beforeUpload}
                        >
                            {imageUrl ? (
                                <div className="arco-upload-list-item-picture custom-upload-avatar">
                                    <img src={imageUrl} />
                                    <div className="arco-upload-list-item-picture-mask">
                                        <IconEdit />
                                    </div>
                                </div>
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                        <Button
                            className={styles['btn-input']}
                            onClick={() => setVisible(true)}
                            type="primary"
                        >
                            输入链接
                        </Button>
                    </div>
                )}

                {showAction && (
                    <div>
                        {showLink && (
                            <Input
                                onChange={handleChangeLink}
                                className={styles['input']}
                                value={link}
                                addBefore="链接"
                            />
                        )}

                        {showIcon && (
                            <Input
                                onChange={handleChangeIcon}
                                className={styles['input']}
                                value={icon}
                                addBefore="图标"
                            />
                        )}
                    </div>
                )}

                <div className={styles['action']}>
                    {showReduce && (
                        <Button
                            icon={<IconDelete />}
                            status="danger"
                            shape="circle"
                            className={styles['action-btn']}
                            onClick={() => onRemove(index)}
                            type="primary"
                        />
                    )}

                    {showAdd && (
                        <Button
                            icon={<IconPlus />}
                            shape="circle"
                            className={styles['action-btn']}
                            onClick={onAdd}
                            type="primary"
                        />
                    )}
                </div>

                <Modal
                    title={<div style={{ textAlign: 'left' }}>图片链接</div>}
                    visible={visible}
                    onOk={onOk}
                    onCancel={onCancel}
                >
                    <Form form={form}>
                        <Form.Item
                            label="图片链接"
                            field="imgUrl"
                            rules={[
                                { required: true, message: '请输入图片链接' },
                            ]}
                        >
                            <Input placeholder="请输入图片链接" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Item;
