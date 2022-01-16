import React, { useState, useMemo } from 'react';
import { Button, Input, Select } from 'antd';
import html_colors from '../resource/colors';

const { Option } = Select;

const CalendarModal = props => {
    const [input, setInput] = useState(props.value);
    const [color, setColor] = useState(props.color);

    const handleRemove = () => props.onRemove();
    const handleSave = () => {
        console.log("saving ", input);
        props.onSave({
            value: input,
            color
        });
    }

    const renderText = () => {
        const {
            start,
            end,
        } = props;

        if (start.isSame(end, 'day')) {
            return <span>{`${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>
        }

        return <span>{`${start.format('Do MMM.')} - ${end.format('Do MMM.')}, ${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>;
    }

    const color_options = useMemo(() => html_colors.map((color, index) => <Option value={color} key={index}>{color}</Option>), []);

    return (
        <div className="modal">
            <div className="modal-text">{renderText()}</div>
            <Input
                className="modal-input"
                type="text"
                placeholder="Enter something"
                defaultValue={props.value}
                onChange={e => setInput(e.target.value)}
            />
            <Select
                showSearch
                className='modal-select'
                placeholder='Select Color'
                optionFilterProp='children'
                filterOption={(input, option) => {
                    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
                filterSort={(optionA, optionB) => {
                    return optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }}
                onSelect={(value) => setColor(value)}
                defaultValue={props.color}
                >
                    {color_options}
            </Select>
            <Button className='modal-button' onClick={handleRemove}>{props.actionType === 'edit' ? 'Delete' : 'Cancel'}</Button>
            <Button className='modal-button float-right' onClick={handleSave}>Save</Button>
        </div>
    )
}

export default CalendarModal;