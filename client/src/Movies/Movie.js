import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
//import Link from react router dom to include a link within the MovieCard component that will take us to the UpdateMovie form where we can update movie details
import { Link } from 'react-router-dom';


export default class Movie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: null
		};
	}
	//On mount Route will contain the id value of the movie within match.params.id and will be passed as an argument to fetchMovie which will run axios.get and retrieve that movie data from the local host 5000
	componentDidMount() {
		this.fetchMovie(this.props.match.params.id);
	}

	componentWillReceiveProps(newProps) {
		if (this.props.match.params.id !== newProps.match.params.id) {
			this.fetchMovie(newProps.match.params.id);
		}
	}

	fetchMovie = id => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then(res => this.setState({ movie: res.data }))
			.catch(err => console.log(err.response));
	};

	saveMovie = () => {
		const addToSavedList = this.props.addToSavedList;
		addToSavedList(this.state.movie);
	};
	deleteMovie = event => {
		event.preventDefault();
		axios.delete(`http://localhost:5000/api/movies/${this.props.movie.id}`)
			.then(res => {
				console.log(res);
				this.props.removeMovie(this.props.movie.id);
				this.props.history.push('/');
			})
			.catch(err => console.log(err.response));
	};


	render() {
		if (!this.state.movie) {
			return <div>Loading movie information...</div>;
		}

		return (
			<div className="save-wrapper">
				<MovieCard movie={this.state.movie} />
				<div className="save-button">
					{/*Create Link to updateMovie form using the stored id of the film we are currently on */}
					<Link to={`/update-movie/${this.props.match.params.id}`}>Update Movie! </Link>
				</div>
				<div className="save-button" onClick={this.saveMovie}>
					Save </div>
				<button onClick={this.deleteMovie}>Delete</button>


			</div>
		);
	}
}
