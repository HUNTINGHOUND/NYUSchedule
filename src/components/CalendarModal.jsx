import React, { useState, useMemo } from 'react';
import { Button, Input, Select, TimePicker } from 'antd';
import html_colors from '../resource/colors';

const { Option } = Select;
const { RangePicker } = TimePicker;

const CalendarModal = props => {
    const [input, setInput] = useState(props.value);
    const [color, setColor] = useState(props.color);
    const [start, setStart] = useState(props.start);
    const [end, setEnd] = useState(props.end);

    const handleRemove = () => props.onRemove();
    const handleSave = () => {
        props.onSave({
            start,
            end,
            value: input,
            color
        });
    }

    const renderText = () => {
        if (start.isSame(end, 'day')) {
            return <span>{`${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>
        }

        return <span>{`${start.format('Do MMM.')} - ${end.format('Do MMM.')}, ${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>;
    }

    const color_options = useMemo(() => html_colors.map((color, index) => <Option value={color} key={index}><div className="color-box" style={{backgroundColor: color}}></div>{color}</Option>), []);

    return (
        <div className="modal">
            <div className="modal-text">{renderText()}</div>
            <RangePicker
                className="modal-picker"
                defaultValue={[start, end]}
                onChange={moments => {
                    setStart(moments[0]);
                    setEnd(moments[1]);
                }}
                format="HH:mm"
                minuteStep={15}
                disabledHours={() => {
                    const disabled = [...Array(6).keys(), ...(Array.from(Array(4).keys()).map((num) => {
                        return num + 20;
                    }))];
                    return disabled;
                }}
            />
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
                    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
                filterSort={(optionA, optionB) => {
                    return optionA.value.toLowerCase().localeCompare(optionB.value.toLowerCase())
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