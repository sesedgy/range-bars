import React, {Component} from 'react';
import Slider from './Slider';
import {Button, Col, ControlLabel, FormControl, Grid, Row} from 'react-bootstrap';
import './App.css';
import 'rc-input-number/assets/index.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            itemsCount: 5
        };
    }

    /** @description Imitating server request
     *  @param {number} `itemsCount` - Count of items.
     *  @return {Promise}
     */
    imitateGetRequest(itemsCount){
        return new Promise((resolve) => {
            setTimeout(() => {
                let data = [];
                for (let i = 0; i < itemsCount; i++) {
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
        this.imitateGetRequest(this.state.itemsCount).then((result) => {
            let percentSum = 0;
            result.forEach((item, index) => {
                item.Id = index;
                percentSum += item.Percent;
            });
            this.setState({data: result});
        });
    }

    /** @description Counting the amount of items.
     *  @param {number} `id` - Changed item id.
     *  @param {number} `value` - New item's percent value.
     */
    onChangeSliderValue(id, value){
        let data = this.state.data;
        let changedItem = data.find((item) => item.Id === id);

        changedItem.Percent = value;
        this.setState({data: data});
    };
    
    componentDidMount(){
        this.getData();
    }

    render() {
        const sliderList = [];
        const itemsList = [];
        this.state.data.forEach((item) => {
            sliderList.push(<Slider key={item.Id} item={item} changeValue={(id, value) => this.onChangeSliderValue(id, value)}/>);
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
                                value={this.state.itemsCount}
                                onChange={(e) => this.setState({itemsCount: e.target.value})}
                            />
                        </Col>
                        <Col xs={3}>
                            <Button style={{marginTop: '25px'}} onClick={() => this.getData()}>Change</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>{sliderList}</Col>
                    </Row>
                    <Row>
                        <Col xs={6}>{itemsList}</Col>
                    </Row>
                </Grid>
            </div>

        );
    }
}

export default App;
