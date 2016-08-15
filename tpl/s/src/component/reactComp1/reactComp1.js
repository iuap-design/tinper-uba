import React from 'react';
import ReactDOM from 'react-dom';



class RComp1 extends React.Component {

    change1(event) {
        console.log('chanage');
        this.props.data.setValue('f1', event.target.value)
    };

    componentWillMount() {
        var self = this;
        var dt = this.props.data;
        var value = dt.getValue('f1');
        this.setState({value:value});
        dt.on('f1.valueChange', function(event){
            self.setState({value:event.newValue});
            console.log(self.state.value);
        })
    }

    componentDidMount(){

    };



    render(){
        return(
            <div>
                <div>{this.state.value}</div>
                <input type="text" value={this.state.value} onChange={this.change1.bind(this)}/>
            </div>
        )
    }
}

export default RComp1;