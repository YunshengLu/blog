/*
 * @Description: 标签云组件
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-26 03:38:52
 * @LastEditTime: 2022-08-30 01:38:01
 */
import {
    Breadcrumb,
    Card,
    Form,
    Grid,
    Input,
    Link,
    Message,
    Switch,
} from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import BlogTags from './components/BlogTags';
import styles from './style/index.module.less';
import Save from '@/components/Save';
import UploadImage from '@/components/UploadImage';
import { addAbout, queryAbout, updateAbout } from '@/api/request/about';

const Row = Grid.Row;
const Col = Grid.Col;

const About = () => {
    const [form] = Form.useForm();
    const [resetLength, setResetLength] = useState<number>(800);
    const [showTip, setShowTip] = useState<boolean>(false);
    const [time, setTime] = useState();

    /**
     * @name: 获取关于数据
     * @msg: 
     * @param {boolean} isRefresh
     * @return {*}
     */
    const loadData = async (isRefresh?:boolean) => {
        const res: any = await queryAbout();
        if (isRefresh) {
            Message.success('刷新成功')
        }
        const data = res.data;
        if (!data) return;
        // 填充表单
        form.setFieldsValue(data);
        // 计算还可输入字数
        onChangeDesc(data.desc)
        setTime(data.updateTime);
        // console.log(res);
    };

    useEffect(() => {
        loadData();
    }, []);

    /**
     * @name: 保存标签值
     * @msg:
     * @return {*}
     */
    const onSave = async () => {
        await form.validate();
        const values = await form.getFields();
        
        values.imgs = values.imgs?.map(item => {
            return {
                _id: item._id,
                imgUrl: item.imgUrl,
                link: item.link
            }
        })
        console.log(values);
        const func = values._id ? updateAbout : addAbout;
        const res: any = await func(values);
        console.log(res);
        if (res.data) {
            loadData();
            Message.success(res.msg);
        } else {
            Message.error('修改失败,请重试');
        }
    };

    /**
     * @name: 刷新 
     * @msg: 
     * @return {*}
     */    
    const onRefresh = () => {
        loadData(true);
    };

    /**
     * @name: 剩余还能输入字符长度
     * @msg:
     * @param {*} String
     * @return {*}
     */
    const onChangeDesc = (value) => {
        setResetLength(800 - value.length);
    };

    return (
        <>
            <Save time={time} onRefresh={onRefresh} onSave={onSave} />
            <div className={styles.container}>
                <Breadcrumb style={{ marginBottom: 20 }}>
                    <Breadcrumb.Item>关于管理</Breadcrumb.Item>
                </Breadcrumb>
                <Card hoverable>
                    <Form layout="vertical" form={form}>
                        <Row>
                            <Col span={10}>
                                <Form.Item
                                    label="标签云:(1-20个)"
                                    field="tags"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请添加标签',
                                        },
                                    ]}
                                >
                                    <BlogTags max={20} />
                                </Form.Item>

                                <Form.Item
                                    label="详细介绍"
                                    field="desc"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入详细介绍',
                                        },
                                        {
                                            maxLength: 800,
                                            message: '不能超过800字符',
                                        },
                                    ]}
                                >
                                    <Input.TextArea
                                        // 聚焦显示还可输入字数
                                        onFocus={() => setShowTip(true)}
                                        // 失去焦点隐藏还可输入字数
                                        onBlur={() => setShowTip(false)}
                                        rows={5}
                                        onChange={onChangeDesc}
                                    />
                                </Form.Item>

                                {showTip && (
                                    <div className={styles['desc-tip']}>
                                        还可以输入
                                        <Link status="error" disabled>
                                            {resetLength}
                                        </Link>
                                        个字符
                                    </div>
                                )}

                                <Form.Item
                                    label="个人简历"
                                    field="showResume"
                                    triggerPropName="checked"
                                >
                                    <Switch />
                                </Form.Item>
                            </Col>

                            <Col span={12} offset={2}>
                                <Form.Item
                                    label="介绍图片:(1-3张)"
                                    field="imgs"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请添加介绍图片',
                                        },
                                    ]}
                                >
                                    <UploadImage max={3} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default About;
