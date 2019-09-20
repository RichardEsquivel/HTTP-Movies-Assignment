import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UpdateMovie = (props) => {
	//this component will allow us to update the movie details from a form using the format established from MovieCard of title director metascore stars initializing to empty strings and arrays
	const [movie, setMovie] = useState({ title: "", director: "", metascore: "", stars: [] });
	//Establish a handleChange function which will utilize setMovie in order to spread array of movie and place the user determined value of e.target.value at the key of e.target.name adding that value at that key

	//if props.movie changes setMovie should take in this new value to refresh
	useEffect(() => {
		setMovie(props.movie);
	}, [props.movie]);



	const handleChange = e => setMovie({ ...movie, [e.target.name]: e.target.value });
	//Function handleStars will take in an index and this function takes in the user created event will spread out the movie array to set a new value for a star at a determined index passing all of this to function setMovie to update value or movie and a new array will be returned from the map function, this is a function that accepts an index value and returns a function that will except an event by the user within form
	const handleStars = index => e => {
		setMovie({
			...movie, stars: movie.stars.map((star, starIndex) => {
				return starIndex === index ? e.target.value : star;

			})
		});
	};
	//	//Upon submission of form place a put request to update the movie being chosen on the form to update from call handleSubmit, preventDefault will keep page from reloading upon submission, movie is content to be updated, props.history.push will take us back to the initial page 
	const handleSubmit = e => {
		e.preventDefault();
		axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
			.then(response => {
				props.updateMovie(response.data);
				props.history.push('/');
			})
			.catch(error => console.log(error.response));

	};
	const addStars = event => {
		event.preventDefault();
		setMovie({ ...movie, stars: [...movie.stars, ""] });
	};

	//if there is no movie data at this time this will display loading screen div
	if (!movie) {
		return <div> Like the AOL days of dialup!</div>;
	}
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="title"
				placeholder="title"
				value={movie.title}
				onChange={handleChange} />
			<input
				type="text"
				name="director"
				placeholder="director"
				value={movie.director}
				onChange={handleChange} />
			<input
				type="text"
				name="metascore"
				placeholder="metascore"
				value={movie.metascore}
				onChange={handleChange} />
			{movie.stars.map((theStar, index) => {
				return <input
					type="text"
					name="star"
					placeholder="star"
					value={theStar}
					onChange={handleStars(index)} />
			})}
			<button onClick={addStars}>Add A Star!</button>
			<button type="submit"> Update This Movie!</button>
		</form>
	)
}

export default UpdateMovie;