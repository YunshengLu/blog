/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-26 00:26:17
 * @LastEditTime: 2022-08-26 01:05:33
 */
import React, {
    useState,
    useRef,
    useEffect,
    useContext,
    useCallback,
} from 'react';
import { Input, Form, FormInstance, Message } from '@arco-design/web-react';
import styles from './style/index.module.less';
const FormItem = Form.Item;
const EditableContext = React.createContext<{ getForm?: () => FormInstance }>({
    getForm: null,
});

const EditableRow = (props) => {
    const { children, record, className, ...rest } = props;
    const refForm = useRef(null);

    const getForm = () => refForm.current;

    return (
        <EditableContext.Provider
            value={{
                getForm,
            }}
        >
            <Form
                style={{ display: 'table-row' }}
                // eslint-disable-next-line react/no-children-prop
                children={children}
                ref={refForm}
                wrapper="tr"
                wrapperProps={rest}
                className={`${styles['editable-row']}`}
            />
        </EditableContext.Provider>
    );
};

const EditableCell = (props) => {
    const { children, className, rowData, column, onHandleSave } = props;
    const ref = useRef(null);
    const refInput = useRef(null);
    const { getForm } = useContext(EditableContext);
    const [editing, setEditing] = useState(false);

    const handleClick = useCallback(
        (e) => {
            if (
                editing &&
                column.editable &&
                ref.current &&
                !ref.current.contains(e.target) &&
                !e.target.classList.contains('js-demo-select-option')
            ) {
                cellValueChangeHandler();
                // cellValueChangeHandler(rowData[column.dataIndex]);
            }
        },
        [editing, rowData, column]
    );

    useEffect(() => {
        editing && refInput.current && refInput.current.focus();
    }, [editing]);

    useEffect(() => {
        document.addEventListener('click', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [handleClick]);

    const cellValueChangeHandler = () => {
        const form = getForm();
        form.validate([column.dataIndex], (errors, values) => {
            if (!errors || !errors[column.dataIndex]) {
                setEditing(!editing);
                onHandleSave && onHandleSave({ ...rowData, ...values });
            }
        });
    };

    if (editing) {
        return (
            <div ref={ref}>
                <FormItem
                    style={{ marginBottom: 0 }}
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 24 }}
                    initialValue={rowData[column.dataIndex]}
                    field={column.dataIndex}
                    rules={[
                        {
                            required: true,
                            message: '分类名称为必填项',
                        },
                    ]}
                >
                    <Input
                        ref={refInput}
                        onPressEnter={cellValueChangeHandler}
                    />
                </FormItem>
            </div>
        );
    }

    const toggleEdit = () => {
        if (column.editable) {
            if (rowData.articleNum > 0) {
                return Message.warning('该分类下有文章，不能修改!');
            }
            setEditing(!editing);
        }
    };

    return (
        <div
            className={
                column.editable ? `${styles['editable-cell']}` : className
            }
            onClick={toggleEdit}
        >
            {children}
        </div>
    );
};

export { EditableCell, EditableRow };
