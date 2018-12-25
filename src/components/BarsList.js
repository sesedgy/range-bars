import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, Grid, Row} from 'react-bootstrap';
import Bar from "./Bar";

class BarsList extends Component {
    state = {
        data: [],
        itemsCount: 5
    };

    /** @description Imitating server request
     *  @param {number} `itemsCount` - Count of items.
     *  @return {Promise}
     */
    imitateGetRequest(itemsCount){
        return new Promise((resolve) => {
            setTimeout(() => {
                let data = [];
                for (let i = 0; i < itemsCount; i += 1) {
                    data.push({
                        Name: 'Item ' + (i + 1),
                        Percent: i === 0 ? 40 : 0
                    });
                }
                resolve(data);
            }, 1000)
        });
    }

    /** @description Receiving server response
     */
    getData(){
        let itemsCount = this.state.itemsCount;
        if(itemsCount > 0) {
            this.imitateGetRequest(itemsCount).then((result) => {
                let percentSum = 0;
                result.forEach((item, index) => {
                    item.Id = index;
                    percentSum += item.Percent;
                });
                // If the total sum of all item's values is less than 100
                if (percentSum < 100) {
                    let value = 100 - percentSum;
                    while (value >= 0) {
                        this.increaseMinBarValue(result, null, 0.1);
                        value -= 0.1;
                    }
                    // If the total sum of all item's values is more than 100
                } else if (percentSum > 100) {
                    let value = percentSum - 100;
                    while (value >= 0) {
                        this.decreaseMaxBarValue(result, null, 0.1);
                        value -= 0.1;
                    }
                }
                this.setState({data: result});
            });
        }
    }

    /** @description Counting the amount of items.
     *  @param {number} `id` - Changed item id.
     *  @param {number} `value` - New item's percent value.
     */
    onChangeBarValue(id, value){
        let data = this.state.data;
        let changedItem = data.find((item) => item.Id === id);

        //Value increase
        if(changedItem.Percent < value){
            this.decreaseMaxBarValue(data, id, value - changedItem.Percent);
        //Value decrease
        }else{
            this.increaseMinBarValue(data, id, changedItem.Percent - value);
        }
        changedItem.Percent = value;
        this.setState({data: data});
    };

    /** @description Increasing the value of item with the smallest value.
     *  @param {object} `data` - Array with all items.
     *  @param {number || null} `id` - Changed item id.
     *  @param {number} `value` - Item was changed on 'value'.
     */
    increaseMinBarValue(data, id, value){
        if(data.length !== 1) {
            let minValue = id === 0 ? data[1].Percent : data[0].Percent;
            let itemWithMinValue = id === 0 ? data[1] : data[0];
            data.forEach((item) => {
                if (item.Id !== id) {
                    if (item.Percent < minValue) {
                        minValue = item.Percent;
                        itemWithMinValue = item;
                    }
                }
            });
            itemWithMinValue.Percent = Number((itemWithMinValue.Percent + value).toFixed(2));
        }
    }

    /** @description Decreasing the value of item with the biggest value.
     *  @param {object} `data` - Array with all items.
     *  @param {number || null} `id` - Changed item id.
     *  @param {number} `value` - Item was changed on 'value'.
     */
    decreaseMaxBarValue(data, id, value){
        if(data.length !== 1) {
            let maxValue = id === 0 ? data[1].Percent : data[0].Percent;
            let itemWithMaxValue = id === 0 ? data[1] : data[0];
            data.forEach((item) => {
                if (item.Id !== id) {
                    if (item.Percent > maxValue) {
                        maxValue = item.Percent;
                        itemWithMaxValue = item;
                    }
                }
            });
            //If the value of the max-item might become negative then it’s remainder is redistributed between the remaining items
            let remainder = Number((itemWithMaxValue.Percent - value).toFixed(2));
            if (remainder < 0) {
                itemWithMaxValue.Percent = 0;
                this.decreaseMaxBarValue(data, id, -remainder);
            } else {
                itemWithMaxValue.Percent = remainder;
            }
        }
    }

    componentDidMount(){
        this.getData();
    }

    render() {
        const { data, itemsCount } = this.state;
        const barsList = [];
        const itemsList = [];
        data.forEach((item) => {
            barsList.push(<Bar key={item.Id} item={item} changeValue={(id, value) => this.onChangeBarValue(id, value)}/>);
            itemsList.push(<Row key={item.Id}>{item.Name}: {item.Percent}%</Row>)
        });
        return (
            <div>
                <Grid style={{padding: '40px'}}>
                    <Row style={{marginBottom: '30px'}}>
                        <Col xs={3}>
                            <ControlLabel>Items count</ControlLabel>
                            <FormControl
                                type='number'
                                value={itemsCount}
                                onChange={(e) => this.setState({itemsCount: e.target.value})}
                            />
                        </Col>
                        <Col xs={3}>
                            <Button style={{marginTop: '25px'}} onClick={() => this.getData()}>Change</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>{barsList}</Col>
                    </Row>
                    <Row>
                        <Col xs={6}>{itemsList}</Col>
                    </Row>
                </Grid>
            </div>

        );
    }
}

export default BarsList;
