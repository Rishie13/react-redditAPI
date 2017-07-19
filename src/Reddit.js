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
			console.log(this.state.perma); //test display permalinks
		return (
			<div >

			{
				this.state.url.map((link, i) => {
					console.log(link); //test display urls
					var urlz = 
						<div className="responsive" key={i}> 
						<a target="_blank" href={this.state.perma[i]}>
						
							<div className="gallery" >
								<LazyLoad offsetVertical={250} height={300}>
									<img src={link} alt="not an image" />
								</LazyLoad>
								<p>{this.state.title[i]}</p> 
							</div> 
							
						</a>
						
						</div>;
					return urlz;
				})
			}
			</div>
		);
	}
}

export default Reddit; 
