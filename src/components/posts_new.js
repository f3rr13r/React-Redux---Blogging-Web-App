import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Lodash from 'lodash';

import { createPost } from '../actions/index';


const FIELDS = {
	title: {
		type: 'input',
		label: 'Post Title'
	},
	categories: {
		type: 'input',
		label: 'Post Categories'
	},
	content: {
		type: 'textarea',
		label: 'Post Contents'
	}
};


class PostsNew extends Component {

	static contextTypes = {
		router: PropTypes.object
	};


	onSubmit(props) {
		this.props.createPost(props)
		.then(() => {
			// Blog post has been created. Navigate the user to the index.
			// We navigate by calling this.context.router.push with the
			// new path to navigate to.
			this.context.router.push('/');
		});
	}




	renderField(fieldConfig, field) {
		const fieldHelper = this.props.fields[field];

		return (
			<div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
					<label>{fieldConfig.label}</label>
					<fieldConfig.type type="text" className="form-control" {...fieldHelper} />
					<div className="text-help form-control-label">
						{fieldHelper.touched ? fieldHelper.error : ''}
					</div>
				</div>
		);
	}




	render() {
		const handleSubmit = this.props.handleSubmit;


		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>

				{Lodash.map(FIELDS, this.renderField.bind(this))}

				<button type="submit" className="btn btn-primary">Create</button>
				<Link to='/' className="btn btn-danger">Cancel</Link>
			</form>
		);
	}

}





function validate(values) {
	const errors = {};

	Lodash.each(FIELDS, (type, field) => {
		if (!values[field]) {
			errors[field] = `Please enter ${field}`;
		}
	});

	return errors;
}





// Connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: first argument is form configuration, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
	form: 'PostsNewForm',
	fields: Lodash.keys(FIELDS),
	validate
}, null, { createPost })(PostsNew);






