/*
 * @Description: 标签组件
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-28 22:17:47
 * @LastEditTime: 2022-08-30 01:27:35
 */
import React, { useEffect, useState } from 'react';
import { Tag, Input, Space } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import { randomColor } from '@/utils/utils';
import styles from '../style/index.module.less';
import { TweenOneGroup } from 'rc-tween-one';

function BlogTags(props) {
    const [tags, setTags] = useState(props.value || []);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [visible, setVisible] = useState(true);

    const init = (arr) => {
        const newArr = arr?.map((item) => {
            return {
                name: item,
                color: randomColor(),
            };
        });
        setTags(newArr || []);
    };

    // 为undefined 的时候才执行，后面添加或删除时前面的颜色不变
    useEffect(() => {
        init(props.value);
        // setTags(props.value);
    }, [props.value === undefined]);

    /**
     * @name: 添加标签
     * @msg:
     * @return {*}
     */
    function addTag() {
        /**
         * @name: 去重
         * @msg:
         * @param {*} arr
         * @return {*} arr
         */
        const removeRepeat = (arr) => {
            const map = new Map<string, string>();
            for (const item of arr) {
                // console.log(item);
                if (!map.has(item.name)) {
                    map.set(item.name, item);
                }
            }
            console.log(map.values());
            return [...map.values()];
        };
        // removeRepeat(tags)
        if (inputValue) {
            let newTags = tags;
            tags.push({
                name: inputValue,
                color: randomColor(),
            });
            newTags = removeRepeat(tags);
            setTags(newTags);
            setInputValue('');
            props.onChange && props.onChange(newTags.map((item) => item.name));
        }
        // if (tags.length >= props.max) {
        //     setVisible(false);
        // }
        setShowInput(false);
    }

    /**
     * @name: 删除标签
     * @msg:
     * @param {*} removeTag
     * @return {*}
     */
    function removeTag(removeTag) {
        const newTags = tags.filter((tag) => {
            if (tag.name !== removeTag) {
                return tag;
            }
        });
        setTags(newTags);
        props.onChange && props.onChange(newTags.map((item) => item.name));
    }

    useEffect(() => {
        if (tags?.length >= props.max) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [tags]);

    // const handleAdd = () => {
    // if (tags && tags.length !== 0) {
    //     if (props.max && tags.length < props.max) {
    //         setShowInput(true);
    //     }
    // } else {
    // setShowInput(true);
    // }
    // };

    /**
     * @name: 标签组件
     * @msg:
     * @param {*} tags
     * @return {*} React.FC
     */
    const tagChild = tags?.map((tag) => {
        const tagElem = (
            <Tag
                closable={true}
                color={tag.color}
                onClose={() => removeTag(tag.name)}
            >
                {tag.name}
            </Tag>
        );
        return (
            <div className={styles['tags-item']} key={tag.name}>
                {tagElem}
            </div>
        );
    });

    return (
        <Space wrap size={20}>
            <TweenOneGroup
                enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: 'from',
                    duration: 100
                }}
                leave={{
                    opacity: 0,
                    width: 0,
                    scale: 0,
                    duration: 200
                }}
            >
                {tagChild}
            </TweenOneGroup>
            {showInput ? (
                <Input
                    autoFocus
                    size="mini"
                    value={inputValue}
                    style={{ width: 84 }}
                    onPressEnter={addTag}
                    onBlur={addTag}
                    onChange={setInputValue}
                />
            ) : (
                <Tag
                    icon={<IconPlus />}
                    style={{
                        backgroundColor: 'var(--color-fill-2)',
                        border: '1px dashed var(--color-fill-3)',
                        cursor: 'pointer',
                    }}
                    visible={visible}
                    onClick={() => setShowInput(true)}
                >
                    添加
                </Tag>
            )}
        </Space>
    );
}

export default BlogTags;
