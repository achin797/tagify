import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import Icon from "antd/lib/icon";
import {populateSearchResults} from "../actions";
import {connect} from "react-redux";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SearchForm extends Component {

  findSongs = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const searchString = values.search;
        Meteor.call("searchTracks", (searchString), (err, response) => {
          if (err) {
            console.log(err);
          } else {
            this.props.populateSearchResults(response, searchString);
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title');
    return (
      <Form layout="inline" onSubmit={this.findSongs}>
        <Form.Item validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('search', {
            rules: [{ required: true, message: 'Please input the title!' }],
            initialValue: this.props.searchString,
          })(
            <Input
              prefix={<Icon type="search"/>}
              placeholder="Search Spotify"
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchString: state.searchResults.searchString,
  };
};

const WrappedSearchForm = connect(mapStateToProps, {populateSearchResults})(Form.create({ name: 'horizontal_login' })(SearchForm));

export default WrappedSearchForm;
