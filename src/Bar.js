import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import InputNumber from 'rc-input-number';

class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.item.Percent,
        };
        this.lastPressedChar = null;
    }

    /** @description Processing the input value.
     *  @param {number || string} `value` - Value from input.
     */
    changeInputValue(value){
        if(!value || value === ''){
            this.changeValue(0);
            return;
        }
        if (value > 100){
            this.changeValue(100);
            return;
        }

        let strValue;
        if(typeof value === 'string'){
            //Cleaning all unallowed symbols
            strValue = value.replace(/[^.0-9]/g, '');
            value = +strValue;
            if(isNaN(value)){
                this.setState({value: 0});
                return
            }
        }else{
            strValue = value + '';
        }
        //Replacing ',' with '.'
        if(this.lastPressedChar === ',' && strValue.indexOf('.') === -1){
            this.lastPressedChar = null;
            this.setState({value: this.state.value + '.'});
            return
        }
        //Checking if the amount of decimals > 2
        if(strValue.indexOf('.') !== -1 && strValue.length - strValue.indexOf('.') > 3){
            strValue = strValue.slice(0, -(strValue.length - strValue.indexOf('.') - 3));
            this.setState({value: +strValue});
            return;
        }
        //f item’s value ends with '.' It’s being saved in the state
        if(strValue.indexOf('.') === strValue.length - 1 && (strValue.match(/[.]/g) || []).length === 1){
            this.setState({value: strValue});
            return;
        }
        this.changeValue(value)
    }

    /** @description Getting the last pressed symbol.
     *  @param {string} `char` - Last pressed char .
     */
    onInputKeyDown(char){
        this.lastPressedChar = char;
    }

    /** @description Sending the information  about changed value of the item to it’s parent-component.
     *  @param {number} `value` - New item's percent value .
     */
    changeValue(value){
        this.props.changeValue(this.props.item.Id, parseFloat(value));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.item.Percent !== this.state.value) {
            this.setState({ value: nextProps.item.Percent });
        }
    }

    render() {
        return (
            <Row style={{marginBottom: '20px'}}>
                <Col xs={2}>
                    <span>{this.props.item.Name}</span>
                </Col>
                <Col xs={8}>
                    <input type='range' min='0' max='100' value={this.props.item.Percent} step='0.01' onChange={(e) => {this.changeValue(e.target.value)}}/>
                </Col>
                <Col xs={2}>
                    <InputNumber
                        min={0}
                        max={100}
                        step={0.1}
                        value={this.state.value}
                        style={{ width: 100 }}
                        onKeyDown={(e) => this.onInputKeyDown(e.key)}
                        onChange={(value) => this.changeInputValue(value)}
                    />
                </Col>
            </Row>
        );
    }
}

export default Bar;
