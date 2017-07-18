import React, { Component } from 'react';
import './App.css'; 
import LazyLoad from 'react-lazy-load'; // npm library to lazy-load images

// new component, using ES6 reforms
class Reddit extends Component {

	constructor(props){
		super(props); // avoid props being undefined
		this.state = { // initializing state of the component
			perma:[],
			url: [],
			title: [] // title array stores the titles of the posts
		};
	}

	// this is be invoked just before render()
	componentWillMount(){
		fetch('https://www.reddit.com/r/pics.json') // request to reddit api
		.then((response) => response.json())
		.then((responseJson) => {
			const url= responseJson.data.children.map(obj => obj.data.url); // navigate json data, store into arrays
			const perma= responseJson.data.children.map(obj => 'https://www.reddit.com'+obj.data.permalink);
			const title= responseJson.data.children.map(obj => obj.data.title);
			console.log(url); // test response data from Reddit API
			this.setState({
				url, perma, title 
			}); // set current state
		});

	}


	render() {

		return (
			<div>  

			{ // loop through the array and display permalinks
				//use of jsx means class becomes className, etc
				this.state.perma.map((link, i) => { 
					console.log(link); //test display permalinks
					var permal = <div key={i}><a href={link}>{link}</a> <br/></div>;
					return permal;
				})
			}

			{
				this.state.url.map((link, i) => {
					console.log(link);
					var urlz = 
						<div className="responsive" key={i}> 
							<div className="gallery" >
								<LazyLoad offsetVertical={300}>
									<img src={link} alt="not an image" />
								</LazyLoad>
							</div>
						</div>;
					return urlz;
				})
			}
			</div> // images are lazy loaded and responsive to the window-size
		);
	}
}

export default Reddit; 
