
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';


export class FileInput extends Component{

  render(){

    return <input
      type="file"
      {...this.props}
    />

  }

}


export class SingleUploader extends Component{

  static propTypes = {
    FileInput: PropTypes.func.isRequired,
  };


  static defaultProps = {
    FileInput,
  };


  handleChange({ target }){

    const {
      mutate,
    } = this.props;

    return target.validity.valid && mutate({
      variables: { file: target.files[0] },
    });

  }


  render(){

    const {
      mutate,
      FileInput,
      ...other
    } = this.props;

    return <FileInput
      onChange={event => this.handleChange(event)} 
      {...other}
    />

  }

}


// const SingleUploader = ({ mutate }) => {

// }

export default graphql(gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      encoding
      mimetype
      path
    }
  }
`)(SingleUploader);