import React, { Component } from 'react';
import { Text, View, BackHandler, ScrollView, StatusBar, StyleSheet} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import PieChart from 'react-native-pie-chart';
import Header from '../components/Header';
import axios from 'axios';

let group = {};

class Room extends Component {
	

constructor(props) {
    super(props)
    console.log("room");
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

state = {name:'', funds:''};
componentDidMount(props){
	const id = this.props.navigation.getParam('id', 'Loading...');

	axios.get('https://rapid-api.herokuapp.com/api/groups/' + id)
	.then(response => {
      this.setState({ name: response.data.name, funds: response.data.funds});
    })
    .catch(err => {
      console.log(err);
    });
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
	console.log("lmao");
    this.props.navigation.goBack();
    return true;
}

  render(props) {

  	const styles = {
	  buttonPane: {
	  	paddingLeft: 40,
	  	paddingRight: 20,
	    justifyContent: 'space-around',
	    flexDirection: 'row'
	  },

	  header: {
	  	fontSize:20,
	  },
	    container: {
		    flex: 1,
		    alignItems: 'center'
		},

	  title: {
	    fontSize: 24,
	    margin: 10
	  },

	  headerPlacement: {
	  	flex: 1,
	  	alignItems: 'center'
	  }
	};

	const chart_wh = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

    return (
    	<View>
    		<Header headerText = { this.state.name } />
	    	<Card>
		    	<CardSection >
		    		<ScrollView style={{flex: 1}}>
			    		<View style={styles.container}>
				    		<StatusBar
				            hidden={true}
				            />
				            
				            <PieChart
					            chart_wh={chart_wh}
					            series={series}
					            sliceColor={sliceColor}
					            doughnut={true}
					            coverRadius={0.45}
					            coverFill={'#FFF'}
				            />
				            <Text style={styles.title}>$ { this.state.funds }</Text>
			            </View>
		     		</ScrollView>
		      	</CardSection>
		   	</Card>
		    <Card>
		    	<CardSection >
		    		<View style={styles.headerPlacement} >
			      		<Text style={styles.header}>Action Controls</Text>
			      	</View>
		      	</CardSection>

		      	<CardSection>
			      	<View style = {styles.buttonPane}>
			      		<Button onPress={() => console.log("Request")} name={'Request'}/>
			      		<Button onPress={() => console.log("Fund")} name={'Fund'}/>
			      		<Button onPress={() => console.log("Share")} name={'Share'}/>
		  			</View>
		      	</CardSection>
		   </Card>
	   </View>
    );
  }
}

export { Room }